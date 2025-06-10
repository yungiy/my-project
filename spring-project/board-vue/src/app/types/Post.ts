export interface Post {
  id: number;
  title: string;
  content: string | null;
  nickname: string | null;
  createdAt: string;
  updatedAt: string;
  category: string;
  views: number;
}