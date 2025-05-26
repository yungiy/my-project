<script lang="ts" setup>
import PostItem from './PostItem.vue';
import {useRouter} from 'vue-router';

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

const router = useRouter();

function goToDetail(id: number){
  router.push(`/post/${id}`);
}

</script>

<template>
  <main class="pt-2.5 flex flex-wrap justify-center gap-3 pb-3">
    <div
        v-for="post in posts"
        :key="post.id"
    >
      <PostItem :post="post"
                @click="goToDetail(post.id)"/>
    </div>
  </main>
</template>