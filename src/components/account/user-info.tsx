// @ts-nocheck
import Cookies from 'js-cookie';
import { Copy, Pencil } from 'lucide-react';
import type { DefaultSession } from 'next-auth';
import { useTranslations } from 'next-intl';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from '@/components/ui/responsive-dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { ChangeAvatarForm } from './change-avatar-form';
import { ChangeEmailForm } from './change-email-form';
import { ChangeNameForm } from './change-name-form';
import { ChangeForm } from './change-password-form';
import { ChangeTwoFactor } from './change-two-factor';

interface UserInfoProps {
  user: {
    isTwoFactorEnabled?: boolean;
    isOAuth?: boolean;
  } & DefaultSession['user'];
}

const getInitials = (name: string) => {
  return name
    .match(/(\b\S)?/g)
    .join('')
    .toUpperCase();
};

export const UserInfo = ({ user }: UserInfoProps) => {
  const t = useTranslations('Account');
  const name = Cookies.get('next-auth.session-name');
  const initials = getInitials(name);
  return (
    <Card className="w-full">
      {/* <CardHeader>
        <p className="text-center text-2xl font-semibold">{label}</p>
      </CardHeader> */}
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">ID</p>
          <div className="flex gap-2">
            <Input value={user?.id} readOnly />
            {/* <p className="max-w-[180px] truncate rounded-sm bg-slate-100 p-1 font-mono text-xs dark:bg-slate-900">
              {user?.id}
            </p> */}
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-11 items-center"
                  >
                    <Copy className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent align="end" side="left">
                  <p>Copy ID</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">{t('avatar')}</p>
          <div className="flex gap-2">
            <Avatar>
              <AvatarImage src={user?.image} />
              <AvatarFallback>
                {getInitials(user?.name || initials)}
              </AvatarFallback>
            </Avatar>
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger>
                  <ResponsiveDialog>
                    <ResponsiveDialogTrigger asChild>
                      <Button variant="outline" size="icon" className="size-9">
                        <Pencil className="size-4" />
                      </Button>
                    </ResponsiveDialogTrigger>
                    <ResponsiveDialogContent>
                      <ResponsiveDialogHeader>
                        <ResponsiveDialogTitle>
                          {t('change_avatar')}
                        </ResponsiveDialogTitle>
                      </ResponsiveDialogHeader>
                      <ChangeAvatarForm />
                    </ResponsiveDialogContent>
                  </ResponsiveDialog>
                </TooltipTrigger>
                <TooltipContent align="end" side="left">
                  <p>{t('change_avatar')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">{t('name')}</p>
          <div className="flex gap-2">
            <Input value={user?.name} readOnly />
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger>
                  <ResponsiveDialog>
                    <ResponsiveDialogTrigger asChild>
                      <Button variant="outline" size="icon" className="size-9">
                        <Pencil className="size-4" />
                      </Button>
                    </ResponsiveDialogTrigger>
                    <ResponsiveDialogContent>
                      <ResponsiveDialogHeader>
                        <ResponsiveDialogTitle>
                          {t('change_name')}
                        </ResponsiveDialogTitle>
                      </ResponsiveDialogHeader>
                      <ChangeNameForm name={user?.name} t={t} />
                    </ResponsiveDialogContent>
                  </ResponsiveDialog>
                </TooltipTrigger>
                <TooltipContent align="end" side="left">
                  <p>{t('change_name')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">{t('email')}</p>
          <div className="flex gap-2">
            <Input value={user?.email} readOnly />
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger>
                  <ResponsiveDialog>
                    <ResponsiveDialogTrigger asChild>
                      <Button variant="outline" size="icon" className="size-9">
                        <Pencil className="size-4" />
                      </Button>
                    </ResponsiveDialogTrigger>
                    <ResponsiveDialogContent>
                      <ResponsiveDialogHeader>
                        <ResponsiveDialogTitle>
                          {t('change_email')}
                        </ResponsiveDialogTitle>
                      </ResponsiveDialogHeader>
                      <ChangeEmailForm email={user?.email} t={t} />
                    </ResponsiveDialogContent>
                  </ResponsiveDialog>
                </TooltipTrigger>
                <TooltipContent align="end" side="left">
                  <p>{t('change_email')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {/* <p className="max-w-[250px] truncate rounded-sm bg-slate-100 p-1 font-mono text-xs dark:bg-slate-900">
            {user?.email}
          </p> */}
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">{t('password')}</p>
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger>
                <ResponsiveDialog>
                  <ResponsiveDialogTrigger asChild>
                    <Button variant="outline" size="icon" className="size-9">
                      <Pencil className="size-4" />
                    </Button>
                  </ResponsiveDialogTrigger>
                  <ResponsiveDialogContent>
                    <ResponsiveDialogHeader>
                      <ResponsiveDialogTitle>
                        {t('change_password')}
                      </ResponsiveDialogTitle>
                    </ResponsiveDialogHeader>
                    <ChangeForm />
                  </ResponsiveDialogContent>
                </ResponsiveDialog>
              </TooltipTrigger>
              <TooltipContent align="end" side="left">
                <p>{t('change_password')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">{t('two_factor')}</p>
          <ChangeTwoFactor isTwoFactorEnabled={user?.isTwoFactorEnabled} />
        </div>
      </CardContent>
    </Card>
  );
};
