'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
// Interview prompts and problems
import { type AlgorithmProblem, algorithmProblems } from '@/lib/interview/problems';
import {
  type AlgorithmPattern,
  createProblemContext,
  GUIDED_BREAKDOWN_SYSTEM_PROMPT_COMPACT,
  getRandomConversationStarter,
  getRandomGuidedBreakdownStarter,
  INTERVIEWER_SYSTEM_PROMPT_COMPACT,
} from '@/lib/interview/prompts';
import {
  type SystemDesignProblem,
  systemDesignProblems,
} from '@/lib/interview/system-design-problems';
import {
  createSystemDesignProblemContext,
  getRandomSDConversationStarter,
  getRandomSDGuidedBreakdownStarter,
  SD_GUIDED_BREAKDOWN_SYSTEM_PROMPT_COMPACT,
  SD_INTERVIEWER_SYSTEM_PROMPT_COMPACT,
} from '@/lib/interview/system-design-prompts';
// WebLLM integration
import { checkCompatibility, initializeModel, isModelLoaded, streamChat } from '@/lib/webllm';

// ============================================================================
// Types
// ============================================================================

type InterviewPhase = 'setup' | 'loading-model' | 'interviewing' | 'completed';
type InterviewMode = 'solve' | 'guided-breakdown';
type InterviewType = 'algorithm' | 'system-design';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// ============================================================================
// Utility Functions
// ============================================================================

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getProblemsbyDifficulty(
  difficulty: 'easy' | 'medium' | 'hard' | 'all',
  interviewType: InterviewType = 'algorithm',
): (AlgorithmProblem | SystemDesignProblem)[] {
  const problems = interviewType === 'system-design' ? systemDesignProblems : algorithmProblems;
  if (difficulty === 'all') return problems;
  return problems.filter((p) => p.difficulty === difficulty);
}

function getRandomProblem(
  difficulty: 'easy' | 'medium' | 'hard' | 'all',
  interviewType: InterviewType = 'algorithm',
): AlgorithmProblem | SystemDesignProblem {
  const problems = getProblemsbyDifficulty(difficulty, interviewType);
  const shuffled = shuffleArray(problems);
  return shuffled[0];
}

// ============================================================================
// Components
// ============================================================================

interface DifficultyChipProps {
  value: 'easy' | 'medium' | 'hard' | 'all';
  selected: boolean;
  onClick: () => void;
}

function DifficultyChip({ value, selected, onClick }: DifficultyChipProps) {
  const colors = {
    all: 'bg-zinc-500',
    easy: 'bg-green-500',
    medium: 'bg-yellow-500',
    hard: 'bg-red-500',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
        selected ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
      }`}
    >
      <span className={`w-2 h-2 rounded-full ${colors[value]}`} />
      {value.charAt(0).toUpperCase() + value.slice(1)}
    </button>
  );
}

interface SetupPhaseProps {
  onStart: (
    problem: AlgorithmProblem | SystemDesignProblem,
    mode: InterviewMode,
    type: InterviewType,
  ) => void;
  isCompatible: boolean | null;
  compatibilityError: string | null;
}

function SetupPhase({ onStart, isCompatible, compatibilityError }: SetupPhaseProps) {
  const [interviewType, setInterviewType] = useState<InterviewType>('algorithm');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | 'all'>('medium');
  const [selectedProblem, setSelectedProblem] = useState<
    AlgorithmProblem | SystemDesignProblem | null
  >(null);
  const [showProblemList, setShowProblemList] = useState(false);
  const [interviewMode, setInterviewMode] = useState<InterviewMode>('solve');

  const availableProblems = getProblemsbyDifficulty(difficulty, interviewType);

  const handleRandomProblem = () => {
    const problem = getRandomProblem(difficulty, interviewType);
    setSelectedProblem(problem);
  };

  const handleStart = () => {
    const problem = selectedProblem || getRandomProblem(difficulty, interviewType);
    onStart(problem, interviewMode, interviewType);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <div className="text-cyan-400 mb-4 flex justify-center">
          <svg
            viewBox="0 0 24 24"
            className="w-16 h-16"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-zinc-100 mb-2">Interview Mode</h1>
        <p className="text-zinc-400">
          {interviewType === 'algorithm'
            ? 'Practice algorithm problems with an AI interviewer that guides you through the solution'
            : 'Practice system design with an AI interviewer that guides you through architecture decisions'}
        </p>
        <p className="text-zinc-500 text-sm mt-2">
          {interviewType === 'algorithm'
            ? 'Language-agnostic • Focus on problem-solving • Real interview experience'
            : 'Large-scale systems • Architecture & trade-offs • Real interview experience'}
        </p>
      </div>

      {/* WebGPU Compatibility Check */}
      {isCompatible === false && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-red-400">
          <p className="font-medium mb-1">Browser Not Compatible</p>
          <p className="text-sm">{compatibilityError}</p>
        </div>
      )}

      {isCompatible === null && (
        <div className="bg-zinc-800 rounded-xl p-4 text-zinc-400 text-center">
          <p>Checking browser compatibility...</p>
        </div>
      )}

      {isCompatible && (
        <div className="bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-800 space-y-6">
          {/* Interview Type Toggle */}
          <div>
            <span className="block text-sm font-medium text-zinc-300 mb-3">Interview Type</span>
            <div className="flex gap-1 p-1 bg-zinc-800 rounded-lg">
              <button
                type="button"
                onClick={() => {
                  setInterviewType('algorithm');
                  setSelectedProblem(null);
                  setShowProblemList(false);
                }}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all cursor-pointer ${
                  interviewType === 'algorithm'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Algorithm
              </button>
              <button
                type="button"
                onClick={() => {
                  setInterviewType('system-design');
                  setSelectedProblem(null);
                  setShowProblemList(false);
                }}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all cursor-pointer ${
                  interviewType === 'system-design'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                System Design
              </button>
            </div>
          </div>

          {/* Difficulty Selection */}
          <div>
            <span className="block text-sm font-medium text-zinc-300 mb-3">Difficulty</span>
            <div className="flex flex-wrap gap-2">
              {(['all', 'easy', 'medium', 'hard'] as const).map((d) => (
                <DifficultyChip
                  key={d}
                  value={d}
                  selected={difficulty === d}
                  onClick={() => {
                    setDifficulty(d);
                    setSelectedProblem(null);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Problem Selection */}
          <div>
            <span className="block text-sm font-medium text-zinc-300 mb-3">
              Problem ({availableProblems.length} available)
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleRandomProblem}
                className="flex-1 py-2 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors cursor-pointer"
              >
                Random Problem
              </button>
              <button
                type="button"
                onClick={() => setShowProblemList(!showProblemList)}
                className="flex-1 py-2 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors cursor-pointer"
              >
                {showProblemList ? 'Hide List' : 'Choose Problem'}
              </button>
            </div>

            {/* Problem List */}
            {showProblemList && (
              <div className="mt-3 max-h-60 overflow-y-auto rounded-lg border border-zinc-700 bg-zinc-800">
                {availableProblems.map((problem) => (
                  <button
                    key={problem.id}
                    type="button"
                    onClick={() => {
                      setSelectedProblem(problem);
                      setShowProblemList(false);
                    }}
                    className={`w-full text-left px-4 py-3 border-b border-zinc-700 last:border-b-0 hover:bg-zinc-700 transition-colors cursor-pointer ${
                      selectedProblem?.id === problem.id ? 'bg-zinc-700' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-100 font-medium">{problem.title}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          problem.difficulty === 'easy'
                            ? 'bg-green-500/20 text-green-400'
                            : problem.difficulty === 'medium'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1 truncate">{problem.category}</p>
                  </button>
                ))}
              </div>
            )}

            {/* Selected Problem Preview */}
            {selectedProblem && (
              <div className="mt-3 p-4 rounded-lg bg-zinc-800 border border-zinc-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-zinc-100">{selectedProblem.title}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      selectedProblem.difficulty === 'easy'
                        ? 'bg-green-500/20 text-green-400'
                        : selectedProblem.difficulty === 'medium'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {selectedProblem.difficulty}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 line-clamp-2">{selectedProblem.description}</p>
              </div>
            )}
          </div>

          {/* Interview Mode */}
          <div>
            <span className="block text-sm font-medium text-zinc-300 mb-3">Mode</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setInterviewMode('solve')}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                  interviewMode === 'solve'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {interviewType === 'system-design' ? 'Mock Interview' : 'Solve Problem'}
              </button>
              <button
                type="button"
                onClick={() => setInterviewMode('guided-breakdown')}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                  interviewMode === 'guided-breakdown'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                Guided Breakdown
              </button>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
            <p className="text-sm text-cyan-400">
              {interviewType === 'algorithm' ? (
                interviewMode === 'solve' ? (
                  <>
                    <span className="font-medium">Solve Mode:</span> The AI interviewer will present
                    the problem and guide you through solving it with questions and hints, just like
                    a real technical interview.
                  </>
                ) : (
                  <>
                    <span className="font-medium">Guided Breakdown:</span> The AI coach will teach
                    you a structured 7-step framework for breaking down algorithm problems, walking
                    through each step interactively using the selected problem.
                  </>
                )
              ) : interviewMode === 'solve' ? (
                <>
                  <span className="font-medium">Mock Interview:</span> The AI interviewer will guide
                  you through a system design discussion covering requirements, estimation, API
                  design, architecture, and trade-offs.
                </>
              ) : (
                <>
                  <span className="font-medium">Guided Breakdown:</span> The AI coach will walk you
                  through a structured 7-phase framework for system design: Requirements,
                  Estimation, API Design, Data Model, High-Level Design, Detailed Design, and
                  Trade-offs.
                </>
              )}{' '}
              The AI runs locally in your browser using WebGPU.
            </p>
          </div>
        </div>
      )}

      {/* Start Button */}
      <button
        type="button"
        onClick={handleStart}
        disabled={!isCompatible}
        className="w-full py-4 px-6 bg-cyan-600 hover:bg-cyan-700 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-semibold rounded-xl transition-colors text-lg cursor-pointer disabled:cursor-not-allowed"
      >
        Start Interview
      </button>
    </div>
  );
}

interface ModelLoadingPhaseProps {
  progress: number;
  statusText: string;
}

function ModelLoadingPhase({ progress, statusText }: ModelLoadingPhaseProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-zinc-100 mb-2">Loading AI Interviewer</h1>
        <p className="text-zinc-400">Downloading and initializing the language model</p>
      </div>

      <div className="bg-zinc-900 rounded-xl p-8 shadow-sm border border-zinc-800 space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Progress</span>
            <span className="text-zinc-100 font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Status Text */}
        <p className="text-center text-zinc-400 text-sm">{statusText}</p>

        {/* Info */}
        <div className="bg-zinc-800 rounded-lg p-4">
          <p className="text-xs text-zinc-500 text-center">
            This is a one-time download. The model (~4GB) will be cached for future sessions.
          </p>
        </div>
      </div>
    </div>
  );
}

interface ChatMessageProps {
  message: Message;
}

function ChatMessageComponent({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-xl px-4 py-3 ${
          isUser ? 'bg-cyan-600 text-white' : 'bg-zinc-800 text-zinc-100 border border-zinc-700'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <p className="text-xs mt-1 opacity-50">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}

interface InterviewPhaseProps {
  problem: AlgorithmProblem | SystemDesignProblem;
  interviewType: InterviewType;
  messages: Message[];
  isStreaming: boolean;
  streamingContent: string;
  onSendMessage: (content: string) => void;
  onEndInterview: () => void;
}

function InterviewPhaseComponent({
  problem,
  interviewType,
  messages,
  isStreaming,
  streamingContent,
  onSendMessage,
  onEndInterview,
}: InterviewPhaseProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when messages or streaming content changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: Intentional - we want to scroll when messages or streamingContent changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent]);

  // Auto-focus input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (input.trim() && !isStreaming) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const difficultyColors = {
    easy: 'bg-green-500/20 text-green-400 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    hard: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <div className="h-screen flex flex-col bg-zinc-950">
      {/* Header */}
      <div className="flex-none bg-zinc-900 border-b border-zinc-800 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-zinc-100">{problem.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`text-xs px-2 py-0.5 rounded border ${difficultyColors[problem.difficulty]}`}
              >
                {problem.difficulty}
              </span>
              <span className="text-xs text-zinc-500">{problem.category}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onEndInterview}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm rounded-lg transition-colors cursor-pointer"
          >
            End Interview
          </button>
        </div>
      </div>

      {/* Problem Panel (Collapsible) */}
      <details open className="flex-none bg-zinc-900/50 border-b border-zinc-800">
        <summary className="max-w-4xl mx-auto p-3 cursor-pointer text-sm text-cyan-400 hover:text-cyan-300">
          View Problem Details
        </summary>
        <div className="max-w-4xl mx-auto px-4 pb-4 space-y-3">
          <div>
            <span className="text-xs font-medium text-zinc-500 uppercase">Description</span>
            <p className="text-sm text-zinc-300 mt-1">{problem.description}</p>
          </div>
          {interviewType === 'algorithm' && 'examples' in problem && (
            <div>
              <span className="text-xs font-medium text-zinc-500 uppercase">Examples</span>
              <div className="space-y-2 mt-1">
                {(problem as AlgorithmProblem).examples.map((example, idx) => (
                  <div key={idx} className="bg-zinc-800 rounded-lg p-3 text-xs font-mono">
                    <p className="text-zinc-400">
                      <span className="text-zinc-500">Input:</span> {example.input}
                    </p>
                    <p className="text-zinc-400">
                      <span className="text-zinc-500">Output:</span> {example.output}
                    </p>
                    {example.explanation && (
                      <p className="text-zinc-500 mt-1 font-sans">{example.explanation}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {interviewType === 'system-design' && 'functionalRequirements' in problem && (
            <>
              <div>
                <span className="text-xs font-medium text-zinc-500 uppercase">
                  Functional Requirements
                </span>
                <ul className="list-disc list-inside text-xs text-zinc-400 mt-1">
                  {(problem as SystemDesignProblem).functionalRequirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-xs font-medium text-zinc-500 uppercase">
                  Non-Functional Requirements
                </span>
                <ul className="list-disc list-inside text-xs text-zinc-400 mt-1">
                  {(problem as SystemDesignProblem).nonFunctionalRequirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-xs font-medium text-zinc-500 uppercase">Key Components</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {(problem as SystemDesignProblem).keyComponents.map((component, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700"
                    >
                      {component}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
          <div>
            <span className="text-xs font-medium text-zinc-500 uppercase">Constraints</span>
            <ul className="list-disc list-inside text-xs text-zinc-400 mt-1">
              {problem.constraints.map((constraint, idx) => (
                <li key={idx}>{constraint}</li>
              ))}
            </ul>
          </div>
        </div>
      </details>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <ChatMessageComponent key={message.id} message={message} />
          ))}

          {/* Streaming Message */}
          {isStreaming && streamingContent && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-xl px-4 py-3 bg-zinc-800 text-zinc-100 border border-zinc-700">
                <p className="text-sm whitespace-pre-wrap">{streamingContent}</p>
                <span className="inline-block w-2 h-4 bg-cyan-500 animate-pulse ml-1" />
              </div>
            </div>
          )}

          {/* Typing Indicator */}
          {isStreaming && !streamingContent && (
            <div className="flex justify-start">
              <div className="rounded-xl px-4 py-3 bg-zinc-800 border border-zinc-700">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" />
                  <span
                    className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  />
                  <span
                    className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="flex-none bg-zinc-900 border-t border-zinc-800 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your response..."
              disabled={isStreaming}
              rows={2}
              className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50"
            />
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!input.trim() || isStreaming}
              className="px-6 bg-cyan-600 hover:bg-cyan-700 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-medium rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
          <p className="text-xs text-zinc-500 mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}

interface CompletedPhaseProps {
  problem: AlgorithmProblem | SystemDesignProblem;
  interviewType: InterviewType;
  messageCount: number;
  onNewInterview: () => void;
  onBackToMenu: () => void;
}

function CompletedPhase({
  problem,
  interviewType,
  messageCount,
  onNewInterview,
  onBackToMenu,
}: CompletedPhaseProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-zinc-100 mb-2">Interview Complete!</h1>
        <p className="text-zinc-400">Great practice session</p>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-800 space-y-6">
        <div className="text-center">
          <p className="text-lg text-zinc-100 font-medium">{problem.title}</p>
          <p className="text-sm text-zinc-500">{problem.category}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-800 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-cyan-400">{messageCount}</p>
            <p className="text-xs text-zinc-500">Messages Exchanged</p>
          </div>
          <div className="bg-zinc-800 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-zinc-100">{problem.difficulty}</p>
            <p className="text-xs text-zinc-500">Difficulty Level</p>
          </div>
        </div>

        {interviewType === 'algorithm' && 'optimalPattern' in problem && (
          <div className="bg-zinc-800 rounded-lg p-4">
            <p className="text-sm font-medium text-zinc-300 mb-2">Optimal Approach</p>
            <p className="text-xs text-zinc-500">
              <span className="text-zinc-400">Pattern:</span>{' '}
              {(problem as AlgorithmProblem).optimalPattern}
            </p>
            <p className="text-xs text-zinc-500">
              <span className="text-zinc-400">Time:</span>{' '}
              {(problem as AlgorithmProblem).optimalTimeComplexity}
            </p>
            <p className="text-xs text-zinc-500">
              <span className="text-zinc-400">Space:</span>{' '}
              {(problem as AlgorithmProblem).optimalSpaceComplexity}
            </p>
          </div>
        )}

        {interviewType === 'system-design' && 'keyComponents' in problem && (
          <div className="bg-zinc-800 rounded-lg p-4 space-y-3">
            <div>
              <p className="text-sm font-medium text-zinc-300 mb-2">Key Components</p>
              <div className="flex flex-wrap gap-1.5">
                {(problem as SystemDesignProblem).keyComponents.map((component, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                  >
                    {component}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-300 mb-2">Design Topics</p>
              <div className="flex flex-wrap gap-1.5">
                {(problem as SystemDesignProblem).topics.map((topic, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onNewInterview}
          className="flex-1 py-4 px-6 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-xl transition-colors cursor-pointer"
        >
          New Interview
        </button>
        <button
          type="button"
          onClick={onBackToMenu}
          className="flex-1 py-4 px-6 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold rounded-xl transition-colors border border-zinc-700 cursor-pointer"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function InterviewPage() {
  const params = useParams();
  const router = useRouter();
  const language = params.language as string;

  // Phase state
  const [phase, setPhase] = useState<InterviewPhase>('setup');

  // Compatibility state
  const [isCompatible, setIsCompatible] = useState<boolean | null>(null);
  const [compatibilityError, setCompatibilityError] = useState<string | null>(null);

  // Model loading state
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadStatusText, setLoadStatusText] = useState('Initializing...');

  // Interview state
  const [interviewType, setInterviewType] = useState<InterviewType>('algorithm');
  const [currentProblem, setCurrentProblem] = useState<
    AlgorithmProblem | SystemDesignProblem | null
  >(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');

  // System message for the current interview
  const systemMessageRef = useRef<string>('');

  // Check browser compatibility on mount
  useEffect(() => {
    async function checkBrowserCompatibility() {
      const result = await checkCompatibility();
      setIsCompatible(result.isCompatible);
      if (!result.isCompatible) {
        setCompatibilityError(result.errorMessage || 'Unknown error');
      }
    }
    checkBrowserCompatibility();
  }, []);

  // Start the actual interview (must be defined before handleStart)
  const startInterview = useCallback(
    (problem: AlgorithmProblem | SystemDesignProblem, mode: InterviewMode, type: InterviewType) => {
      let problemContext: string;
      let systemPrompt: string;
      let starterMessage: string;

      if (type === 'system-design') {
        const sdProblem = problem as SystemDesignProblem;
        problemContext = createSystemDesignProblemContext(sdProblem);
        systemPrompt =
          mode === 'guided-breakdown'
            ? SD_GUIDED_BREAKDOWN_SYSTEM_PROMPT_COMPACT
            : SD_INTERVIEWER_SYSTEM_PROMPT_COMPACT;
        starterMessage =
          mode === 'guided-breakdown'
            ? getRandomSDGuidedBreakdownStarter()
            : getRandomSDConversationStarter();
      } else {
        const algoProblem = problem as AlgorithmProblem;
        problemContext = createProblemContext({
          id: algoProblem.id,
          title: algoProblem.title,
          difficulty: algoProblem.difficulty,
          description: algoProblem.description,
          examples: algoProblem.examples,
          constraints: algoProblem.constraints,
          hints: algoProblem.hints,
          tags: algoProblem.patterns,
          patterns: algoProblem.patterns as AlgorithmPattern[],
        });
        systemPrompt =
          mode === 'guided-breakdown'
            ? GUIDED_BREAKDOWN_SYSTEM_PROMPT_COMPACT
            : INTERVIEWER_SYSTEM_PROMPT_COMPACT;
        starterMessage =
          mode === 'guided-breakdown'
            ? getRandomGuidedBreakdownStarter()
            : getRandomConversationStarter();
      }

      systemMessageRef.current = `${systemPrompt}\n\n---\n\n${problemContext}`;

      // Add the initial assistant message
      const initialMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: starterMessage,
        timestamp: new Date(),
      };

      setMessages([initialMessage]);
      setPhase('interviewing');
    },
    [],
  );

  // Handle starting the interview
  const handleStart = useCallback(
    async (
      problem: AlgorithmProblem | SystemDesignProblem,
      mode: InterviewMode,
      type: InterviewType,
    ) => {
      setCurrentProblem(problem);
      setInterviewType(type);

      // Check if model is already loaded
      if (isModelLoaded()) {
        startInterview(problem, mode, type);
        return;
      }

      // Load the model
      setPhase('loading-model');
      setLoadStatusText('Preparing to download model...');

      try {
        await initializeModel((progress) => {
          setLoadProgress(progress);
          if (progress < 10) {
            setLoadStatusText('Connecting to model server...');
          } else if (progress < 50) {
            setLoadStatusText('Downloading model weights...');
          } else if (progress < 90) {
            setLoadStatusText('Loading model into GPU memory...');
          } else {
            setLoadStatusText('Finalizing initialization...');
          }
        });

        startInterview(problem, mode, type);
      } catch (error) {
        console.error('Failed to load model:', error);
        setPhase('setup');
        setCompatibilityError(
          error instanceof Error ? error.message : 'Failed to load the AI model',
        );
        setIsCompatible(false);
      }
    },
    [startInterview],
  );

  // Handle sending a message
  const handleSendMessage = useCallback(
    async (content: string) => {
      if (!currentProblem || isStreaming) return;

      // Add user message
      const userMessage: Message = {
        id: generateId(),
        role: 'user',
        content,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsStreaming(true);
      setStreamingContent('');

      try {
        // Build the conversation history for the API
        const conversationHistory = [...messages, userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        }));

        let fullResponse = '';

        await streamChat(systemMessageRef.current, conversationHistory, {
          onToken: (token) => {
            fullResponse += token;
            setStreamingContent(fullResponse);
          },
          onComplete: (response) => {
            // Add the complete assistant message
            const assistantMessage: Message = {
              id: generateId(),
              role: 'assistant',
              content: response,
              timestamp: new Date(),
            };
            setMessages((prev) => [...prev, assistantMessage]);
            setStreamingContent('');
            setIsStreaming(false);
          },
          onError: (error) => {
            console.error('Streaming error:', error);
            setStreamingContent('');
            setIsStreaming(false);

            // Add error message
            const errorMessage: Message = {
              id: generateId(),
              role: 'assistant',
              content:
                'I apologize, but I encountered an error processing your response. Please try again.',
              timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
          },
        });
      } catch (error) {
        console.error('Chat error:', error);
        setStreamingContent('');
        setIsStreaming(false);
      }
    },
    [currentProblem, messages, isStreaming],
  );

  // Handle ending the interview
  const handleEndInterview = useCallback(() => {
    setPhase('completed');
  }, []);

  // Handle starting a new interview
  const handleNewInterview = useCallback(() => {
    setMessages([]);
    setCurrentProblem(null);
    setInterviewType('algorithm');
    setPhase('setup');
  }, []);

  // Handle going back to menu
  const handleBackToMenu = useCallback(() => {
    router.push(`/${language}`);
  }, [router, language]);

  return (
    <div className={`min-h-screen bg-zinc-950 ${phase !== 'interviewing' ? 'py-8 px-4' : ''}`}>
      {phase === 'setup' && (
        <SetupPhase
          onStart={handleStart}
          isCompatible={isCompatible}
          compatibilityError={compatibilityError}
        />
      )}

      {phase === 'loading-model' && (
        <ModelLoadingPhase progress={loadProgress} statusText={loadStatusText} />
      )}

      {phase === 'interviewing' && currentProblem && (
        <InterviewPhaseComponent
          problem={currentProblem}
          interviewType={interviewType}
          messages={messages}
          isStreaming={isStreaming}
          streamingContent={streamingContent}
          onSendMessage={handleSendMessage}
          onEndInterview={handleEndInterview}
        />
      )}

      {phase === 'completed' && currentProblem && (
        <CompletedPhase
          problem={currentProblem}
          interviewType={interviewType}
          messageCount={messages.length}
          onNewInterview={handleNewInterview}
          onBackToMenu={handleBackToMenu}
        />
      )}
    </div>
  );
}
