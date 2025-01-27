import { motion } from 'framer-motion';

export default function Logo({ className = '', size = 40 }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <motion.div
        className="relative"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Ring */}
          <motion.circle
            cx="20"
            cy="20"
            r="18"
            stroke="url(#gradient)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          
          {/* Inner Hexagon */}
          <motion.path
            d="M20 8L28.66 13V23L20 28L11.34 23V13L20 8Z"
            stroke="url(#gradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
          />
          
          {/* Center Point */}
          <motion.circle
            cx="20"
            cy="20"
            r="3"
            fill="url(#gradient)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          />
          
          {/* Connecting Lines */}
          <motion.g
            stroke="url(#gradient)"
            strokeWidth="1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <line x1="20" y1="8" x2="20" y2="17" />
            <line x1="28.66" y1="13" x2="23" y2="20" />
            <line x1="28.66" y1="23" x2="23" y2="20" />
            <line x1="20" y1="28" x2="20" y2="23" />
            <line x1="11.34" y1="23" x2="17" y2="20" />
            <line x1="11.34" y1="13" x2="17" y2="20" />
          </motion.g>

          {/* Gradient Definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#E0E7FF" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      <motion.span
        className="text-2xl font-bold bg-gradient-text"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        Nebula
      </motion.span>
    </div>
  );
} 