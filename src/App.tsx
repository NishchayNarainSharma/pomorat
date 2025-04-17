import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Timer from './components/Timer';
import Stopwatch from './components/Stopwatch';
import PomoLog from './components/PomoLog';
import Navbar from './components/layout/Navbar';
import Background from './components/background/Background';
import Rat from './components/Rat';
import AmbientLight from './components/AmbientLight';
import SpotifyConnect from './components/SpotifyConnect';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
        <Background />
        <Navbar />
        
        <Routes>
          <Route path="/" element={
            <div className="min-h-screen flex items-center justify-center pt-16 pb-8 px-4">
              <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8 relative z-10">
                {/* Left Side - Ambient Light */}
                <AmbientLight className="w-full md:w-auto" />

                {/* Center - Timer */}
                <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
                  <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
                    PomodoroRat 🐀
                  </h1>
                  
                  <div className="flex justify-center scale-125 md:scale-150 mb-6 md:mb-8">
                    <Rat />
                  </div>
                  
                  <Timer />
                </div>

                {/* Right Side - Spotify */}
                <SpotifyConnect className="w-full md:w-auto" />
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
