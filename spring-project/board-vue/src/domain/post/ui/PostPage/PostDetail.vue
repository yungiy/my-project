<!--<script setup lang="ts">-->
<!--import { useRoute } from 'vue-router';-->
<!--import { useQuery } from '@tanstack/vue-query';-->
<!--import type {Post} from '@/app/types/Post.ts';-->
<!--import CommentList from '@/domain/comment/ui/CommentList.vue';-->
<!--import Button from '@/shared/ui/Button.vue';-->
<!--import {fetchPostDetail} from '@/domain/post/api/postApi.ts';-->

<!--defineProps<{-->
<!--  post: Post-->
<!--}>();-->

<!--const route = useRoute();-->
<!--const postId = route.params.id;-->

<!--const { data: post, isLoading, isError } = useQuery({-->
<!--  queryKey: ['post', postId],-->
<!--  queryFn: () => fetchPostDetail(postId),-->
<!--  enabled: !!postId,-->
<!--});-->

<!--function formatDate(dateString: string) {-->
<!--  const date = new Date(dateString);-->
<!--  const yyyy = date.getFullYear();-->
<!--  const mm = String(date.getMonth() + 1).padStart(2, '0');-->
<!--  const dd = String(date.getDate()).padStart(2, '0');-->
<!--  return `${yyyy}.${mm}.${dd}`;-->
<!--}-->
<!--</script>-->

<!--<template>-->
<!--  <div v-if="isLoading" class="text-center py-16">불러오는 중...</div>-->
<!--  <div v-else-if="isError" class="text-center py-16 text-red-500">게시글을 불러오지 못했습니다.</div>-->
<!--  <div v-else-if="post" class="max-w-4xl mx-auto p-6">-->
<!--    <h1 class="text-4xl font-extrabold py-4 leading-tight">-->
<!--      {{ post.title }}-->
<!--    </h1>-->
<!--    <div class="flex items-center justify-between py-2">-->
<!--      <div class="flex text-gray-700 text-base font-semibold gap-2">-->
<!--        <span>{{ post.nickname }}</span>-->
<!--        <span>·</span>-->
<!--        <span class="text-gray-400">{{ formatDate(post.createdAt) }}</span>-->
<!--      </div>-->

<!--      <div class="flex gap-6 items-center text-base text-gray-500 font-medium">-->
<!--        <span>카테고리: {{post.category || '없음' }}</span>-->
<!--        <span>조회수: 119회</span>-->
<!--        <Button class="px-2 py-1 border border-gray-300 text-black">수정하기</Button>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div class="prose max-w-full text-lg leading-relaxed py-10">-->
<!--      {{ post.content }}-->
<!--    </div>-->
<!--    <CommentList />-->
<!--  </div>-->
<!--  <div v-else class="text-center py-16">포스트를 찾을 수 없습니다.</div>-->

<!--</template>-->

<script setup lang="ts">

import { useRoute } from 'vue-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import CommentList from '@/domain/comment/ui/CommentList.vue';
import Button from '@/shared/ui/Button.vue';
import { fetchPostDetail } from '@/domain/post/api/postApi';
import { fetchComments, createComment } from '@/domain/comment/api/commentApi';

const route = useRoute();
const postId = Number(route.params.id);

const { data: post, isLoading, isError } = useQuery({
  queryKey: ['post', postId],
  queryFn: () => fetchPostDetail(postId),
  enabled: !!postId,
});

const queryClient = useQueryClient();

const {
  data: comments = [],
  isLoading: isCommentsLoading,
  error: commentsError
} = useQuery({
  queryKey: ['comments', postId],
  queryFn: () => fetchComments(postId),
  enabled: !!postId,
});

const addCommentMutation = useMutation({
  mutationFn: (content: string) => createComment(postId, content),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['comments', postId] });
  },
});

function handleAddComment(content: string) {
  addCommentMutation.mutate(content);
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd}`;
}
</script>

<template>
  <div v-if="isLoading" class="text-center py-16">불러오는 중...</div>
  <div v-else-if="isError" class="text-center py-16 text-red-500">게시글을 불러오지 못했습니다.</div>
  <div v-else-if="post" class="max-w-4xl mx-auto p-6">
    <h1 class="text-4xl font-extrabold py-4 leading-tight">
      {{ post.title }}
    </h1>
    <div class="flex items-center justify-between py-2">
      <div class="flex text-gray-700 text-base font-semibold gap-2">
        <span>{{ post.nickname }}</span>
        <span>·</span>
        <span class="text-gray-400">{{ formatDate(post.createdAt) }}</span>
      </div>
      <div class="flex gap-2 items-center text-base text-gray-500 font-medium">
        <span>{{ post.category}}</span>
        <span>{{ post.views }}11회</span>
        <Button class="px-4 py-1 border text-black text-base border-gray-300 hover:bg-green-600 hover:text-white">수정하기</Button>
        <Button class="px-4 py-1 border text-black text-base border-gray-300 hover:bg-red-500 hover:text-white">삭제하기</Button>
      </div>
    </div>

    <div class="prose max-w-full text-lg leading-relaxed py-5 whitespace-pre-line">
      {{ post.content }}
    </div>

    <div class="py-5">
      <CommentList
          :comments="comments || []"
          :isLoading="isCommentsLoading"
          :error="commentsError"
          @add-comment="handleAddComment"
      />
    </div>
  </div>
  <div v-else class="text-center py-16">포스트를 찾을 수 없습니다.</div>
</template>