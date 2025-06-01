import { kyInstance } from '@/app/utils/kyInstance';
import type { Comment } from '@/app/types/Comment';

export async function fetchComments(postId: number): Promise<Comment[]> {
  return await kyInstance().get(`posts/${postId}/comments`).json<Comment[]>();
}

export async function createComment(postId: number, content: string): Promise<Comment> {
  return await kyInstance().post(`posts/${postId}/comments`, { json: { content } }).json<Comment>();
}