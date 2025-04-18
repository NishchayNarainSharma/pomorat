import { create } from 'zustand';

interface TimerState {
  timeLeft: number;
  totalTime: number;
  isRunning: boolean;
  milestonesHit: number;
  isBreak: boolean;
  breakTime: number;
  timerPresets: number[];
  selectedPreset: number;
  setSelectedPreset: (preset: number) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  tick: () => void;
  switchToBreak: () => void;
  switchToWork: () => void;
}

export const useTimerStore = create<TimerState>((set, get) => ({
  timeLeft: 25 * 60, // Default 25 minutes
  totalTime: 25 * 60,
  isRunning: false,
  milestonesHit: 0,
  isBreak: false,
  breakTime: 5 * 60, // Default 5 minutes break
  timerPresets: [25, 45, 60, 90], // Timer presets in minutes
  selectedPreset: 25,

  setSelectedPreset: (preset: number) => {
    const timeInSeconds = preset * 60;
    set({
      selectedPreset: preset,
      timeLeft: timeInSeconds,
      totalTime: timeInSeconds,
      isRunning: false
    });
  },

  startTimer: () => set({ isRunning: true }),
  
  pauseTimer: () => set({ isRunning: false }),
  
  resetTimer: () => {
    const { selectedPreset, isBreak } = get();
    const timeInSeconds = (isBreak ? 5 : selectedPreset) * 60;
    set({
      timeLeft: timeInSeconds,
      totalTime: timeInSeconds,
      isRunning: false
    });
  },

  tick: () => {
    const { timeLeft, isBreak } = get();
    if (timeLeft <= 0) {
      // Timer completed
      if (isBreak) {
        // Break timer completed, switch to work timer
        get().switchToWork();
      } else {
        // Work timer completed, switch to break timer
        get().switchToBreak();
      }
      return;
    }
    set((state) => ({ timeLeft: state.timeLeft - 1 }));
  },

  switchToBreak: () => {
    const breakTimeInSeconds = 5 * 60; // 5 minutes break
    set((state) => ({
      isBreak: true,
      timeLeft: breakTimeInSeconds,
      totalTime: breakTimeInSeconds,
      isRunning: false,
      milestonesHit: state.milestonesHit + 1
    }));
  },

  switchToWork: () => {
    const { selectedPreset } = get();
    const workTimeInSeconds = selectedPreset * 60;
    set({
      isBreak: false,
      timeLeft: workTimeInSeconds,
      totalTime: workTimeInSeconds,
      isRunning: false
    });
  }
})); 