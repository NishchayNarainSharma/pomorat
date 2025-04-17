import { useState } from 'react';
import { MusicalNoteIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

interface SpotifyConnectProps {
  className?: string;
}

const SpotifyConnect = ({ className = '' }: SpotifyConnectProps) => {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    // TODO: Implement actual Spotify OAuth
    // For now, just toggle the state
    setIsConnected(!isConnected);
  };

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <motion.div 
        className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-6 w-full max-w-[200px] border-2 border-green-100"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.div 
          className="flex items-center justify-center mb-4"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <MusicalNoteIcon className="w-10 h-10 text-green-400 drop-shadow-lg" />
        </motion.div>
        <h3 className="text-center text-sm font-medium text-gray-700 mb-4">
          🎵 Spotify Music 🎵
        </h3>
        
        <motion.button
          onClick={handleConnect}
          className={`w-full py-2.5 px-4 rounded-xl font-medium text-sm transition-all shadow-md ${
            isConnected
              ? 'bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white'
              : 'bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isConnected ? '🎵 Disconnect' : '🎵 Connect to Spotify'}
        </motion.button>

        {isConnected && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-center text-sm text-gray-600"
          >
            <span className="inline-flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Connected to Spotify
            </span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SpotifyConnect; 