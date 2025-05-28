<!-- src/domain/post/ui/PostPage/PostList.vue -->
<script lang="ts" setup>
import PostItem from './PostItem.vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
  posts: Array<{
    id: number;
    title: string;
    content: string;
    nickname: string;
    createdAt: string;
    updatedAt: string;
  }>
}>();
console.log('[posts 데이터 확인]', props.posts);
const router = useRouter();

function goToDetail(id: number | string) {
  router.push(`/post/${id}`);
}
</script>

<template>
  <main class="w-full pt-2.5 flex flex-wrap items-center gap-3 pb-3">
    <div
        v-for="post in props.posts"
        :key="post.id"
        @click="goToDetail(post.id)"
        class="flex-1 min-w-[320px] max-w-[350px] cursor-pointer"
    >
      <PostItem :post="post" />
    </div>
  </main>
</template>