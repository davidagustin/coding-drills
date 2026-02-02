#!/usr/bin/env tsx
/**
 * Parallel Agent System for Creating Visualizations
 *
 * This script helps coordinate multiple agents working on visualizations in parallel.
 * It can:
 * - Assign tasks to agents
 * - Track progress
 * - Generate visualization boilerplate
 * - Validate completed visualizations
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

interface VisualizationTask {
  id: string;
  exerciseId: string;
  title: string;
  category: string;
  agent: number;
  status: 'pending' | 'in_progress' | 'completed';
  componentName: string;
}

interface AgentAssignment {
  agentId: number;
  tasks: VisualizationTask[];
  completed: number;
  total: number;
}

const VISUALIZATIONS_DIR = join(process.cwd(), 'components/visualizations');
const ASSIGNMENTS_FILE = join(process.cwd(), 'VISUALIZATION_ASSIGNMENTS.md');

/**
 * Parse assignments from VISUALIZATION_ASSIGNMENTS.md
 */
function parseAssignments(): AgentAssignment[] {
  if (!existsSync(ASSIGNMENTS_FILE)) {
    console.error('VISUALIZATION_ASSIGNMENTS.md not found');
    process.exit(1);
  }

  const content = readFileSync(ASSIGNMENTS_FILE, 'utf-8');
  const agents: AgentAssignment[] = [];
  let currentAgent: AgentAssignment | null = null;

  const lines = content.split('\n');
  for (const line of lines) {
    // Match agent headers like "## Agent 1 - COMPLETED" or "## Agent 2 - IN PROGRESS"
    const agentMatch = line.match(/^##\s+(?:✅|🔄)\s+Agent\s+(\d+)/);
    if (agentMatch) {
      if (currentAgent) {
        agents.push(currentAgent);
      }
      currentAgent = {
        agentId: parseInt(agentMatch[1], 10),
        tasks: [],
        completed: 0,
        total: 0,
      };
      continue;
    }

    if (!currentAgent) continue;

    // Match task lines like "- ✅ `container-most-water` - ContainerMostWaterViz.tsx"
    const completedMatch = line.match(/^-\s+✅\s+`([^`]+)`\s+-\s+(\w+\.tsx)/);
    if (completedMatch) {
      currentAgent.tasks.push({
        id: completedMatch[1],
        exerciseId: `js-${completedMatch[1]}`,
        title: '',
        category: '',
        agent: currentAgent.agentId,
        status: 'completed',
        componentName: completedMatch[2].replace('.tsx', ''),
      });
      currentAgent.completed++;
      currentAgent.total++;
      continue;
    }

    // Match pending tasks like "- ⏳ `search-rotated`"
    const pendingMatch = line.match(/^-\s+⏳\s+`([^`]+)`/);
    if (pendingMatch) {
      const id = pendingMatch[1];
      const componentName = `${id
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')}Viz`;

      currentAgent.tasks.push({
        id,
        exerciseId: `js-${id}`,
        title: '',
        category: '',
        agent: currentAgent.agentId,
        status: 'pending',
        componentName,
      });
      currentAgent.total++;
    }
  }

  if (currentAgent) {
    agents.push(currentAgent);
  }

  return agents;
}

/**
 * Generate visualization component boilerplate
 */
function generateVisualizationBoilerplate(task: VisualizationTask): string {
  return `'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

/* ------------------------------------------------------------------ */
/*  Pre-computed algorithm steps                                     */
/* ------------------------------------------------------------------ */

interface StepState {
  // TODO: Define step state interface
  // Example: { index: number; value: number; ... }
}

/**
 * Pre-compute algorithm steps for visualization
 */
function computeSteps(): StepState[] {
  const steps: StepState[] = [];
  
  // TODO: Implement step computation
  // Walk through the algorithm and record each step
  
  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

/* ------------------------------------------------------------------ */
/*  Colors                                                            */
/* ------------------------------------------------------------------ */

const COLORS = {
  primary: '#3b82f6',
  secondary: '#f97316',
  accent: '#eab308',
  success: '#22c55e',
} as const;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function ${task.componentName}() {
  const animation = useVizAnimation(TOTAL_STEPS);
  const { state } = animation;
  const { step } = state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">${task.id.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}</h2>
      
      {/* TODO: Add visualization UI */}
      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white mt-2">
          {/* TODO: Display current step information */}
        </p>
      </div>

      <VizControls controls={animation} accentColor={COLORS.primary} />
    </div>
  );
}
`;
}

/**
 * Check if a visualization already exists
 */
function visualizationExists(componentName: string): boolean {
  const filePath = join(VISUALIZATIONS_DIR, `${componentName}.tsx`);
  return existsSync(filePath);
}

/**
 * Get next available tasks for an agent
 */
function getNextTasks(agentId: number, limit: number = 5): VisualizationTask[] {
  const agents = parseAssignments();
  const agent = agents.find((a) => a.agentId === agentId);

  if (!agent) {
    console.error(`Agent ${agentId} not found`);
    return [];
  }

  return agent.tasks
    .filter((task) => task.status === 'pending' && !visualizationExists(task.componentName))
    .slice(0, limit);
}

/**
 * Main CLI interface
 */
function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'list':
      {
        const agents = parseAssignments();
        console.log('\n📊 Visualization Progress by Agent:\n');
        agents.forEach((agent) => {
          const progress = Math.round((agent.completed / agent.total) * 100);
          const bar =
            '█'.repeat(Math.floor(progress / 5)) + '░'.repeat(20 - Math.floor(progress / 5));
          console.log(
            `Agent ${agent.agentId}: ${bar} ${agent.completed}/${agent.total} (${progress}%)`,
          );
        });
        console.log('');
      }
      break;

    case 'next':
      {
        const agentId = parseInt(args[1] || '1', 10);
        const limit = parseInt(args[2] || '5', 10);
        const tasks = getNextTasks(agentId, limit);

        console.log(`\n📋 Next ${limit} tasks for Agent ${agentId}:\n`);
        tasks.forEach((task, idx) => {
          console.log(`${idx + 1}. ${task.id} → ${task.componentName}.tsx`);
        });
        console.log('');
      }
      break;

    case 'generate':
      {
        const exerciseId = args[1];
        if (!exerciseId) {
          console.error('Usage: generate <exercise-id>');
          process.exit(1);
        }

        const agents = parseAssignments();
        const task = agents
          .flatMap((a) => a.tasks)
          .find((t) => t.id === exerciseId || t.exerciseId === exerciseId);

        if (!task) {
          console.error(`Task not found: ${exerciseId}`);
          process.exit(1);
        }

        if (visualizationExists(task.componentName)) {
          console.error(`Visualization already exists: ${task.componentName}.tsx`);
          process.exit(1);
        }

        const boilerplate = generateVisualizationBoilerplate(task);
        const filePath = join(VISUALIZATIONS_DIR, `${task.componentName}.tsx`);
        writeFileSync(filePath, boilerplate);
        console.log(`✅ Generated ${filePath}`);
      }
      break;

    case 'status':
      {
        const agents = parseAssignments();
        console.log('\n📈 Detailed Status:\n');
        agents.forEach((agent) => {
          console.log(`\nAgent ${agent.agentId}:`);
          const pending = agent.tasks.filter((t) => t.status === 'pending');
          const completed = agent.tasks.filter((t) => t.status === 'completed');

          console.log(`  ✅ Completed: ${completed.length}`);
          console.log(`  ⏳ Pending: ${pending.length}`);

          if (pending.length > 0) {
            console.log(`  Next up: ${pending[0].id}`);
          }
        });
        console.log('');
      }
      break;

    default:
      console.log(`
Parallel Visualization Agent System

Usage:
  list                    - Show progress summary for all agents
  next [agent] [limit]   - Show next tasks for an agent (default: agent 1, limit 5)
  generate <exercise-id> - Generate boilerplate for a visualization
  status                 - Show detailed status for all agents

Examples:
  npm run viz:list
  npm run viz:next 2 10
  npm run viz:generate min-stack
  npm run viz:status
`);
  }
}

if (require.main === module) {
  main();
}

export { parseAssignments, getNextTasks, generateVisualizationBoilerplate };
