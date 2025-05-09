'use client';

import { motion } from 'framer-motion';

import { cn } from '@/utils/Helpers';

interface BlurIntProps {
  word: string;
  className?: string;
  variant?: {
    hidden: { filter: string; opacity: number };
    visible: { filter: string; opacity: number };
  };
  duration?: number;
}
function BlurIn({ word, className, variant, duration = 1 }: BlurIntProps) {
  const defaultVariants = {
    hidden: { filter: 'blur(10px)', opacity: 0 },
    visible: { filter: 'blur(0px)', opacity: 1 },
  };
  const combinedVariants = variant || defaultVariants;

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      transition={{ duration }}
      variants={combinedVariants}
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={cn(
        className,
        'font-display text-center font-bold tracking-[-0.02em] drop-shadow-sm md:leading-[5rem]',
      )}
    >
      {word}
    </motion.h1>
  );
}

export default BlurIn;
