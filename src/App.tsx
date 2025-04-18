import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Timer from './components/Timer';
import Stopwatch from './components/Stopwatch';
import PomoLog from './components/PomoLog';
import Navbar from './components/layout/Navbar';
import Background from './components/background/Background';
import Rat from './components/Rat';
import SpotifyConnect from './components/SpotifyConnect';
import { useState } from 'react';
import TaskInput from './components/TaskInput';
import { useTimerStore } from './store/timerStore';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [showTaskInput, setShowTaskInput] = useState(false);
  const taskName = useTimerStore((state) => state.taskName);

  return (
    <Router>
      <div className="relative min-h-screen bg-gray-900 transition-colors duration-300">
        <Background />
        <Navbar />
        
        <Routes>
          <Route path="/" element={
            <div className="min-h-screen flex items-center justify-center px-4 pb-4 pt-20">
              <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-6 relative z-10">
                {/* Timer */}
                <div className="w-full bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl p-4 md:p-6 space-y-4 md:space-y-6 border-2 border-purple-900">
                  <h1 className="text-xl md:text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    PomodoroRat 🐀
                  </h1>
                  
                  <div className="flex justify-center scale-100 md:scale-125">
                    <Rat />
                  </div>
                  
                  <Timer />
                </div>

                {/* Spotify Connect */}
                <div className="w-full max-w-md bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-lg p-4 border border-purple-800/50 hover:border-purple-700/50 transition-colors">
                  <SpotifyConnect />
                </div>

                <div className="w-full max-w-md mx-auto text-center">
                  {taskName ? (
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                      {taskName}
                    </h2>
                  ) : (
                    <button
                      onClick={() => setShowTaskInput(true)}
                      className="mb-4 px-4 py-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      + Add Task
                    </button>
                  )}
                </div>
              </div>
            </div>
          } />
          <Route path="/stopwatch" element={<Stopwatch />} />
          <Route path="/log" element={<PomoLog />} />
        </Routes>

        <AnimatePresence>
          {showTaskInput && (
            <TaskInput onClose={() => setShowTaskInput(false)} />
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
