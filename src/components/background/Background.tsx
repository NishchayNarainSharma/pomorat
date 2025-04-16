import { motion } from 'framer-motion';
import Rat from '../Rat';

const Background = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Grass */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-400 to-green-300" />
      
      {/* Animated grass blades */}
      <div className="absolute bottom-0 left-0 right-0 h-24 flex justify-around">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="w-4 bg-green-500 rounded-t-full"
            style={{
              height: `${Math.random() * 40 + 40}px`,
              originY: 1
            }}
            animate={{
              scaleY: [1, 1.1, 1],
              rotate: [0, i % 2 === 0 ? 5 : -5, 0]
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

      {/* Background Rats */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-20"
          initial={{ x: -100 }}
          animate={{
            x: [window.innerWidth + 100, -100],
          }}
          transition={{
            duration: 15,
            delay: i * 5,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            scale: 0.5,
            opacity: 0.5
          }}
        >
          <Rat />
        </motion.div>
      ))}
    </div>
  );
};

export default Background; 