import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Timer from './components/Timer';
import Stopwatch from './components/Stopwatch';
import PomoLog from './components/PomoLog';
import Navbar from './components/layout/Navbar';
import Background from './components/background/Background';
import Rat from './components/Rat';

function App() {
  return (
    <Router>
      <div className="relative">
        <Background />
        <Navbar />
        
        <Routes>
          <Route path="/" element={
            <div className="min-h-screen pt-20 bg-gradient-to-b from-blue-100 to-purple-100">
              <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-8">
                <h1 className="text-3xl font-bold text-center text-gray-800">
                  PomodoroRat 🐀
                </h1>
                
                <div className="flex justify-center scale-150 mb-8">
                  <Rat />
                </div>
                
                <Timer />
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
