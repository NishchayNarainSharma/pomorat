import { useState, useEffect } from 'react';
import { SunIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

interface AmbientLightProps {
  className?: string;
}

const AmbientLight = ({ className = '' }: AmbientLightProps) => {
  const [intensity, setIntensity] = useState(0);

  useEffect(() => {
    // Apply the yellow overlay to the root element
    document.documentElement.style.setProperty(
      '--ambient-overlay',
      `rgba(255, 248, 229, ${intensity * 0.7})`
    );

    return () => {
      document.documentElement.style.removeProperty('--ambient-overlay');
    };
  }, [intensity]);

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <motion.div 
        className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-6 w-full max-w-[200px] border-2 border-yellow-100"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.div 
          className="flex items-center justify-center mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <SunIcon className="w-10 h-10 text-yellow-400 drop-shadow-lg" />
        </motion.div>
        <h3 className="text-center text-sm font-medium text-gray-700 mb-4">
          ✨ Ambient Light ✨
        </h3>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={intensity}
            onChange={(e) => setIntensity(parseFloat(e.target.value))}
            className="w-full h-3 bg-yellow-100 rounded-full appearance-none cursor-pointer accent-yellow-400 hover:accent-yellow-500 transition-all"
          />
          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <span>🌑</span>
            <span>🌞</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AmbientLight; 