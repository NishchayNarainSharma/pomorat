import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Rat from '../Rat';

const FloatingShape = ({ className = '', delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full ${className}`}
    animate={{
      y: [0, -20, 0],
      opacity: [0.5, 0.8, 0.5],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

const Background = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Adjust number of grass blades based on screen size
  const numGrassBlades = windowWidth < 640 ? 10 : 20;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
      {/* Decorative floating shapes */}
      <FloatingShape className="w-32 h-32 bg-pink-100/40 blur-2xl left-1/4 top-1/4" delay={0} />
      <FloatingShape className="w-40 h-40 bg-purple-100/40 blur-2xl right-1/4 top-1/3" delay={1} />
      <FloatingShape className="w-24 h-24 bg-blue-100/40 blur-2xl left-1/3 bottom-1/3" delay={2} />
      
      {/* Grass */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-300 to-green-200 opacity-60" />
      
      {/* Animated grass blades */}
      <div className="absolute bottom-0 left-0 right-0 h-24 flex justify-around">
        {[...Array(numGrassBlades)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 sm:w-3 bg-green-400/80 rounded-t-full"
            style={{
              height: `${Math.random() * 30 + 30}px`,
              originY: 1
            }}
            animate={{
              scaleY: [1, 1.1, 1],
              rotate: [0, i % 2 === 0 ? 3 : -3, 0]
            }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Background Rats - only show on larger screens */}
      {windowWidth >= 640 && [...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-20"
          initial={{ x: -100 }}
          animate={{
            x: [windowWidth + 100, -100],
          }}
          transition={{
            duration: 20,
            delay: i * 7,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            scale: 0.4,
            opacity: 0.4
          }}
        >
          <Rat />
        </motion.div>
      ))}
    </div>
  );
};

export default Background; 