/* eslint-disable */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type * as z from 'zod';

import { changePassword } from '@/actions/Users';
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
import { ChangePasswordSchema } from '@/schemas';

export const ChangeForm = () => {
  const t = useTranslations('Account');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const onSubmit = async (values: z.infer<typeof ChangePasswordSchema>) => {
    startTransition(() => {
      changePassword(values)
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('old_password')}</FormLabel>
                      <FormControl>
                      <div className="flex items-center gap-1">
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder={t('old_password_placeholder')}
                          type={passwordVisible ? 'text' : 'password'}
                        />
                        <Button
                          variant="outline"
                          className="px-2"
                          type="button"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                          {passwordVisible ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </Button>
                      </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('new_password')}</FormLabel>
                      <FormControl>
                      <div className="flex items-center gap-1">
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder={t('new_password_placeholder')}
                          type={passwordVisible1 ? 'text' : 'password'}
                        />
                        <Button
                          variant="outline"
                          className="px-2"
                          type="button"
                          onClick={() => setPasswordVisible1(!passwordVisible1)}
                        >
                          {passwordVisible1 ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </Button>
                      </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('confirm_password')}</FormLabel>
                      <FormControl>
                      <div className="flex items-center gap-1">
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder={t('confirm_password_placeholder')}
                          type={passwordVisible2 ? 'text' : 'password'}
                        />
                        <Button
                          variant="outline"
                          className="px-2"
                          type="button"
                          onClick={() => setPasswordVisible2(!passwordVisible2)}
                        >
                          {passwordVisible2 ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </Button>
                      </div>
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
