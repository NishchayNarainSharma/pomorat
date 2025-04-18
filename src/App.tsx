import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Timer from './components/Timer';
import Stopwatch from './components/Stopwatch';
import PomoLog from './components/PomoLog';
import Navbar from './components/layout/Navbar';
import Background from './components/background/Background';
import Rat from './components/Rat';
import SpotifyConnect from './components/SpotifyConnect';

function App() {
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
              </div>
            </div>
          } />
          <Route path="/stopwatch" element={<Stopwatch />} />
          <Route path="/log" element={<PomoLog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
