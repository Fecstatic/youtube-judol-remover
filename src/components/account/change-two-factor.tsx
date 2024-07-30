/* eslint-disable */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type * as z from 'zod';

import { settings } from '@/actions/Users';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { SettingsSchema } from '@/schemas';
import { useSession } from 'next-auth/react';

export const ChangeTwoFactor = ({ isTwoFactorEnabled }: { isTwoFactorEnabled: boolean }) => {
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      isTwoFactorEnabled,
    },
  });

  const onSubmit = async (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.success(data.success);
            update({ isTwoFactorEnabled: values.isTwoFactorEnabled });
          }
        })
        .catch(() => toast.error('Something went wrong!'));
    });
  };

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-2 md:p-0">
          <FormField
            control={form.control}
            name="isTwoFactorEnabled"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Switch
                    disabled={isPending}
                    checked={field.value}
                    onCheckedChange={(event) => {
                      form.setValue('isTwoFactorEnabled', event, { shouldDirty: true });
                      form.handleSubmit(onSubmit)();
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
  );
};
