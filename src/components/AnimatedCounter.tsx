import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export default function AnimatedCounter({ 
  value, 
  duration = 2, 
  className = '',
  prefix = '',
  suffix = ''
}: AnimatedCounterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    const val = Math.round(latest);
    return `${prefix}${val.toLocaleString()}${suffix}`;
  });

  useEffect(() => {
    const controls = animate(count, value, { duration });
    return controls.stop;
  }, [count, value, duration]);

  return (
    <motion.span className={className}>
      {rounded}
    </motion.span>
  );
}
