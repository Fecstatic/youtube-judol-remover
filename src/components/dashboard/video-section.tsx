import { useTranslations } from 'next-intl';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import VideoCard from './video-card';

interface Session {
  accessToken: string;
}

interface Video {
  id: {
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    thumbnails: {
      default?: { url: string };
      high?: { url: string };
    };
    title: string;
  };
}

export default function VideoSection({
  session,
  videos,
}: {
  session: Session;
  videos: Video[];
}) {
  const t = useTranslations('Dashboard');
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('video_list_title')}</CardTitle>
        <CardDescription>
          {t('video_list_description', { video: videos.length })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {videos.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videos.map((video) => (
              <VideoCard
                key={video.id.videoId}
                video={video}
                session={session}
              />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <svg
              className="mx-auto size-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No videos found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven&apos;t uploaded any videos to this channel yet.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
