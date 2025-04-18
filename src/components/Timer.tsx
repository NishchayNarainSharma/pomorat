import { useEffect } from 'react';
import { useTimerStore } from '../store/timerStore';
import { PlayIcon, PauseIcon, ArrowPathIcon, BeakerIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import CircularProgress from './CircularProgress';

const Timer = () => {
  const { 
    timeLeft, 
    isRunning,
    isBreak,
    milestonesHit,
    startTimer, 
    pauseTimer, 
    resetTimer, 
    tick,
    totalTime,
    timerPresets,
    selectedPreset,
    setSelectedPreset,
    switchToBreak,
    switchToWork
  } = useTimerStore();

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = setInterval(() => {
        tick();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, tick]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center space-y-4 md:space-y-6">
      {/* Timer Type Indicator */}
      <div className="text-base md:text-lg font-medium text-gray-300">
        {isBreak ? '☕ Break Time' : '🎯 Focus Time'}
      </div>

      {/* Timer Duration Slider (only show during non-break and when timer is not running) */}
      {!isBreak && !isRunning && (
        <div className="w-full max-w-xs space-y-2 px-4">
          <div className="flex justify-between text-xs md:text-sm text-gray-400">
            {timerPresets.map((preset) => (
              <span key={preset}>{preset}</span>
            ))}
          </div>
          <input
            type="range"
            min={Math.min(...timerPresets)}
            max={Math.max(...timerPresets)}
            value={selectedPreset}
            step={1}
            onChange={(e) => setSelectedPreset(Number(e.target.value))}
            className="w-full accent-purple-400"
          />
          <div className="text-center text-xs md:text-sm text-gray-400">
            {selectedPreset} minutes
          </div>
        </div>
      )}

      <div className="relative">
        <CircularProgress 
          progress={1 - (timeLeft / totalTime)}
          isRunning={isRunning}
          size={Math.min(window.innerWidth - 64, 280)}
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="timer-display text-4xl md:text-5xl">
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>
      
      <div className="flex space-x-3 md:space-x-4">
        <motion.button
          onClick={isRunning ? pauseTimer : startTimer}
          className="timer-button px-4 md:px-6 py-2 md:py-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          layout
        >
          <AnimatePresence mode="wait">
            {isRunning ? (
              <motion.div
                key="pause"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <PauseIcon className="w-5 h-5 md:w-6 md:h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="play"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -180 }}
                transition={{ duration: 0.3 }}
              >
                <PlayIcon className="w-5 h-5 md:w-6 md:h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <motion.button
          onClick={resetTimer}
          className="timer-button px-4 md:px-6 py-2 md:py-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowPathIcon className="w-5 h-5 md:w-6 md:h-6" />
        </motion.button>

        {!isRunning && (
          <motion.button
            onClick={isBreak ? switchToWork : switchToBreak}
            className="timer-button px-4 md:px-6 py-2 md:py-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BeakerIcon className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        )}
      </div>

      <div className="text-base md:text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Milestones Hit: {milestonesHit}
      </div>
    </div>
  );
};

export default Timer; 