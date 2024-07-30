'use client';

import { motion } from 'framer-motion';

import { cn } from '@/utils/Helpers';

const Section = (props: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
}) => (
  <motion.div
    initial={{ y: 200, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    exit={{ y: -200, opacity: 0 }}
    className={cn('px-3 py-16', props.className)}
  >
    {(props.title || props.subtitle || props.description) && (
      <div className="mx-auto mb-6 text-center">
        {props.subtitle && (
          <div className="bg-gradient-to-r from-yellow-500 via-purple-500 to-red-500 bg-clip-text font-bold text-transparent">
            {props.subtitle}
          </div>
        )}

        {props.title && <div className="text-3xl font-bold">{props.title}</div>}

        {props.description && (
          <div className="mt-2 text-lg text-muted-foreground">
            {props.description}
          </div>
        )}
      </div>
    )}

    <div className="mx-auto max-w-screen-xl">{props.children}</div>
  </motion.div>
);

export { Section };
