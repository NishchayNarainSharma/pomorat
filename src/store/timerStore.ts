import { create } from 'zustand';

interface TimerState {
  timeLeft: number;
  totalTime: number;
  isRunning: boolean;
  milestonesHit: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  tick: () => void;
}

const POMODORO_TIME = 25 * 60; // 25 minutes in seconds

export const useTimerStore = create<TimerState>((set) => ({
  timeLeft: POMODORO_TIME,
  totalTime: POMODORO_TIME,
  isRunning: false,
  milestonesHit: 0,

  startTimer: () => set({ isRunning: true }),
  
  pauseTimer: () => set({ isRunning: false }),
  
  resetTimer: () => set({ 
    timeLeft: POMODORO_TIME,
    isRunning: false 
  }),
  
  tick: () => set((state) => {
    if (state.timeLeft <= 0) {
      return {
        timeLeft: POMODORO_TIME,
        isRunning: false,
        milestonesHit: state.milestonesHit + 1
      };
    }
    return { timeLeft: state.timeLeft - 1 };
  }),
})); 