<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import SubHeader from '@/shared/ui/SubHeader.vue';
import PostList from '@/domain/post/ui/PostPage/PostList.vue';
import { fetchAllPosts } from '../domain/post/postApi.ts';

const { data: posts, isLoading, error } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchAllPosts
});
</script>

<template>
  <SubHeader />
  <div v-if="isLoading" class="text-center py-10">불러오는 중...</div>
  <div v-else-if="error" class="text-center text-red-500 py-10">게시글을 불러올 수 없습니다.</div>
  <PostList v-else :posts="posts" class="items-center"/>
</template>