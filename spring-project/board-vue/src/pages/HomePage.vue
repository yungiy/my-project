<script setup lang="ts">
import {ref, computed, watchEffect} from 'vue';
import { useQuery } from '@tanstack/vue-query';
import SubHeader from '@/shared/ui/SubHeader.vue';
import PostList from '@/domain/post/ui/PostPage/PostList.vue';
import { fetchAllPosts } from '@/domain/post/api/postApi';

// 상태
const selectedTab = ref<'view' | 'new'>('new'); // 최신순 or 조회수순
const categories = [
  { name: '모든 게시물', value: 'all' },
  { name: '자유게시판', value: '자유게시판' },
  { name: '공부게시판', value: '공부게시판' },
  { name: '기타게시판', value: '기타게시판' },
];
const selectedCategory = ref(categories[0]);

// API에서 게시글 불러오기
const { data: posts, isLoading, error } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchAllPosts,
});

// 정렬+카테고리 필터링된 posts 반환
const sortedPosts = computed(() => {
  if (!posts.value) return [];
  let result = posts.value;

  // 카테고리 필터링
  if (selectedCategory.value.value !== 'all') {
    result = result.filter(post => post.category === selectedCategory.value.value);
  }
  // 정렬
  if (selectedTab.value === 'new') {
    result = result.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else {
    result = result.slice().sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
  }
  return result;
});

watchEffect(() => {
  console.log('[HomePage] posts:', posts.value);
  console.log('[HomePage] sortedPosts:', sortedPosts.value);
  console.log('[HomePage] selectedTab:', selectedTab.value);
  console.log('[HomePage] selectedCategory:', selectedCategory.value);
});
</script>

<template>
  <SubHeader
      :selectedTab="selectedTab"
      :selectedCategory="selectedCategory"
      :categories="categories"
      @update:selectedTab="selectedTab = $event"
      @update:selectedCategory="selectedCategory = $event"
  />
  <div v-if="isLoading" class="text-center py-10">불러오는 중...</div>
  <div v-else-if="error" class="text-center text-red-500 py-10">게시글을 불러올 수 없습니다.</div>
  <PostList v-else :posts="sortedPosts" class="items-center"/>
</template>