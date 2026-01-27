// @vitest-environment jsdom

import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Timer } from '../Timer';

describe('Timer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should render correct initial time for countdown', () => {
    render(<Timer mode="countdown" initialTime={60} />);
    expect(screen.getByText('01:00')).toBeDefined();
    expect(screen.getByLabelText('Countdown timer')).toBeDefined();
  });

  it('should start and count down', () => {
    render(<Timer mode="countdown" initialTime={10} />);

    fireEvent.click(screen.getByText('Start'));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText('00:09')).toBeDefined();
  });

  it('should pause', () => {
    render(<Timer mode="countdown" initialTime={10} />);

    fireEvent.click(screen.getByText('Start'));

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText('00:08')).toBeDefined();

    fireEvent.click(screen.getByText('Pause'));

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText('00:08')).toBeDefined();
  });

  it('should reset', () => {
    render(<Timer mode="countdown" initialTime={10} />);

    fireEvent.click(screen.getByText('Start'));
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    fireEvent.click(screen.getByText('Reset'));
    expect(screen.getByText('00:10')).toBeDefined();
  });

  it('should trigger onComplete when time is up', () => {
    const onComplete = vi.fn();
    render(<Timer mode="countdown" initialTime={2} onComplete={onComplete} />);

    fireEvent.click(screen.getByText('Start'));

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText('00:00')).toBeDefined();
    // Wait for final tick logic (interval runs every 1000ms)
    // Logic: if prevTime <= 1 -> setIsRunning(false), onComplete().
    // If initial 2, after 1000ms -> 1. After 2000ms -> 0 (and trigger).
    // The implementation checks: if (prevTime <= 1) { ... return 0 }

    expect(onComplete).toHaveBeenCalled();
    expect(screen.getAllByText('Time is up!')[0]).toBeDefined();
  });

  it('should work in stopwatch mode', () => {
    render(<Timer mode="stopwatch" />);
    expect(screen.getByText('00:00')).toBeDefined();

    fireEvent.click(screen.getByText('Start'));

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByText('00:03')).toBeDefined();
  });
});
