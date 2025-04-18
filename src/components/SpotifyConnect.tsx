import { useState } from 'react';
import { MusicalNoteIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const SpotifyConnect = () => {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    // TODO: Implement actual Spotify OAuth
    setIsConnected(!isConnected);
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <motion.div 
          className="flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <MusicalNoteIcon className="w-6 h-6 text-green-400" />
        </motion.div>
        <div>
          <h3 className="text-sm font-medium text-gray-300">
            Spotify Music
          </h3>
          {isConnected && (
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
              </span>
              Connected
            </div>
          )}
        </div>
      </div>

      <motion.button
        onClick={handleConnect}
        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all shadow-md ${
          isConnected
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-green-500 hover:bg-green-600 text-white'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isConnected ? 'Disconnect' : 'Connect'}
      </motion.button>
    </div>
  );
};

export default SpotifyConnect; 