import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-800/80 backdrop-blur-md shadow-sm shadow-purple-900/20 z-50 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="text-xl md:text-2xl font-bold text-gray-100 flex items-center space-x-2 hover:text-purple-400 transition-colors"
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🐀
            </motion.span>
            <span className="hidden sm:inline bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              PomodoroRat
            </span>
          </Link>
          
          <div className="flex space-x-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-xl text-base md:text-lg font-medium transition-all ${
                isActive('/') 
                  ? 'text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-md' 
                  : 'text-gray-300 hover:text-purple-400 hover:bg-purple-900/30'
              }`}
            >
              Timer
            </Link>
            <Link
              to="/stopwatch"
              className={`px-3 py-2 rounded-xl text-base md:text-lg font-medium transition-all ${
                isActive('/stopwatch')
                  ? 'text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-md'
                  : 'text-gray-300 hover:text-purple-400 hover:bg-purple-900/30'
              }`}
            >
              Stopwatch
            </Link>
            <Link
              to="/log"
              className={`px-3 py-2 rounded-xl text-base md:text-lg font-medium transition-all ${
                isActive('/log')
                  ? 'text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-md'
                  : 'text-gray-300 hover:text-purple-400 hover:bg-purple-900/30'
              }`}
            >
              Log
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 