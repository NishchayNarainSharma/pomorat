import React, { useState } from 'react';
import { useTimerStore } from '../store/timerStore';
import { motion } from 'framer-motion';

interface TaskInputProps {
  onClose: () => void;
}

export default function TaskInput({ onClose }: TaskInputProps) {
  const [inputValue, setInputValue] = useState('');
  const { setTaskName, startTimer } = useTimerStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setTaskName(inputValue.trim());
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", duration: 0.3 }}
        className="w-full max-w-md overflow-hidden bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-purple-500/20">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            What are you working on?
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter your task..."
              className="w-full px-4 py-3 text-lg bg-gray-900/50 border-2 border-purple-500/20 rounded-xl 
                       text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50
                       transition-colors duration-200"
              autoFocus
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 text-gray-300 hover:text-white transition-colors duration-200
                       rounded-lg hover:bg-gray-700/50"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg
                       font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30
                       transition-shadow duration-200"
            >
              Start Timer
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
} 