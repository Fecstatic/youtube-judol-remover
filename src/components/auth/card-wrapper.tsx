'use client';

import { BackButton } from '@/components/auth/back-button';
import { Header } from '@/components/auth/header';
import { Social } from '@/components/auth/social';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

interface CardWrapperProps {
  children: React.ReactNode;
  headerTitle: string;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHerf: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerTitle,
  headerLabel,
  backButtonLabel,
  backButtonHerf,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-screen border-0 lg:w-[450px] lg:border">
      <CardHeader>
        <Header title={headerTitle} label={headerLabel} />
      </CardHeader>

      <CardContent>{children}</CardContent>

      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backButtonHerf} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};
