import { useState, useEffect } from 'react';
import { PlayIcon, PauseIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import CircularProgress from './CircularProgress';
import Rat from './Rat';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Calculate progress for the circle (resets every hour)
  const circleProgress = (time % 3600) / 3600;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pb-4 pt-20">
      <div className="w-full max-w-md bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl p-4 md:p-6 space-y-4 md:space-y-6 border-2 border-purple-900">
        <h1 className="text-xl md:text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Stopwatch 🕒
        </h1>

        <div className="flex justify-center scale-100 md:scale-125">
          <Rat />
        </div>

        <div className="flex flex-col items-center space-y-4 md:space-y-6">
          <div className="relative">
            <CircularProgress 
              progress={circleProgress}
              isRunning={isRunning}
              size={Math.min(window.innerWidth - 64, 280)}
            />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="timer-display text-3xl md:text-4xl lg:text-5xl">
                {formatTime(time)}
              </div>
            </div>
          </div>

          <div className="flex space-x-3 md:space-x-4">
            <motion.button
              onClick={handleStartStop}
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
              onClick={handleReset}
              className="timer-button px-4 md:px-6 py-2 md:py-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowPathIcon className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch; 