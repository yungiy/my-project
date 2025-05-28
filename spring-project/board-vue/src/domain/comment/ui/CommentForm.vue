<script setup lang="ts">
import { ref } from 'vue';
import Button from '@/shared/ui/Button.vue';
const emit = defineEmits(['submit']);

const commentInput = ref('');
const commentError = ref('');

function handleSubmit() {
  if (!commentInput.value.trim()) {
    commentError.value = '댓글을 입력하세요!';
    return;
  }
  emit('submit', commentInput.value);
  commentInput.value = '';
  commentError.value = '';
}
</script>
<template>
  <div class="flex gap-2 py-2">
    <textarea
        v-model="commentInput"
        rows="2"
        class="border border-gray-300 p-3 flex-1 resize-none focus:outline-none "
        placeholder="댓글을 작성하세요"></textarea>
    <Button
        class="px-5 py-2 bg-green-600 text-white font-bold"
        @click="handleSubmit">
      댓글 작성
    </Button>
  </div>
  <div v-if="commentError" class="text-red-500 text-xs mb-3">{{ commentError }}</div>
</template>