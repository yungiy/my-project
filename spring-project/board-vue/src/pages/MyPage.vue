<script lang="ts" setup>
import {computed} from 'vue';
import {useUserStore} from '@/domain/user/store/userStore';
import {useQuery} from '@tanstack/vue-query';
import {fetchAllPosts} from '@/domain/post/api/postApi';
import PostItem from '@/domain/post/ui/PostPage/PostItem.vue';
import Button from '@/shared/ui/Button.vue';
import {useRouter} from 'vue-router';

const userStore = useUserStore();
const myNickname = computed(() => userStore.nickname || localStorage.getItem('nickname') || '');

const {data: allPosts, isLoading: postsLoading} = useQuery({
  queryKey: ['allPosts'],
  queryFn: fetchAllPosts,
  enabled: !!myNickname.value
});

const myPosts = computed(() =>
    (allPosts.value || []).filter(post =>
        (post.nickname || '').trim().toLowerCase() === (myNickname.value || '').trim().toLowerCase()
    )
);

const router = useRouter();
function goToDetail(id) {
  router.push(`/post/${id}`);
}
</script>

<template>
  <div class="max-w-4xl mx-auto py-8 px-4 gap-2">
    <div class="flex text-2xl">
      <p class=" font-bold ">
        안녕하세요 반갑습니다.
      </p>
      <span class="mx-2 italic underline font-bold text-gray-500">{{ myNickname }}님</span>
    </div>

    <div class="py-4">
      <div class="flex justify-between py-2">
        <h3 class="font-bold text-lg">내가 쓴 글</h3>
        <Button class="border px-4 py-1 border-gray-300">로그아웃</Button>
      </div>

      <div v-if="postsLoading" class="text-gray-400 py-5">불러오는 중...</div>
      <ul v-else-if="myPosts && myPosts.length" class="space-y-2">
        <PostItem
            v-for="post in myPosts"
            :key="post.id"
            @click="goToDetail(post.id)"
            :post="post"
            class="cursor-pointer"
        />
      </ul>
      <div v-else class="text-gray-400">작성한 글이 없습니다.</div>
    </div>
  </div>
</template>