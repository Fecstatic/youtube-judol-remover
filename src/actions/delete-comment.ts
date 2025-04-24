import { google } from 'googleapis';

interface Session {
  accessToken: string;
}

export async function deleteYouTubeComment(
  session: Session,
  commentId: string,
) {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: session.accessToken });

  const youtube = google.youtube({
    version: 'v3',
    auth: oauth2Client,
  });

  try {
    await youtube.comments.delete({
      id: commentId,
    });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function deleteMultipleComments(
  session: Session,
  comments: Array<{
    id: string;
    author?: string;
    text?: string;
    likeCount?: number;
    publishedAt?: string;
  }>,
) {
  if (comments.length === 0) {
    return {
      total: 0,
      list: [],
    };
  }

  const results = await Promise.all(
    comments.map(async (comment) => {
      const result = await deleteYouTubeComment(session, comment.id);
      return {
        ...comment,
        success: result.success,
        error: result.success ? undefined : result.error,
      };
    }),
  );

  return {
    total: comments.length,
    list: results,
  };
}
