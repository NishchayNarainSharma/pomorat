import { useState, useEffect } from 'react';
import { PlayIcon, PauseIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import Rat from './Rat';

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
    <div className="min-h-screen pt-20 bg-gradient-to-b from-blue-100 to-purple-100">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Stopwatch 🕒
        </h1>

        <div className="flex justify-center scale-150 mb-8">
          <Rat />
        </div>

        <div className="flex flex-col items-center space-y-6">
          <div className="timer-display">
            {formatTime(time)}
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleStartStop}
              className="timer-button"
            >
              {isRunning ? (
                <PauseIcon className="w-6 h-6" />
              ) : (
                <PlayIcon className="w-6 h-6" />
              )}
            </button>

            <button
              onClick={handleReset}
              className="timer-button"
            >
              <ArrowPathIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch; 