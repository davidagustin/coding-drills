'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const OPERATIONS: Array<
  ['on', string, string] | ['off', string, string] | ['emit', string, string]
> = [
  ['on', 'click', 'handler1'],
  ['on', 'click', 'handler2'],
  ['emit', 'click', 'data1'],
  ['off', 'click', 'handler1'],
  ['emit', 'click', 'data2'],
];

interface EventEmitterStep {
  listeners: Record<string, string[]>;
  operation: string;
  event: string;
  handler: string;
  data: string;
  explanation: string;
}

function computeSteps(): EventEmitterStep[] {
  const steps: EventEmitterStep[] = [];
  const listeners: Record<string, string[]> = {};

  steps.push({
    listeners: JSON.parse(JSON.stringify(listeners)),
    operation: 'init',
    event: '',
    handler: '',
    data: '',
    explanation: `Start: Initialize event emitter`,
  });

  for (const op of OPERATIONS) {
    if (op[0] === 'on') {
      const [, event, handler] = op;
      if (!listeners[event]) listeners[event] = [];
      listeners[event].push(handler);
      steps.push({
        listeners: JSON.parse(JSON.stringify(listeners)),
        operation: 'on',
        event,
        handler,
        data: '',
        explanation: `on('${event}', '${handler}'): Register listener`,
      });
    } else if (op[0] === 'off') {
      const [, event, handler] = op;
      if (listeners[event]) {
        const idx = listeners[event].indexOf(handler);
        if (idx !== -1) {
          listeners[event].splice(idx, 1);
          steps.push({
            listeners: JSON.parse(JSON.stringify(listeners)),
            operation: 'off',
            event,
            handler,
            data: '',
            explanation: `off('${event}', '${handler}'): Remove listener`,
          });
        }
      }
    } else if (op[0] === 'emit') {
      const [, event, data] = op;
      const handlers = listeners[event] || [];
      steps.push({
        listeners: JSON.parse(JSON.stringify(listeners)),
        operation: 'emit',
        event,
        handler: '',
        data,
        explanation: `emit('${event}', '${data}'): Call ${handlers.length} listener(s): ${handlers.join(', ')}`,
      });
    }
  }

  steps.push({
    listeners: JSON.parse(JSON.stringify(listeners)),
    operation: 'complete',
    event: '',
    handler: '',
    data: '',
    explanation: `Complete: All operations processed`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function EventEmitterViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { listeners, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Simple Event Emitter</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Listeners */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Event Listeners</h3>
          {Object.keys(listeners).length === 0 ? (
            <div className="p-4 bg-zinc-800 rounded-lg text-center text-zinc-500">(empty)</div>
          ) : (
            <div className="space-y-4">
              {Object.entries(listeners).map(([evt, handlers]) => (
                <div key={evt} className="bg-zinc-800 rounded-lg p-4">
                  <div className="text-sm font-semibold text-cyan-400 mb-2">Event: {evt}</div>
                  {handlers.length === 0 ? (
                    <div className="text-zinc-500 text-sm">(no listeners)</div>
                  ) : (
                    <div className="flex gap-2 flex-wrap">
                      {handlers.map((h, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-1 bg-green-500/20 border-2 border-green-500 rounded-lg font-mono text-xs font-semibold text-green-400"
                        >
                          {h}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
