<script lang="ts" setup>
defineProps<{
  comment: {
    id: number;
    nickname: string;
    content: string;
  }
}>();
</script>

<template>
  <li class="py-4 border-b-2 border-gray-300">
    <div class="flex items-center gap-3 my-1">
      <span class="font-semibold text-sm">{{ comment.nickname }}</span>
    </div>
    <div class="text-base text-gray-800 whitespace-pre-line">{{
        comment.content
      }}
    </div>
  </li>
</template>