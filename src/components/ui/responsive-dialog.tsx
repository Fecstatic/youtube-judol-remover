'use client';

import * as React from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/UseMediaQuery';
import { cn } from '@/utils/Helpers';

interface BaseProps {
  children: React.ReactNode;
}

interface RootResponsiveDialogProps extends BaseProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface ResponsiveDialogProps extends BaseProps {
  className?: string;
  asChild?: true;
}

const desktop = '(min-width: 768px)';

const ResponsiveDialog = ({
  children,
  ...props
}: RootResponsiveDialogProps) => {
  const isDesktop = useMediaQuery(desktop);
  const ResponsiveDialogd = isDesktop ? Dialog : Drawer;

  return <ResponsiveDialogd {...props}>{children}</ResponsiveDialogd>;
};

const ResponsiveDialogTrigger = ({
  className,
  children,
  ...props
}: ResponsiveDialogProps) => {
  const isDesktop = useMediaQuery(desktop);
  const ResponsiveDialogTriggerd = isDesktop ? DialogTrigger : DrawerTrigger;

  return (
    <ResponsiveDialogTriggerd className={className} {...props}>
      {children}
    </ResponsiveDialogTriggerd>
  );
};

const ResponsiveDialogClose = ({
  className,
  children,
  ...props
}: ResponsiveDialogProps) => {
  const isDesktop = useMediaQuery(desktop);
  const ResponsiveDialogClosed = isDesktop ? DialogClose : DrawerClose;

  return (
    <ResponsiveDialogClosed className={className} {...props}>
      {children}
    </ResponsiveDialogClosed>
  );
};

const ResponsiveDialogContent = ({
  className,
  children,
  ...props
}: ResponsiveDialogProps) => {
  const isDesktop = useMediaQuery(desktop);
  const ResponsiveDialogContentd = isDesktop ? DialogContent : DrawerContent;

  return (
    <ResponsiveDialogContentd className={className} {...props}>
      {children}
    </ResponsiveDialogContentd>
  );
};

const ResponsiveDialogDescription = ({
  className,
  children,
  ...props
}: ResponsiveDialogProps) => {
  const isDesktop = useMediaQuery(desktop);
  const ResponsiveDialogDescriptiond = isDesktop
    ? DialogDescription
    : DrawerDescription;

  return (
    <ResponsiveDialogDescriptiond className={className} {...props}>
      {children}
    </ResponsiveDialogDescriptiond>
  );
};

const ResponsiveDialogHeader = ({
  className,
  children,
  ...props
}: ResponsiveDialogProps) => {
  const isDesktop = useMediaQuery(desktop);
  const ResponsiveDialogHeaderd = isDesktop ? DialogHeader : DrawerHeader;

  return (
    <ResponsiveDialogHeaderd className={className} {...props}>
      {children}
    </ResponsiveDialogHeaderd>
  );
};

const ResponsiveDialogTitle = ({
  className,
  children,
  ...props
}: ResponsiveDialogProps) => {
  const isDesktop = useMediaQuery(desktop);
  const ResponsiveDialogTitled = isDesktop ? DialogTitle : DrawerTitle;

  return (
    <ResponsiveDialogTitled className={className} {...props}>
      {children}
    </ResponsiveDialogTitled>
  );
};

const ResponsiveDialogBody = ({
  className,
  children,
  ...props
}: ResponsiveDialogProps) => {
  return (
    <div className={cn('px-4 lg:px-0', className)} {...props}>
      {children}
    </div>
  );
};

const ResponsiveDialogFooter = ({
  className,
  children,
  ...props
}: ResponsiveDialogProps) => {
  const isDesktop = useMediaQuery(desktop);
  const ResponsiveDialogFooterd = isDesktop ? DialogFooter : DrawerFooter;

  return (
    <ResponsiveDialogFooterd className={className} {...props}>
      {children}
    </ResponsiveDialogFooterd>
  );
};

export {
  ResponsiveDialog,
  ResponsiveDialogBody,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
};
