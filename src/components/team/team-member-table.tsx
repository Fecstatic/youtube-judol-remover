'use client';

import type { OrgRole } from '@prisma/client';
import { X } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';

import {
  changeMemberRole,
  deleteMember,
  getMemberList,
} from '@/actions/Organization';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getId } from '@/services/Account';

import { InviteForm } from './team-invite-form';

interface Member {
  id: string;
  email: string;
  name: string;
  picture: string;
  role: OrgRole;
  roleId: string;
}

const getInitials = (name: string) => {
  // @ts-ignore
  return name
    .match(/(\b\S)?/g)
    .join('')
    .toUpperCase();
};

export const TeamMemberTable = ({ org_id }: { org_id: string }) => {
  const [list, setList] = useState<Member[]>([]);
  const [id, setId] = useState<string>();
  const [role, setRole] = useState<OrgRole>('USER');
  const [isPending, startTransition] = useTransition();

  function getMember() {
    startTransition(async () => {
      const data = await getMemberList(org_id);
      const userId = await getId();
      const OrgRole = data.find((d) => d.id === userId)?.role;
      // @ts-ignore
      setList(data);
      setId(userId);
      // @ts-ignore
      setRole(OrgRole);
    });
  }

  useEffect(() => {
    getMember();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [org_id]);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleDelete = async (id: string) => {
    const res = await deleteMember(id);
    if (res?.error) {
      return toast.error(res.error);
    }
    getMember();
    return toast.success(res?.success);
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleRoleChange = async (id: string, role: OrgRole) => {
    const res = await changeMemberRole(id, role);
    if (res?.error) {
      return toast.error(res.error);
    }
    return toast.success(res?.success);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead>Member Data</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            <TableRow>
              <TableCell>
                <Skeleton className="size-10 rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-10 w-full rounded-sm" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-10 w-full rounded-sm" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-10 w-full rounded-sm" />
              </TableCell>
            </TableRow>
          ) : (
            list.map((member: Member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={member.picture}
                      alt={member.email}
                      className="rounded-full"
                    />
                    <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {member.email}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Select
                    defaultValue={member.role}
                    disabled={member.role === 'OWNER' || role === 'USER'}
                    onValueChange={(value: OrgRole) =>
                      handleRoleChange(member.roleId, value)
                    }
                  >
                    <SelectTrigger
                      className="w-[180px]"
                      defaultValue={member.role}
                    >
                      <SelectValue placeholder={member.role} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="OWNER" disabled={role !== 'OWNER'}>
                        OWNER
                      </SelectItem>
                      <SelectItem value="ADMIN" disabled={role === 'USER'}>
                        ADMIN
                      </SelectItem>
                      <SelectItem value="USER">USER</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right">
                  <TooltipProvider>
                    <Tooltip delayDuration={200}>
                      <TooltipTrigger>
                        <ResponsiveDialog>
                          <ResponsiveDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="icon"
                              className="h-9 w-11 items-center"
                              disabled={
                                member.role === 'OWNER' ||
                                (role === 'USER' && member.id !== id)
                              }
                            >
                              <X className="size-4" />
                            </Button>
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
                                onClick={() => handleDelete(member.roleId)}
                              >
                                Confirm
                              </Button>
                            </ResponsiveDialogFooter>
                          </ResponsiveDialogContent>
                        </ResponsiveDialog>
                      </TooltipTrigger>
                      <TooltipContent align="end" side="left">
                        {member.role === 'OWNER' ||
                        (role === 'USER' && member.id !== id) ? (
                          <p>Cannot Remove Member</p>
                        ) : (
                          <p>Remove Member</p>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {role !== 'USER' && (
        <ResponsiveDialog>
          <ResponsiveDialogTrigger asChild>
            <Button className="w-full">Add Member</Button>
          </ResponsiveDialogTrigger>
          <ResponsiveDialogContent>
            <ResponsiveDialogHeader>
              <ResponsiveDialogTitle>Invite Member</ResponsiveDialogTitle>
              <ResponsiveDialogDescription>
                Invite new member to your team. User need to accept the
                invitation
              </ResponsiveDialogDescription>
            </ResponsiveDialogHeader>
            <InviteForm orgId={org_id} />
          </ResponsiveDialogContent>
        </ResponsiveDialog>
      )}
    </div>
  );
};
