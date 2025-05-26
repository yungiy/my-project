<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Searchbar from '@/domain/post/ui/PostSearchPage/Searchbar.vue';
import PostItem from '@/domain/post/ui/PostPage/PostItem.vue';
import postData from '@/assets/post.json';
import SearchItem from '@/domain/post/ui/PostSearchPage/SearchItem.vue';

const router = useRouter();
const search = ref('');

const filteredPosts = computed(() =>
    postData.filter(
        (p) =>
            p.title.includes(search.value) ||
            p.summary?.includes(search.value) ||
            p.author.includes(search.value)
    )
);

function onSearch(val: string) {
  // 필요시 추가 로직(서버 검색 등)
}

function goDetail(id: number | string) {
  router.push(`/post/${id}`);
}
</script>

<template>
  <div class="mx-auto px-4 py-8">
    <!-- 검색창 -->
    <Searchbar v-model="search" placeholder="검색어를 입력하세요" @search="onSearch" />

    <!-- 결과 개수 안내 -->
    <div class="text-sm text-gray-400 mb-4">
      <span class="font-bold">{{ filteredPosts.length }}</span>개의 포스트를 찾았습니다.
    </div>

    <!-- 포스트 목록 -->
    <div v-if="filteredPosts.length" class="space-y-4 flex flex-col items-center">
      <SearchItem
          v-for="post in filteredPosts"
          :key="post.id"
          :post="post"
          @click="goDetail(post.id)"
      />
    </div>
    <div v-else class="text-gray-500 mt-8">검색 결과가 없습니다.</div>
  </div>
</template>