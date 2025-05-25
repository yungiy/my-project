<script setup lang="ts">
import { ref } from 'vue';
import PostEditor from '@/domain/post/ui/PostCreatePage/PostEditor.vue';
import PostFootbar from '@/domain/post/ui/PostCreatePage/PostFootbar.vue';
import PostPreview from '@/domain/post/ui/PostCreatePage/PostPreview.vue';
import PostTagInput from '@/domain/post/ui/PostCreatePage/PostTagInput.vue';
import PostTitleInput from '@/domain/post/ui/PostCreatePage/PostTitleInput.vue';
import MarkdownTextarea
  from '@/domain/post/ui/PostCreatePage/MarkdownTextarea.vue';

const form = ref({
  title: '',
  category: '',
  content: '',
});

function onExit() {}
function onSave() {}
function onPublish() {}
</script>

<template>
  <div class="flex min-h-screen relative">
    <div class="flex-1 px-5 py-10 space-y-4 flex-col">
      <PostTitleInput v-model="form.title" />
      <PostTagInput v-model="form.category" />
      <MarkdownTextarea v-model="form.content" />
    </div>
    <div class="w-1/2 min-h-screen bg-neutral-50 border-l-2 px-5 py-10">
      <PostPreview :title="form.title" :content="form.content" :category="form.category" />
    </div>
    <div class="mt-auto">
      <PostFootbar
          @exit="onExit"
          @save="onSave"
          @publish="onPublish"
      />
    </div>
  </div>
</template>