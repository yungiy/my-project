import {kyInstance} from '@/app/utils/kyInstance';
import type {Post} from '@/app/types/Post.ts';

export async function fetchAllPosts(){
  return await kyInstance().get('posts/all').json<Post[]>();
}

export async function fetchPostDetail(postId: number){
  return await kyInstance().get(`posts/${postId}`).json<Post[]>();
}

export async function fetchSearchPosts(params: {
  title?: string;
  category?: string;
  writer?: string
}){
  const searchParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => !!v && v.trim() !== '')
  );
  return await kyInstance().get('posts/search', {searchParams}).json<any[]>();
}

export async function createPost(data: {
  title: string;
  content: string;
  category: string
}){
  const ky = kyInstance();
  return await ky.post('posts/create', {json: data}).json();
}

export async function deletePost(postId: number){
  await kyInstance().delete(`posts/${postId}`);
}