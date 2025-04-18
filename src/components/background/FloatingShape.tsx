import { motion } from 'framer-motion';

interface FloatingShapeProps {
  className?: string;
  delay?: number;
}

const FloatingShape = ({ className = '', delay = 0 }: FloatingShapeProps) => (
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

export default FloatingShape; 