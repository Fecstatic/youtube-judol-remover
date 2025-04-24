'use server';

import { deleteMultipleComments } from '@/actions/delete-comment';

import { getVideoComments } from './list-comment';

interface Session {
  accessToken: string;
}

export async function deleteCommentButton(
  session: Session | null,
  videoId: string,
) {
  if (!session?.accessToken) {
    throw new Error('Invalid session: accessToken is required');
  }
  const comments = await getVideoComments(session, videoId);
  // @ts-ignore
  const result = await deleteMultipleComments(session, comments);
  return result;
}
