<script lang="ts" setup>
import {useRoute} from 'vue-router';
import {computed} from 'vue';
import posts from '@/assets/post.json';

const route = useRoute();
const postId = Number(route.params.id);
const post = computed(() => posts.find(p => p.id === postId));
</script>

<template>
  <div v-if="post" class="max-w-3xl mx-auto p-6">
    <h1 class="text-4xl font-extrabold py-4 leading-tight">
      {{ post.title }}
    </h1>
    <div class="flex items-center justify-between py-2">
      <div class="flex text-gray-700 text-base font-semibold gap-2">
        <span>{{ post.author }}</span>
        <span>·</span>
        <span class="text-gray-400">{{ post.date }}</span>
      </div>
      <div class="flex gap-6 text-base text-gray-500 font-medium">
        <span>카테고리: {{ post.category || '없음' }}</span>
        <span>조회수: {{ post.views }}</span>
      </div>
    </div>
<!--    &lt;!&ndash; 썸네일/이미지 &ndash;&gt;-->
<!--    <div v-if="post.thumbnail" class="my-6">-->
<!--      <img :src="post.thumbnail" alt="썸네일"-->
<!--           class="rounded-lg w-full object-cover"/>-->
<!--    </div>-->
    <!-- 본문 -->
    <div class="prose max-w-full text-lg leading-relaxed py-10">
      {{ post.summary }}
    </div>
  </div>
  <div v-else class="text-center py-16">포스트를 찾을 수 없습니다.</div>
</template>