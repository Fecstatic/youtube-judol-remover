/* eslint-disable */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type * as z from 'zod';

import { inviteTeam } from '@/actions/Invite';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { InviteSchema } from '@/schemas';

export const InviteForm = ({orgId}: { orgId: string }) => {
  const t = useTranslations('Account');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof InviteSchema>>({
    resolver: zodResolver(InviteSchema),
    defaultValues: {
      role: 'USER',
    },
  });

  const onSubmit = async (values: z.infer<typeof InviteSchema>) => {
    startTransition(() => {
      inviteTeam(values, orgId)
        .then((data) => {
          // @ts-ignore
          if (data?.error) {
            form.reset();
            // @ts-ignore
            return toast.error(data.error || urlError);
          }

          // @ts-ignore
          if (data?.success) {
            form.reset();
            toast.success(data.success);
          }
        })
        .catch(() => {return toast.error('Something went wrong')});
    });
  };

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-2 md:p-0">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('email')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={t('email_placeholder')}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ADMIN">ADMIN</SelectItem>
                      <SelectItem value="USER">USER</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isPending} type="submit" className="w-full">
            {t('save')}
          </Button>
        </form>
      </Form>
  );
};
