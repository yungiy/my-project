<script lang="ts" setup>
import PostItem from './PostItem.vue';
import { useRouter } from 'vue-router';
import type { Post } from '@/app/types/Post';
const props = defineProps<{
  posts: Post[];
}>();

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
        class="flex-1 min-w-[320px] max-w-[340px] cursor-pointer"
    >
      <PostItem :post="post" />
    </div>
  </main>
</template>