'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { BounceLoader } from 'react-spinners';
import { toast } from 'sonner';

import { deleteCommentButton } from '@/actions/handle-delete';
import { Button } from '@/components/ui/button';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from '@/components/ui/responsive-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

import { Card, CardContent } from '../ui/card';

interface VideoCardProps {
  session: {
    accessToken: string;
  };
  video: {
    id: {
      videoId: string;
    };
    snippet: {
      publishedAt: string;
      thumbnails: {
        default?: {
          url: string;
        };
        high?: {
          url: string;
        };
      };
      title: string;
    };
  };
}

export default function VideoCard({ session, video }: VideoCardProps) {
  const t = useTranslations('Dashboard');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteResult, setDeleteResult] = useState<{
    total: number;
    list: Array<{
      id: string;
      author?: string;
      text?: string;
      likeCount?: number;
      publishedAt?: string;
      success: boolean;
      error?: string;
    }>;
  } | null>();
  const thumbnailUrl =
    video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default?.url;

  const handleDelete = async () => {
    if (!session?.accessToken) {
      toast.error('Session is invalid');
      return;
    }
    setIsDeleting(true);
    try {
      const result = await deleteCommentButton(session, video.id.videoId);
      setDeleteResult(result);
    } catch (error) {
      toast.error(t('delete_failed'));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <ResponsiveDialog>
      <ResponsiveDialogTrigger asChild>
        <Card className="transition-all duration-300 hover:border-gray-500 md:max-w-xl">
          <CardContent className="cursor-pointer p-1 md:p-2">
            <div className="relative aspect-video">
              {thumbnailUrl && (
                <Image
                  src={thumbnailUrl}
                  alt={video.snippet.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              )}
            </div>
            <div className="p-2 md:p-3">
              <h3 className="mb-1 line-clamp-2 font-medium">
                {video.snippet.title}
              </h3>
              <p className="text-xs">
                {t('publish_on', { date: video?.snippet?.publishedAt })}
              </p>
            </div>
          </CardContent>
        </Card>
      </ResponsiveDialogTrigger>
      <ResponsiveDialogContent className="w-full">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>{video.snippet.title}</ResponsiveDialogTitle>
        </ResponsiveDialogHeader>
        <div className="relative aspect-video">
          {thumbnailUrl && (
            <Image
              src={thumbnailUrl}
              alt={video.snippet.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          )}
        </div>
        <ResponsiveDialogDescription className="p-2 md:p-0">
          {t('delete_judol_comment')}
        </ResponsiveDialogDescription>
        {!deleteResult && (
          <div className="mt-2 w-full p-2 md:p-0">
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleDelete}
              disabled={isDeleting}
              hidden={isDeleting}
            >
              {t('delete')}
            </Button>
          </div>
        )}
        {isDeleting && (
          <div className="flex w-full place-content-center items-center p-2">
            <BounceLoader
              color="#66CED6"
              loading={isDeleting}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
        {deleteResult && (
          <div className="p-2 text-sm">
            <p className="text-red-500">
              {t('deleted_comments')}:{' '}
              {deleteResult.list.filter((c) => c.success).length}/
              {deleteResult.total}
            </p>
            <ScrollArea className="h-[200px]">
              <div className="grid gap-2">
                {deleteResult.list.map((c) => (
                  <Card
                    key={c.id}
                    className="border-red-500 bg-transparent transition-all duration-300"
                  >
                    <CardContent className="cursor-pointer p-1 md:p-2">
                      <div className="p-2">
                        <div className="mb-1 flex items-center gap-2">
                          <h3 className="font-semibold">{c.author}</h3>
                          <p className="text-xs text-gray-500/50">
                            {t('comment_on', {
                              date: (c.publishedAt as string).split(
                                'T',
                              )[0] as string,
                            })}
                          </p>
                        </div>
                        <p className="text-xs">{c.text}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
