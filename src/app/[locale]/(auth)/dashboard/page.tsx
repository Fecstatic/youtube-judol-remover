import Link from 'next/link';

import { getGoogleAuthURL } from '@/actions/auth';
import { getVideos } from '@/actions/list-video';
import { getSession } from '@/actions/session';
import LimitExceed from '@/components/dashboard/limit-exceed';
import { ProfileCard } from '@/components/dashboard/profile-card';
import UserNav from '@/components/dashboard/user-nav';
import VideoSection from '@/components/dashboard/video-section';

export default async function DashboardPage() {
  const session = await getSession();
  const googleAuthURL = await getGoogleAuthURL();

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-red-500">Unauthorized</h1>
          <Link href={googleAuthURL} className="text-blue-600 hover:underline">
            Please login first
          </Link>
        </div>
      </div>
    );
  }

  const { videos, channels } = await getVideos(session);

  return (
    <div className="min-h-screen bg-dashboard-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-4">
        <UserNav session={session} />

        {channels.length > 0 && <ProfileCard channels={channels} />}

        {videos.length > 0 && (
          <VideoSection videos={videos} session={session} />
        )}

        {videos.length === 0 && videos.length === 0 && <LimitExceed />}
      </div>
    </div>
  );
}
