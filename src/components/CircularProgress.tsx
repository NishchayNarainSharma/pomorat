import { motion } from 'framer-motion';

interface CircularProgressProps {
  progress: number; // 0 to 1
  size?: number;
  strokeWidth?: number;
  isRunning?: boolean;
}

const CircularProgress = ({
  progress,
  size = 200,
  strokeWidth = 15,
  isRunning = false
}: CircularProgressProps) => {
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference * (1 - progress);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Background circle */}
      <svg
        className="absolute transform -rotate-90"
        width={size}
        height={size}
      >
        <circle
          className="text-purple-900"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          r={radius}
          cx={center}
          cy={center}
        />
        <motion.circle
          className="text-purple-400"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          r={radius}
          cx={center}
          cy={center}
          initial={{ strokeDashoffset: circumference }}
          animate={{ 
            strokeDashoffset: progressOffset,
            transition: { 
              duration: 1,
              ease: "linear"
            }
          }}
          style={{
            strokeDasharray: circumference
          }}
        />
      </svg>

      {/* Static highlight when running */}
      {isRunning && (
        <div className="absolute inset-0 rounded-full bg-purple-500/5" />
      )}
    </div>
  );
};

export default CircularProgress; 