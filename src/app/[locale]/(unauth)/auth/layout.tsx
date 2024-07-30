import { Logo } from '@/components/landing/logo';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="grid grid-cols-1 place-items-center gap-2">
        <Logo />
        {children}
      </div>
    </div>
  );
}
