<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import Searchbar from '@/domain/post/ui/PostSearchPage/Searchbar.vue';
import PostItem from '@/domain/post/ui/PostPage/PostItem.vue';
import { fetchSearchPosts } from '@/domain/post/api/postApi';

const router = useRouter();
const search = ref('');
const debouncedSearch = ref('');

// 디바운스: 입력 멈춘 뒤 400ms 후 반영
let debounceTimer: any = null;
watch(search, (val) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    debouncedSearch.value = val.trim();
  }, 400);
});

// 검색어가 있으면 활성
const enabled = computed(() => !!debouncedSearch.value);

// vue-query: 검색 API (debouncedSearch로 실행)
const { data: posts, isLoading, isError, refetch } = useQuery({
  queryKey: ['searchPosts', debouncedSearch],
  queryFn: () => fetchSearchPosts(debouncedSearch.value),
  enabled,
  refetchOnWindowFocus: false,
  staleTime: 0,
});

// 실제로 검색어가 포함된 결과만 프론트에서 한 번 더 필터링
const filteredPosts = computed(() =>
    (posts?.value || posts || []).filter(
        post =>
            post.title?.includes(debouncedSearch.value) ||
            post.content?.includes(debouncedSearch.value) ||
            post.category?.includes(debouncedSearch.value) ||
            post.nickname?.includes(debouncedSearch.value)
    )
);

// 상세 페이지 이동
function goDetail(id: number | string) {
  router.push(`/post/${id}`);
}

// 엔터/버튼 검색
function onSearch() {
  debouncedSearch.value = search.value.trim();
  if (debouncedSearch.value) refetch();
}
</script>

<template>
  <div class="mx-auto px-4 py-8">
    <Searchbar v-model="search" placeholder="검색어를 입력하세요" @search="onSearch" />
    <div v-if="debouncedSearch">
      <div v-if="isLoading" class="text-gray-400 mt-4">검색 중...</div>
      <div v-else-if="isError" class="text-red-500 mt-4">검색 실패</div>
      <template v-else>
        <div v-if="filteredPosts.length" class="text-sm text-gray-400 mb-4">
          <span class="font-bold">{{ filteredPosts.length }}</span>개의 포스트를 찾았습니다.
        </div>
        <div v-if="filteredPosts.length" class="space-y-4 flex flex-col items-center">
          <PostItem
              v-for="post in filteredPosts"
              :key="post.id"
              :post="post"
              @click="goDetail(post.id)"
          />
        </div>
      </template>
    </div>
  </div>
</template>