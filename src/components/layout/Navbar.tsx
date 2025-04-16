import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
            <span>🐀</span>
            <span>PomodoroRat</span>
          </Link>
          
          <div className="flex space-x-8">
            <Link
              to="/"
              className={`text-lg font-medium transition-colors ${
                isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              Timer
            </Link>
            <Link
              to="/stopwatch"
              className={`text-lg font-medium transition-colors ${
                isActive('/stopwatch') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              Stopwatch
            </Link>
            <Link
              to="/log"
              className={`text-lg font-medium transition-colors ${
                isActive('/log') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              Pomo Log
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 