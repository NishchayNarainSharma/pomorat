import { useEffect } from 'react';
import { useTimerStore } from '../store/timerStore';
import { PlayIcon, PauseIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import CircularProgress from './CircularProgress';

const Timer = () => {
  const { 
    timeLeft, 
    isRunning, 
    milestonesHit,
    startTimer, 
    pauseTimer, 
    resetTimer, 
    tick,
    totalTime
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
    <div className="flex flex-col items-center space-y-8">
      <div className="relative">
        <CircularProgress 
          progress={1 - (timeLeft / totalTime)}
          isRunning={isRunning}
          size={280}
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="timer-display">
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>
      
      <div className="flex space-x-4">
        <motion.button
          onClick={isRunning ? pauseTimer : startTimer}
          className="timer-button"
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
                <PauseIcon className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="play"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -180 }}
                transition={{ duration: 0.3 }}
              >
                <PlayIcon className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
        
        <motion.button
          onClick={resetTimer}
          className="timer-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isRunning ? 360 : 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <ArrowPathIcon className="w-6 h-6" />
          </motion.div>
        </motion.button>
      </div>

      <div className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
        Milestones Hit: {milestonesHit}
      </div>
    </div>
  );
};

export default Timer; 