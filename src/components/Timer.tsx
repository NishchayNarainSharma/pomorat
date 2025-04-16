import { useEffect } from 'react';
import { useTimerStore } from '../store/timerStore';
import { PlayIcon, PauseIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

const Timer = () => {
  const { 
    timeLeft, 
    isRunning, 
    milestonesHit,
    startTimer, 
    pauseTimer, 
    resetTimer, 
    tick 
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
    <div className="flex flex-col items-center space-y-6">
      <div className="timer-display">
        {formatTime(timeLeft)}
      </div>
      
      <div className="flex space-x-4">
        <button
          onClick={isRunning ? pauseTimer : startTimer}
          className="timer-button"
        >
          {isRunning ? (
            <PauseIcon className="w-6 h-6" />
          ) : (
            <PlayIcon className="w-6 h-6" />
          )}
        </button>
        
        <button
          onClick={resetTimer}
          className="timer-button"
        >
          <ArrowPathIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="text-lg font-semibold text-gray-700">
        Milestones Hit: {milestonesHit}
      </div>
    </div>
  );
};

export default Timer; 