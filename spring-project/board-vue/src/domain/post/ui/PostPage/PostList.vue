<script lang="ts" setup>
import PostItem from './PostItem.vue';

defineProps<{
  posts: Array<{
    id: number | string;
    title: string;
    summary?: string;
    content?: string;
    thumbnail?: string;
    author: string;
    date: string;
    views: number;
    likes: number;
  }>
}>();

</script>

<template>
  <main class="pt-2.5 flex flex-wrap justify-center gap-3 pb-3">
    <div
        v-for="post in posts"
        :key="post.id"
    >
      <PostItem :post="post"/>
    </div>
  </main>
</template>