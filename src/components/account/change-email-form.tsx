/* eslint-disable */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type * as z from 'zod';

import { changeEmail } from '@/actions/Users';
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
import { ChangeEmailSchema } from '@/schemas';
import { useSession } from 'next-auth/react';

export const ChangeEmailForm = ({email}: { email: string }) => {
  const { update } = useSession();
  const t = useTranslations('Account');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ChangeEmailSchema>>({
    resolver: zodResolver(ChangeEmailSchema),
    defaultValues: {
      email,
    },
  });

  const onSubmit = async (values: z.infer<typeof ChangeEmailSchema>) => {
    startTransition(() => {
      changeEmail(values)
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
            update({ email: values.email });
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
          </div>
          <Button disabled={isPending} type="submit" className="w-full">
            {t('save')}
          </Button>
        </form>
      </Form>
  );
};
