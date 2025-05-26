<script lang="ts" setup>
import SubHeader from '@/shared/ui/SubHeader.vue';
import PostList from '@/domain/post/ui/PostPage/PostList.vue';
import postData from '@/assets/post.json';
</script>

<template>
  <SubHeader />
  <PostList :posts="postData" />
</template>