"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";

function FloatingPathsBase({ position }: { position: number }) {
  // Reduced from 36 to 12 paths for much better performance
  const paths = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const idx = i * 3; // spread out to maintain visual coverage
        return {
          id: i,
          d: `M-${380 - idx * 5 * position} -${189 + idx * 6}C-${
            380 - idx * 5 * position
          } -${189 + idx * 6} -${312 - idx * 5 * position} ${216 - idx * 6} ${
            152 - idx * 5 * position
          } ${343 - idx * 6}C${616 - idx * 5 * position} ${470 - idx * 6} ${
            684 - idx * 5 * position
          } ${875 - idx * 6} ${684 - idx * 5 * position} ${875 - idx * 6}`,
          color: `rgba(190,148,37,${0.1 + idx * 0.03})`,
          width: 0.2 + idx * 0.015,
        };
      }),
    [position]
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden will-change-transform">
      <svg
        className="w-[200%] h-[200%] md:w-full md:h-full -translate-x-1/4 -translate-y-1/4 md:translate-x-0 md:translate-y-0"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={path.color}
            strokeWidth={path.width}
            strokeOpacity={0.8}
            initial={{ pathLength: 0.3, opacity: 0.5 }}
            animate={{
              pathLength: 1,
              opacity: [0.4, 0.8, 0.4],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 25 + path.id * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

const FloatingPaths = memo(FloatingPathsBase);

export { FloatingPaths };
