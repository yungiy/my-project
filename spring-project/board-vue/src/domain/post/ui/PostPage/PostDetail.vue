<script lang="ts" setup>
import {useRoute, useRouter} from 'vue-router';
import {useMutation, useQuery, useQueryClient} from '@tanstack/vue-query';
import {computed} from 'vue';
import {useUserStore} from '@/domain/user/store/userStore';
import CommentList from '@/domain/comment/ui/CommentList.vue';
import Button from '@/shared/ui/Button.vue';
import {deletePost, fetchPostDetail} from '@/domain/post/api/postApi';
import {createComment, fetchComments} from '@/domain/comment/api/commentApi';

const route = useRoute();
const postId = Number(route.params.id);

const userStore = useUserStore();
const myNickname = computed(() => userStore.nickname || localStorage.getItem('nickname') || '');

const {data: post, isLoading, isError} = useQuery({
  queryKey: ['post', postId],
  queryFn: () => fetchPostDetail(postId),
  enabled: !!postId
});

const queryClient = useQueryClient();
const router = useRouter();

const {
  data: comments = [],
  isLoading: isCommentsLoading,
  error: commentsError
} = useQuery({
  queryKey: ['comments', postId],
  queryFn: () => fetchComments(postId),
  enabled: !!postId
});

const addCommentMutation = useMutation({
  mutationFn: (content: string) => createComment(postId, content),
  onSuccess: () => {
    queryClient.invalidateQueries({queryKey: ['comments', postId]});
  }
});

const deleteMutation = useMutation({
  mutationFn: () => deletePost(postId),
  onSuccess: () => {
    alert('게시글이 삭제되었습니다.');
    router.push('/home'); // 삭제 후 홈으로 이동
  },
  onError: (err: any) => {
    alert(err?.response?.message || '게시글 삭제에 실패했습니다.');
  }
});

// 삭제 버튼 클릭 핸들러
function handleDelete(){
  if(confirm('정말 삭제하시겠습니까?')){
    deleteMutation.mutate();
  }
}

function handleAddComment(content: string){
  addCommentMutation.mutate(content);
}

function formatDate(dateString: string){
  const date = new Date(dateString);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd}`;
}
</script>

<template>
  <div v-if="isLoading" class="text-center py-16">불러오는 중...</div>
  <div v-else-if="isError" class="text-center py-16 text-red-500">게시글을 불러오지
    못했습니다.
  </div>
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
        <span>{{ post.category }}</span>
        <span>{{ post.views }}회</span>
        <template v-if="post.nickname === myNickname">
          <Button
              class="px-4 py-1 border text-black text-base border-gray-300 hover:bg-green-600 hover:text-white">
            수정하기
          </Button>
          <Button
              class="px-4 py-1 border text-black text-base border-gray-300 hover:bg-red-500 hover:text-white"
              @click="handleDelete">
            삭제하기
          </Button>
        </template>
      </div>
    </div>

    <div
        class="prose max-w-full text-lg leading-relaxed py-5 whitespace-pre-line">
      {{ post.content }}
    </div>

    <div class="py-5">
      <CommentList
          :comments="comments || []"
          :error="commentsError"
          :isLoading="isCommentsLoading"
          @add-comment="handleAddComment"
      />
    </div>
  </div>
  <div v-else class="text-center py-16">포스트를 찾을 수 없습니다.</div>
</template>