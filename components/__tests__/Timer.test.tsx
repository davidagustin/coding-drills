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

  // Test for the 'warning' urgency level (covers line 97)
  // Warning state: countdown mode, time between 11 and 30
  it('should apply warning styles when countdown time is between 11 and 30 seconds', () => {
    render(<Timer mode="countdown" initialTime={35} />);

    fireEvent.click(screen.getByText('Start'));

    // Advance to 25 seconds remaining (35 - 10 = 25, which is <= 30 and > 10)
    act(() => {
      vi.advanceTimersByTime(10000);
    });

    expect(screen.getByText('00:25')).toBeDefined();

    // The container should have amber/warning styling
    const timerContainer = screen.getByRole('timer');
    expect(timerContainer.className).toContain('amber');
  });

  // Test for 'critical' urgency level
  it('should apply critical styles when countdown time is 10 or less', () => {
    render(<Timer mode="countdown" initialTime={15} />);

    fireEvent.click(screen.getByText('Start'));

    // Advance to 8 seconds remaining (15 - 7 = 8, which is <= 10)
    act(() => {
      vi.advanceTimersByTime(7000);
    });

    expect(screen.getByText('00:08')).toBeDefined();

    const timerContainer = screen.getByRole('timer');
    expect(timerContainer.className).toContain('red');
    expect(timerContainer.className).toContain('animate-pulse');
  });

  // Test 'normal' urgency for stopwatch
  it('should apply normal styles for stopwatch mode', () => {
    render(<Timer mode="stopwatch" />);

    const timerContainer = screen.getByRole('timer');
    expect(timerContainer.className).toContain('gray');
    expect(timerContainer.className).not.toContain('animate-pulse');
  });

  // Test display mode labels
  it('should show "Time Remaining" label for countdown', () => {
    render(<Timer mode="countdown" initialTime={60} />);
    expect(screen.getByText('Time Remaining')).toBeDefined();
  });

  it('should show "Elapsed Time" label for stopwatch', () => {
    render(<Timer mode="stopwatch" />);
    expect(screen.getByText('Elapsed Time')).toBeDefined();
  });

  // Test custom aria label
  it('should use custom ariaLabel when provided', () => {
    render(<Timer mode="countdown" initialTime={60} ariaLabel="Custom timer label" />);
    expect(screen.getByLabelText('Custom timer label')).toBeDefined();
  });

  it('should use default ariaLabel for stopwatch', () => {
    render(<Timer mode="stopwatch" />);
    expect(screen.getByLabelText('Stopwatch')).toBeDefined();
  });

  // Test screen reader time format
  it('should display minutes and seconds for screen reader when time is over 60 seconds', () => {
    render(<Timer mode="countdown" initialTime={90} />);

    // Screen reader text should contain "1 minute"
    const srTexts = screen.getAllByText(/1 minute/);
    expect(srTexts.length).toBeGreaterThan(0);
  });

  it('should display only seconds for screen reader when time is under 60', () => {
    render(<Timer mode="countdown" initialTime={45} />);

    // Screen reader text should contain "45 seconds"
    const srTexts = screen.getAllByText(/45 second/);
    expect(srTexts.length).toBeGreaterThan(0);
  });

  // Test that Start is disabled after completion in countdown
  it('should disable Start button after countdown completes', () => {
    render(<Timer mode="countdown" initialTime={1} />);

    fireEvent.click(screen.getByText('Start'));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Timer completed, Start button should be disabled
    const startButton = screen.getByText('Start');
    expect(startButton.closest('button')?.disabled).toBe(true);
  });

  // Test reset after completion
  it('should allow Reset after countdown completes to re-enable Start', () => {
    render(<Timer mode="countdown" initialTime={1} />);

    fireEvent.click(screen.getByText('Start'));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Timer is done
    expect(screen.getByText('00:00')).toBeDefined();

    // Reset
    fireEvent.click(screen.getByText('Reset'));
    expect(screen.getByText('00:01')).toBeDefined();

    // Start should be enabled again
    const startButton = screen.getByText('Start');
    expect(startButton.closest('button')?.disabled).toBe(false);
  });

  // Test stopwatch reset
  it('should reset stopwatch to 00:00', () => {
    render(<Timer mode="stopwatch" />);

    fireEvent.click(screen.getByText('Start'));

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByText('00:05')).toBeDefined();

    fireEvent.click(screen.getByText('Reset'));
    expect(screen.getByText('00:00')).toBeDefined();
  });

  // Test screen reader announcement at specific times
  it('should announce at 30 seconds remaining', () => {
    render(<Timer mode="countdown" initialTime={35} />);

    fireEvent.click(screen.getByText('Start'));

    // Advance to 30 seconds remaining
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByText('00:30')).toBeDefined();
    // The announcement should be present for 30 seconds
    const announcements = screen.getAllByText(/30 second.* remaining/);
    expect(announcements.length).toBeGreaterThan(0);
  });

  // Test formatTime with hours (> 60 minutes equivalent)
  it('should format time correctly for larger values', () => {
    render(<Timer mode="stopwatch" />);

    fireEvent.click(screen.getByText('Start'));

    // Advance to 65 seconds
    act(() => {
      vi.advanceTimersByTime(65000);
    });

    expect(screen.getByText('01:05')).toBeDefined();
  });

  // Test singular minute/second in screen reader text
  it('should format screen reader text with singular forms correctly', () => {
    render(<Timer mode="countdown" initialTime={61} />);

    // 61 seconds = 1 minute and 1 second
    const srTexts = screen.getAllByText(/1 minute and 1 second remaining/);
    expect(srTexts.length).toBeGreaterThan(0);
  });
});
