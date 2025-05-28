<script lang="ts" setup>
import {computed} from 'vue';
import {Post} from '@/app/types/Post.ts';

const props = defineProps<{
  post: Post
}>();

const formattedDate = computed(() => {
  const date = new Date(props.post.createdAt);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd}`;
});
</script>

<template>
  <div
      class="w-full flex flex-col  bg-white shadow-sm border border-gray-300 overflow-hidden transition py-3">
    <h3 class="text-lg font-bold mb-2 px-4 truncate">{{ post.title }}</h3>
    <div class="text-sm text-gray-600 pb-2 px-4 h-[40px] truncate">
      {{ post.content }}
    </div>
    <div
        class="flex items-center justify-between mt-auto pt-2 border-t border-gray-300">
      <div class="flex items-center gap-1 text-[10px] px-4 text-gray-400">
        <span>{{ formattedDate }}</span> /
        <span>회 조회</span>
      </div>
      <div class="flex items-center gap-1 px-4 text-gray-600">
        <span class="font-semibold text-[11px]">{{ post.nickname }}</span>
      </div>
    </div>
  </div>
</template>