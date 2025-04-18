import { useState, useEffect } from 'react';
import { PlayIcon, PauseIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import Rat from './Rat';
import CircularProgress from './CircularProgress';

const MAX_TIME = 3600; // 1 hour in seconds

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => setIsRunning(!isRunning);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 pb-8 px-4">
      <div className="w-full max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 space-y-6 border-2 border-purple-100 dark:border-purple-900">
        <h1 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
          Stopwatch 🕒
        </h1>

        <div className="flex justify-center scale-125 md:scale-150 mb-6 md:mb-8">
          <Rat />
        </div>

        <div className="flex flex-col items-center space-y-8">
          <div className="relative">
            <CircularProgress 
              progress={(time % MAX_TIME) / MAX_TIME}
              isRunning={isRunning}
              size={280}
            />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                key={time}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="timer-display"
              >
                {formatTime(time)}
              </motion.div>
            </div>
          </div>

          <div className="flex space-x-4">
            <motion.button
              onClick={handleStartStop}
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
              onClick={handleReset}
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
        </div>
      </div>
    </div>
  );
};

export default Stopwatch; 