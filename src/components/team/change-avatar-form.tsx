'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useCallback, useState, useTransition } from 'react';
import { type FileWithPath, useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type * as z from 'zod';

import { changeAvatar } from '@/actions/Organization';
import { ImageCropper } from '@/components/dashboard/image-cropper';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUploadThing } from '@/libs/UploadAThing';
import { ChangeAvatarSchema } from '@/schemas';

export type FileWithPreview = FileWithPath & {
  preview: string;
};

export const ChangeAvatarForm = ({
  orgId,
  avatar,
}: {
  orgId: string;
  avatar: string;
}) => {
  const t = useTranslations('Account');
  const [isPending, startTransition] = useTransition();
  const { startUpload } = useUploadThing('avatar', {
    onClientUploadComplete: () => {
      toast.success('Avatar updated successfully');
    },
    onUploadError: () => {
      toast.error('Something went wrong');
    },
    onUploadBegin: () => {
      toast.info('Uploading avatar');
    },
  });

  const accept = {
    'image/*': [],
  };

  const form = useForm<z.infer<typeof ChangeAvatarSchema>>({
    resolver: zodResolver(ChangeAvatarSchema),
  });

  const [isDialogOpen, setDialogOpen] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const file = acceptedFiles[0];
      if (!file) {
        toast.error('File size must be less than 4MB');
        return;
      }

      const fileWithPreview = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      form.setValue('avatar', [fileWithPreview], { shouldValidate: true });
      setDialogOpen(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
  });

  const onSubmit = async (values: z.infer<typeof ChangeAvatarSchema>) => {
    const res = await startUpload([values.avatar[0]]);
    startTransition(() => {
      // @ts-ignore
      changeAvatar(res[0].url, orgId)
        // eslint-disable-next-line consistent-return
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
        .catch(() => {
          return toast.error('Something went wrong');
        });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-2 md:p-0"
      >
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="avatar"
            // eslint-disable-next-line unused-imports/no-unused-vars
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex justify-center">
                    {form.getValues('avatar') ? (
                      <ImageCropper
                        dialogOpen={isDialogOpen}
                        setDialogOpen={setDialogOpen}
                        selectedFile={form.getValues('avatar')[0]}
                        setSelectedFile={(file) =>
                          form.setValue('avatar', [file], {
                            shouldValidate: true,
                          })
                        }
                      />
                    ) : (
                      <Avatar
                        {...getRootProps()}
                        className="size-36 cursor-pointer ring-2 ring-border ring-offset-2 ring-offset-white dark:ring-offset-black"
                      >
                        <Input {...getInputProps()} />
                        <AvatarImage src={avatar} alt={orgId} />
                        <AvatarFallback>Select File</AvatarFallback>
                      </Avatar>
                    )}
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
