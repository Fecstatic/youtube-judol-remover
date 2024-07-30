/* eslint-disable tailwindcss/no-custom-classname */
import { Poppins } from 'next/font/google';

import { cn } from '@/utils/Helpers';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

export const Header = ({ label, title }: { label: string; title: string }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <h1 className={cn('text-2xl font-semibold', font.className)}>{title}</h1>

      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};
