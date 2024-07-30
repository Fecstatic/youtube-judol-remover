/* eslint-disable */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type * as z from 'zod';

import { changePicture } from '@/actions/Users';
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
import { ChangeAvatarSchema } from '@/schemas';
import { useSession } from 'next-auth/react';
import { useUploadThing } from '@/libs/UploadAThing';

export const ChangeAvatarForm = () => {
  const { update } = useSession();
  const t = useTranslations('Account');
  const [isPending, startTransition] = useTransition();
  const { startUpload } = useUploadThing(
    "avatar",
    {
      onClientUploadComplete: () => {
        toast.success("Avatar updated successfully");
      },
      onUploadError: () => {
        toast.error("Something went wrong");
      },
      onUploadBegin: () => {
        toast.info("Uploading avatar");
      },
    },
  );
  
  const form = useForm<z.infer<typeof ChangeAvatarSchema>>({
    resolver: zodResolver(ChangeAvatarSchema),
  });

  const fileRef = form.register("avatar");
  
  const onSubmit = async (values: z.infer<typeof ChangeAvatarSchema>) => {
    const res = await startUpload([values.avatar[0]]);
    startTransition(() => {
      // @ts-ignore
      changePicture(res[0].url)
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
            update({ image: data.data.image });
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
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('avatar')}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      // placeholder={t('avatar_placeholder')}
                      type="file"
                      {...fileRef}
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
