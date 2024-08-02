// @ts-nocheck

'use client';

import { Copy, Pencil } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

import { deleteOrganization } from '@/actions/Organization';
import TeamSwitcher from '@/components/dashboard/team-switcher';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from '@/components/ui/responsive-dialog';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { ChangeAvatarForm } from './change-avatar-form';
import { ChangeNameForm } from './change-name-form';
import { TeamMemberTable } from './team-member-table';

const getInitials = (name: string) => {
  return name
    .match(/(\b\S)?/g)
    .join('')
    .toUpperCase();
};

export const TeamInfo = () => {
  const t = useTranslations('Account');
  const selectedTeam = useSelector((state) => state.team.selectedTeam);

  const handleDelete = async () => {
    const res = await deleteOrganization(selectedTeam?.value);
    if (res?.error) {
      return toast.error(res.error);
    }
    return toast.success(res?.success);
  };

  return (
    <Card className="w-full">
      {/* <CardHeader>
        <p className="text-center text-2xl font-semibold">{label}</p>
      </CardHeader> */}
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 items-center gap-2 px-2 md:grid-cols-2 md:gap-0">
          <p className="text-sm font-medium">Select Team</p>
          <div className="flex gap-2">
            <TeamSwitcher state personal={false} className="m-0 w-full" />
          </div>
        </div>
        {selectedTeam?.value === 'personal' ? null : (
          <>
            <Separator />
            <div className="grid grid-cols-1 items-center gap-2 px-2 md:grid-cols-2 md:gap-0">
              <p className="text-sm font-medium">Team ID</p>
              <div className="flex gap-2">
                <Input value={selectedTeam?.value} readOnly />
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
            <Separator />
            <div className="grid grid-cols-1 items-center gap-2 px-2 md:grid-cols-2 md:gap-0">
              <p className="text-sm font-medium">Team Avatar</p>
              <div className="flex gap-2">
                <Avatar>
                  <AvatarImage src={selectedTeam?.picture} />
                  <AvatarFallback>
                    {getInitials(selectedTeam?.label)}
                  </AvatarFallback>
                </Avatar>
                {selectedTeam?.role !== 'USER' && (
                  <TooltipProvider>
                    <Tooltip delayDuration={200}>
                      <TooltipTrigger>
                        <ResponsiveDialog>
                          <ResponsiveDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="size-9"
                            >
                              <Pencil className="size-4" />
                            </Button>
                          </ResponsiveDialogTrigger>
                          <ResponsiveDialogContent>
                            <ResponsiveDialogHeader>
                              <ResponsiveDialogTitle>
                                {t('change_avatar')}
                              </ResponsiveDialogTitle>
                            </ResponsiveDialogHeader>
                            <ChangeAvatarForm
                              avatar={selectedTeam?.picture}
                              orgId={selectedTeam?.value}
                            />
                          </ResponsiveDialogContent>
                        </ResponsiveDialog>
                      </TooltipTrigger>
                      <TooltipContent align="end" side="left">
                        <p>{t('change_avatar')}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-1 items-center gap-2 px-2 md:grid-cols-2 md:gap-0">
              <p className="text-sm font-medium">Team Name</p>
              <div className="flex gap-2">
                <Input value={selectedTeam?.label} readOnly />
                {selectedTeam?.role !== 'USER' && (
                  <TooltipProvider>
                    <Tooltip delayDuration={200}>
                      <TooltipTrigger>
                        <ResponsiveDialog>
                          <ResponsiveDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="size-9"
                            >
                              <Pencil className="size-4" />
                            </Button>
                          </ResponsiveDialogTrigger>
                          <ResponsiveDialogContent>
                            <ResponsiveDialogHeader>
                              <ResponsiveDialogTitle>
                                {t('change_name')}
                              </ResponsiveDialogTitle>
                            </ResponsiveDialogHeader>
                            <ChangeNameForm
                              name={selectedTeam?.label}
                              orgId={selectedTeam?.value}
                            />
                          </ResponsiveDialogContent>
                        </ResponsiveDialog>
                      </TooltipTrigger>
                      <TooltipContent align="end" side="left">
                        <p>{t('change_name')}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-1 items-center gap-2 px-2 md:grid-cols-2 md:gap-0">
              <p className="text-sm font-medium">Team Member</p>
              <TeamMemberTable org_id={selectedTeam?.value} />
            </div>
            {selectedTeam?.role === 'OWNER' && (
              <>
                <Separator />
                <div className="grid grid-cols-1 items-center gap-2 px-2 md:grid-cols-2 md:gap-0">
                  <p className="text-sm font-medium">Team Remove</p>
                  <ResponsiveDialog>
                    <ResponsiveDialogTrigger asChild>
                      <Button variant="destructive">Delete Team</Button>
                    </ResponsiveDialogTrigger>
                    <ResponsiveDialogContent className="sm:max-w-md">
                      <ResponsiveDialogHeader>
                        <ResponsiveDialogTitle>
                          Are you sure?
                        </ResponsiveDialogTitle>
                        <ResponsiveDialogDescription>
                          Your action cannot be undone.
                        </ResponsiveDialogDescription>
                      </ResponsiveDialogHeader>
                      <ResponsiveDialogFooter className="flex gap-2">
                        <ResponsiveDialogClose asChild>
                          <Button
                            type="button"
                            variant="secondary"
                            className="w-full"
                          >
                            Cancel
                          </Button>
                        </ResponsiveDialogClose>
                        <Button
                          variant="destructive"
                          className="w-full"
                          onClick={handleDelete}
                        >
                          Confirm
                        </Button>
                      </ResponsiveDialogFooter>
                    </ResponsiveDialogContent>
                  </ResponsiveDialog>
                </div>
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
