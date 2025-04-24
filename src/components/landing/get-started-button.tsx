'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { getGoogleAuthURL, setCredentials } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  secret: z.string().min(35).max(35),
  id: z.string(),
});

export default function GetStarted({ text }: { text: string }) {
  const t = useTranslations('Dashboard');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { secret, id } = values;
    await setCredentials(id, secret);
    const googleAuthURL = await getGoogleAuthURL();
    window.location.href = googleAuthURL;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="shimmer" size="lg">
          {text}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('getting_started')}</DialogTitle>
          <DialogDescription>
            {t.rich('getting_started_description', {
              link: () => (
                <Link
                  className="text-blue-500 underline hover:text-blue-600"
                  href="https://console.cloud.google.com/"
                >
                  Google API
                </Link>
              ),
            })}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="secret"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('client_secret')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('client_secret_placeholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('client_id')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('client_id_placeholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {t('submit')}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
