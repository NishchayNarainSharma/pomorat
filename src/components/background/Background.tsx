import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import FloatingShape from './FloatingShape';

const Background = () => {
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate gradient rotation based on scroll
  const gradientRotation = scrollY * 0.1;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Main gradient background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-purple-950 to-fuchsia-950"
        animate={{
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,#4F46E5,#7E22CE,#D946EF,#4F46E5)]"
        style={{
          opacity: 0.15,
          transform: `rotate(${gradientRotation}deg)`,
        }}
      />

      {/* Glowing orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-fuchsia-600/20 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <FloatingShape
            key={i}
            className={`absolute w-${Math.floor(Math.random() * 16 + 24)} h-${Math.floor(Math.random() * 16 + 24)} 
              ${i % 2 === 0 ? 'bg-purple-600/5' : 'bg-fuchsia-600/5'} 
              blur-3xl
              left-[${Math.floor(Math.random() * 100)}%]
              top-[${Math.floor(Math.random() * 100)}%]`}
            delay={i * 2}
          />
        ))}
      </div>

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-950 to-transparent" />

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-purple-950/50" />
    </div>
  );
};

export default Background; 