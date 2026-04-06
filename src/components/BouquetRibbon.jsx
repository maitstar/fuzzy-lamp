import { motion } from 'framer-motion';

export default function BouquetRibbon({ x = 300, y = 520, scale = 1, isSealing = false }) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        zIndex: 10,
        transform: `translate(-50%, -50%) scale(${scale})`,
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Decorative Ribbon Wrap */}
      <svg
        width="200"
        height="80"
        viewBox="0 0 200 80"
        className={`drop-shadow-lg ${!isSealing && 'animate-float'}`}
      >
        {/* Left ribbon loop */}
        <path
          d="M 50 20 Q 30 20 30 40 Q 30 60 50 60"
          fill="none"
          stroke="#D4A574"
          strokeWidth="18"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* Right ribbon loop */}
        <path
          d="M 150 20 Q 170 20 170 40 Q 170 60 150 60"
          fill="none"
          stroke="#D4A574"
          strokeWidth="18"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* Center knot */}
        <circle cx="100" cy="40" r="16" fill="#B8956A" opacity="0.95" />
        <circle cx="100" cy="40" r="12" fill="#D4A574" opacity="0.8" />

        {/* Ribbon tails */}
        <path
          d="M 80 60 L 60 75 L 65 65 Z"
          fill="#C9956F"
          opacity="0.85"
        />
        <path
          d="M 120 60 L 140 75 L 135 65 Z"
          fill="#C9956F"
          opacity="0.85"
        />

        {/* Subtle highlight on knot */}
        <circle cx="98" cy="37" r="4" fill="white" opacity="0.4" />
      </svg>

      {/* Subtle shadow beneath ribbon */}
      <svg
        width="200"
        height="20"
        viewBox="0 0 200 20"
        style={{ marginTop: '-8px', opacity: 0.15 }}
      >
        <ellipse cx="100" cy="10" rx="80" ry="8" fill="#000" />
      </svg>
    </motion.div>
  );
}
