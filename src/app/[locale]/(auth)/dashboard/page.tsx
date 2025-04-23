import { google } from 'googleapis';
import Link from 'next/link';
import { toast } from 'sonner';

import { getGoogleAuthURL } from '@/actions/auth';
import { getSession } from '@/actions/session';
import LimitExceed from '@/components/dashboard/limit-exceed';
import { ProfileCard } from '@/components/dashboard/profile-card';
import UserNav from '@/components/dashboard/user-nav';
import VideoSection from '@/components/dashboard/video-section';

export default async function DashboardPage() {
  const session = await getSession();
  const googleAuthURL = getGoogleAuthURL();

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

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: session.accessToken });

  const youtube = google.youtube({
    version: 'v3',
    auth: oauth2Client,
  });

  let channels = [];
  let videos = [];

  try {
    const channelsResponse = youtube.channels.list({
      // @ts-ignore
      part: 'snippet',
      mine: true,
    });
    // @ts-ignore
    channels = channelsResponse.data?.items;

    if (channels.length > 0) {
      const uploadsResponse = youtube.search.list({
        // @ts-ignore
        part: 'snippet',
        channelId: channels[0].id,
        maxResults: 12,
        order: 'date',
        type: 'video',
      });
      // @ts-ignore
      videos = uploadsResponse.data?.items;
    }
  } catch (error) {
    toast.error('Failed to fetch YouTube data:');
  }

  return (
    <div className="min-h-screen bg-dashboard-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-4">
        <UserNav session={session} />

        {channels.length > 0 && <ProfileCard channels={channels} />}

        {videos.length > 0 && <VideoSection videos={videos} />}

        {videos.length === 0 && videos.length === 0 && <LimitExceed />}
      </div>
    </div>
  );
}
