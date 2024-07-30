'use client';

import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';

import { cn } from '@/utils/Helpers';

interface WordFadeInProps {
  words: string;
  className?: string;
  delay?: number;
  variants?: Variants;
}

export default function WordFadeIn({
  words,
  delay = 0.15,
  variants = {
    hidden: { opacity: 0 },
    visible: (i: any) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * delay },
    }),
  },
  className,
}: WordFadeInProps) {
  const swords = words.split(' ');

  return (
    <motion.h1
      variants={variants}
      initial="hidden"
      animate="visible"
      className={cn(
        'text-center text-xl font-semibold text-gray-700 drop-shadow-sm dark:text-gray-300',
        className,
      )}
    >
      {swords.map((word, i) => (
        <motion.span key={word} variants={variants} custom={i}>
          {word}{' '}
        </motion.span>
      ))}
    </motion.h1>
  );
}
