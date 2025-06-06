import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1, '제목을 입력하세요.'),
  category: z.string().min(1, '카테고리를 입력하세요.'),
  content: z.string().min(1, '본문을 입력하세요.'),
});

export type PostForm = z.infer<typeof postSchema>;