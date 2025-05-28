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
  <div class="container bg-white shadow-sm border border-gray-300 overflow-hidden transition cursor-pointer">
    <!--    <div v-if="post.thumbnail" class="bg-gray-50 flex items-center justify-center">-->
    <!--      <img :src="post.thumbnail" alt="썸네일" class="object-cover w-full h-full" />-->
    <!--    </div>-->
    <!--    <div v-else class="h-36 bg-gray-100 flex items-center justify-center">-->
    <!--      <span class="text-4xl"></span>-->
    <!--    </div>-->
    <div class="flex flex-col flex-1 py-3">
      <h3 class="text-lg font-bold mb-2 px-4 truncate">{{ post.title }}</h3>
      <div class="text-sm text-gray-600 pb-2 px-4 h-[60px] ">
        {{ post.summary || post.content }}
      </div>
      <div class="flex items-center justify-between mt-auto pt-2 border-t border-gray-300">
        <div class="flex items-center gap-1 text-[10px] px-4 text-gray-400">
          <span>{{ post.date }}</span> /
          <span>{{ post.views }}회 조회</span>
        </div>
        <div class="flex items-center gap-1 px-4 text-gray-600">
          <span class="font-semibold text-[11px]">{{ post.author }}</span>
        </div>
      </div>
    </div>
  </div>
</template>