<script setup lang="ts">
import CommentItem from './CommentItem.vue';
import CommentForm from './CommentForm.vue';
import type { Comment } from '@/app/types/Comment';
import {computed} from 'vue';

const props = defineProps<{ comments: Comment[] }>();
const emit = defineEmits(['add-comment']);

function handleAddComment(content: string) {
  emit('add-comment', content);
}

const sortedComments = computed(() =>
    [...props.comments].reverse()
);
</script>

<template>
  <div class="pt-4">
    <h2 class="font-semibold text-lg">{{ comments.length }}개의 댓글</h2>
    <CommentForm @submit="handleAddComment" />
    <ul>
      <CommentItem v-for="comment in sortedComments" :key="comment.id" :comment="comment" />
    </ul>
  </div>
</template>