<script setup lang="ts">
import { ref } from 'vue';
import CommentItem from './CommentItem.vue';
import CommentForm from './CommentForm.vue';

interface Comment {
  id: number;
  nickname: string;
  content: string;
  createdAt: string;
  avatarUrl?: string;
}

const comments = ref<Comment[]>([
  {
    id: 1,
    nickname: 'soyichicken',
    content: '인상깊네요. 잘 읽었습니다',
    createdAt: '2025-05-17',
    avatarUrl: '',
  },
  // ... 더미 데이터 (API로 교체 가능)
]);

function addComment(content: string) {
  comments.value.push({
    id: Date.now(),
    nickname: '내닉네임', // 로그인 값 연동
    content,
  });
}
</script>
<template>
  <div class="pt-4">
    <h2 class="font-semibold text-lg">{{ comments.length }}개의 댓글</h2>
    <CommentForm @submit="addComment" />
    <ul>
      <CommentItem v-for="comment in comments" :key="comment.id" :comment="comment" />
    </ul>
  </div>
</template>