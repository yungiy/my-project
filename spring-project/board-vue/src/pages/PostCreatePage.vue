<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMutation } from '@tanstack/vue-query';
import { postSchema, PostForm } from '@/domain/post/schema/postSchema';
import PostFootbar from '@/domain/post/ui/PostCreatePage/PostFootbar.vue';
import PostPreview from '@/domain/post/ui/PostCreatePage/PostPreview.vue';
import PostTagInput from '@/domain/post/ui/PostCreatePage/PostTagInput.vue';
import PostTitleInput from '@/domain/post/ui/PostCreatePage/PostTitleInput.vue';
import MarkdownTextarea from '@/domain/post/ui/PostCreatePage/MarkdownTextarea.vue';
import { createPost } from '@/domain/post/api/postApi';

const router = useRouter();
const form = ref<PostForm>({
  title: '',
  category: '',
  content: ''
});
const error = ref('');

const { mutate: publishPost } = useMutation({
  mutationFn: createPost,
  onSuccess: () => {
    router.push('/home');
  },
  onError: (err: any) => {
    error.value = err?.response?.message || '게시글 작성에 실패했습니다.';
  }
});

function onExit() {
  if (confirm('정말 나가시겠습니까? 작성 중인 내용이 사라집니다.')) {
    router.back();
  }
}
function onSave() {}

function onPublish() {
  // zod를 활용한 유효성 검사
  const result = postSchema.safeParse(form.value);
  if (!result.success) {
    // 여러 에러가 있을 수 있으니 첫 번째 메시지만 표시
    error.value = result.error.errors[0]?.message || '입력값을 확인해주세요.';
    return;
  }
  error.value = '';
  publishPost({ ...form.value });
}
</script>

<template>
  <div class="flex min-h-screen relative">
    <div class="flex-1 px-5 py-10 space-y-4 flex-col">
      <PostTitleInput v-model="form.title"/>
      <PostTagInput v-model="form.category"/>
      <MarkdownTextarea v-model="form.content"/>
      <div v-if="error" class="text-red-500 mt-2 text-sm">{{ error }}</div>
    </div>
    <div class="w-1/2 min-h-screen bg-neutral-50 border-l-2 px-5 py-10">
      <PostPreview :category="form.category" :content="form.content" :title="form.title"/>
    </div>
  </div>
  <PostFootbar @exit="onExit" @publish="onPublish" @save="onSave"/>
</template>