'use client';

import { useCallback, useEffect, useState } from 'react';

interface QuestionCountSliderProps {
  /** Current value */
  value: number;
  /** Callback when value changes */
  onChange: (value: number) => void;
  /** Minimum value (default: 1) */
  min?: number;
  /** Maximum value (default: 50) */
  max?: number;
  /** Label text (default: "Questions") */
  label?: string;
  /** Whether to show the label */
  showLabel?: boolean;
  /** Whether to show quick preset buttons (default: false) */
  showPresets?: boolean;
}

export function QuestionCountSlider({
  value,
  onChange,
  min = 1,
  max = 50,
  label = 'Questions',
  showLabel = true,
  showPresets = false,
}: QuestionCountSliderProps) {
  const [inputValue, setInputValue] = useState(value.toString());

  // Sync inputValue when external value changes (from slider or presets)
  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  // Handle slider change
  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.target.value, 10);
      onChange(newValue);
    },
    [onChange],
  );

  // Handle input change - update slider in real-time
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      setInputValue(rawValue);

      // Update the slider in real-time if the value is valid
      const num = parseInt(rawValue, 10);
      if (!Number.isNaN(num) && num >= min && num <= max) {
        onChange(num);
      }
    },
    [min, max, onChange],
  );

  // Handle input blur - validate and clamp
  const handleInputBlur = useCallback(() => {
    const num = parseInt(inputValue, 10);
    if (Number.isNaN(num) || inputValue === '') {
      setInputValue(value.toString());
    } else {
      const clampedValue = Math.min(Math.max(num, min), max);
      onChange(clampedValue);
      setInputValue(clampedValue.toString());
    }
  }, [inputValue, value, min, max, onChange]);

  // Handle Enter key
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleInputBlur();
      }
    },
    [handleInputBlur],
  );

  // Calculate percentage for slider track fill
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      {showLabel && (
        <div className="flex items-center justify-between">
          <label htmlFor="question-count-slider" className="text-sm font-medium text-zinc-300">
            {label}
          </label>
          <span className="text-sm text-zinc-500">
            {min} - {max}
          </span>
        </div>
      )}

      <div className="flex items-center gap-4">
        {/* Slider */}
        <div className="flex-1 relative">
          <input
            id="question-count-slider"
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={handleSliderChange}
            className="w-full h-2 appearance-none cursor-pointer rounded-full bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #3f3f46 ${percentage}%, #3f3f46 100%)`,
            }}
          />
        </div>

        {/* Number Input */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={min}
            max={max}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            className="w-20 px-3 py-2 text-center rounded-lg border border-zinc-700 bg-zinc-800 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Number of questions"
          />
        </div>
      </div>

      {/* Quick preset buttons (optional) */}
      {showPresets && (
        <div className="flex flex-wrap gap-2">
          {[5, 10, 15, 20, 25, 30].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => onChange(preset)}
              disabled={preset > max}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                value === preset
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200'
              } ${preset > max ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {preset}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuestionCountSlider;
