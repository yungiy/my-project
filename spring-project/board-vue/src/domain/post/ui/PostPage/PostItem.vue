<script setup lang="ts">
defineProps<{
  post: {
    id: number | string;
    title: string;
    summary?: string;
    content?: string;
    thumbnail?: string;
    author: string;
    date: string;
    views: number;
    likes: number;
  }
}>();
</script>

<template>
  <div class="w-[310px] p-1 bg-white shadow-sm border border-gray-300 overflow-hidden transition">
<!--    <div v-if="post.thumbnail" class="bg-gray-50 flex items-center justify-center">-->
<!--      <img :src="post.thumbnail" alt="썸네일" class="object-cover w-full h-full" />-->
<!--    </div>-->
<!--    <div v-else class="h-36 bg-gray-100 flex items-center justify-center">-->
<!--      <span class="text-4xl"></span>-->
<!--    </div>-->
    <div class="flex flex-col flex-1 px-4 py-3">
      <h3 class="text-lg font-bold mb-2 truncate">{{ post.title }}</h3>
      <div class="text-sm text-gray-600 pb-2 h-[60px] ">
        {{ post.summary || post.content }}
      </div>
      <div class="flex items-center justify-between mt-auto pt-2">
        <div class="flex items-center gap-1 text-xs text-gray-400">
          <span>{{ post.date }}</span> /
          <span>{{ post.views }}회 조회</span>
        </div>
        <div class="flex items-center gap-1 text-xs text-gray-600">
          <span class="font-semibold">{{ post.author }}</span>
          <span class="ml-2">{{ post.likes }}</span>
        </div>
      </div>
    </div>
  </div>
</template>