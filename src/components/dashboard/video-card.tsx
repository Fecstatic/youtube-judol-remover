import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Card, CardContent } from '../ui/card';

interface VideoCardProps {
  video: {
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

export default function VideoCard({ video }: VideoCardProps) {
  const t = useTranslations('Dashboard');
  const publishedAt = new Date(video.snippet.publishedAt).toLocaleDateString();
  const thumbnailUrl =
    video.snippet.thumbnails?.high?.url ||
    video.snippet.thumbnails?.default?.url;

  return (
    <Card className="transition-all duration-300 hover:border-gray-500">
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
          <p className="text-xs">{t('publish_on', { date: publishedAt })}</p>
        </div>
      </CardContent>
    </Card>
  );
}
