/* eslint-disable */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type * as z from 'zod';

import { changeName } from '@/actions/Organization';
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
import { ChangeNameSchema } from '@/schemas';

export const ChangeNameForm = ({name, orgId}: { name: string, orgId: string }) => {
  const t = useTranslations('Account');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ChangeNameSchema>>({
    resolver: zodResolver(ChangeNameSchema),
    defaultValues: {
      name,
    },
  });

  const onSubmit = async (values: z.infer<typeof ChangeNameSchema>) => {
    startTransition(() => {
      changeName(values, orgId)
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('name')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={t('name_placeholder')}
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
