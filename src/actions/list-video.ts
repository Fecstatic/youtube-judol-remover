import { google } from 'googleapis';
import { unstable_cacheTag as cacheTag } from 'next/cache';

interface Session {
  accessToken: string;
}

export async function getVideos(session: Session) {
  'use cache';

  cacheTag('getVideo', session.accessToken);
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: session.accessToken });

  const youtube = google.youtube({
    version: 'v3',
    auth: oauth2Client,
  });

  try {
    const channelsResponse = await youtube.channels.list({
      // @ts-ignore
      part: 'snippet',
      mine: true,
    });
    // @ts-ignore
    const channels = await channelsResponse.data?.items;

    if (channels.length > 0) {
      const uploadsResponse = await youtube.search.list({
        // @ts-ignore
        part: 'snippet',
        channelId: channels[0].id,
        maxResults: 12,
        order: 'date',
        type: 'video',
      });
      // @ts-ignore
      const videos = await uploadsResponse.data?.items;
      return {
        channels,
        videos,
      };
    }
    return {
      channels,
      videos: [],
    };
  } catch (error) {
    return {
      channels: [],
      videos: [],
    };
  }
}
