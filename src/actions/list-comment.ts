import { google } from 'googleapis';

interface Session {
  accessToken: string;
}

export async function getVideoComments(
  session: Session | null,
  videoId: string,
) {
  if (!session?.accessToken) {
    throw new Error('Invalid session: accessToken is required');
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: session.accessToken });

  const youtube = google.youtube({
    version: 'v3',
    auth: oauth2Client,
  });

  try {
    const response = await youtube.commentThreads.list({
      part: ['snippet'],
      videoId,
      maxResults: 100,
      order: 'relevance',
    });

    const comments = response.data.items?.map((item) => ({
      id: item.id,
      author: item.snippet?.topLevelComment?.snippet?.authorDisplayName,
      text: item.snippet?.topLevelComment?.snippet?.textDisplay,
      likeCount: item.snippet?.topLevelComment?.snippet?.likeCount,
      publishedAt: item.snippet?.topLevelComment?.snippet?.publishedAt,
    }));

    const filteredComments = comments?.filter(
      (comment) => comment?.text !== comment?.text?.normalize('NFKD'),
    );

    return filteredComments || [];
  } catch (error) {
    return [];
  }
}
