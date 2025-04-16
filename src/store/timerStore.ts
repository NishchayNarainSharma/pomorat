import { create } from 'zustand';

interface TimerState {
  timeLeft: number;
  isRunning: boolean;
  isPaused: boolean;
  workDuration: number;
  breakDuration: number;
  milestonesHit: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  tick: () => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  timeLeft: 45 * 60, // 45 minutes in seconds
  isRunning: false,
  isPaused: false,
  workDuration: 45 * 60,
  breakDuration: 15 * 60,
  milestonesHit: 0,

  startTimer: () => set({ isRunning: true, isPaused: false }),
  pauseTimer: () => set({ isRunning: false, isPaused: true }),
  resetTimer: () => set({ 
    timeLeft: 45 * 60,
    isRunning: false,
    isPaused: false 
  }),
  tick: () => set((state) => {
    if (!state.isRunning) return state;
    
    const newTimeLeft = state.timeLeft - 1;
    if (newTimeLeft <= 0) {
      return {
        timeLeft: state.workDuration,
        isRunning: false,
        milestonesHit: state.milestonesHit + 1
      };
    }
    
    return { timeLeft: newTimeLeft };
  }),
})); 