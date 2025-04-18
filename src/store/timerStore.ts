import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TimerState {
  timeLeft: number;
  totalTime: number;
  isRunning: boolean;
  milestonesHit: number;
  isBreak: boolean;
  breakTime: number;
  timerPresets: number[];
  selectedPreset: number;
  taskName: string | null;
  showTaskInput: boolean;
  completedTasks: Array<{ name: string; completedAt: string }>;
  setTaskName: (name: string) => void;
  setShowTaskInput: (show: boolean) => void;
  setSelectedPreset: (minutes: number) => void;
  toggleBreak: () => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  tick: () => void;
  switchToBreak: () => void;
  switchToWork: () => void;
  completeTask: () => void;
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      timeLeft: 25 * 60, // Default 25 minutes
      totalTime: 25 * 60,
      isRunning: false,
      milestonesHit: 0,
      isBreak: false,
      breakTime: 5 * 60, // Default 5 minutes break
      timerPresets: [25, 45, 60, 90], // Timer presets in minutes
      selectedPreset: 25,
      taskName: null,
      showTaskInput: false,
      completedTasks: [],

      setTaskName: (name) => set({ taskName: name }),
      
      setShowTaskInput: (show) => set({ showTaskInput: show }),

      setSelectedPreset: (minutes) =>
        set((state) => ({
          selectedPreset: minutes,
          timeLeft: minutes * 60,
          totalTime: minutes * 60,
        })),

      toggleBreak: () =>
        set((state) => {
          const newIsBreak = !state.isBreak;
          const newTotalTime = newIsBreak ? 5 * 60 : state.selectedPreset * 60;
          return {
            isBreak: newIsBreak,
            timeLeft: newTotalTime,
            totalTime: newTotalTime,
            isRunning: false,
          };
        }),

      startTimer: () => {
        const { taskName, showTaskInput } = get();
        if (!taskName && !showTaskInput) {
          set({ showTaskInput: true });
          return;
        }
        set({ isRunning: true, showTaskInput: false });
      },
      
      pauseTimer: () => set({ isRunning: false }),
      
      resetTimer: () =>
        set((state) => ({
          timeLeft: state.totalTime,
          isRunning: false,
          taskName: null,
          showTaskInput: false
        })),

      tick: () =>
        set((state) => {
          const newTimeLeft = Math.max(0, state.timeLeft - 1);
          const stillRunning = newTimeLeft > 0;
          
          // If timer just finished and it's not a break, complete the task
          if (!stillRunning && !state.isBreak && state.taskName) {
            get().completeTask();
          }
          
          return {
            timeLeft: newTimeLeft,
            isRunning: stillRunning,
          };
        }),

      completeTask: () => {
        const { taskName } = get();
        if (taskName) {
          set((state) => ({
            completedTasks: [
              ...state.completedTasks,
              {
                name: taskName,
                completedAt: new Date().toISOString(),
              }
            ],
            taskName: null // Clear the current task
          }));
        }
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
          isRunning: false,
          taskName: null // Reset task name when switching back to work
        });
      }
    }),
    {
      name: 'pomodoro-storage',
      partialize: (state) => ({
        completedTasks: state.completedTasks,
        milestonesHit: state.milestonesHit,
        selectedPreset: state.selectedPreset,
        isBreak: state.isBreak
      })
    }
  )
); 