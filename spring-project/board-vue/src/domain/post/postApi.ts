import { kyInstance } from '@/app/utils/kyInstance';

export async function fetchAllPosts() {
  return await kyInstance().get('posts/all').json<any[]>();
}

export async function fetchPostDetail(postId: number | string) {
  return await kyInstance().get(`posts/${postId}`).json<any>();
}