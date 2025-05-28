<script lang="ts" setup>
import {ref} from 'vue';
import {useMutation} from '@tanstack/vue-query';
import {useRouter} from 'vue-router';
import {useUserStore} from '@/domain/user/store/userStore';
import {kyInstance} from '@/app/utils/kyInstance';
import Input from '@/shared/ui/Input.vue';
import Button from '@/shared/ui/Button.vue';

const signupNickname = ref('');
const loginNickname = ref('');
const signupSuccess = ref('');
const signupError = ref('');
const loginMessage = ref('');
const signupLoading = ref(false);
const loginLoading = ref(false);

const router = useRouter();
const userStore = useUserStore();
const kyClient = kyInstance();

const loginMutation = useMutation({
  mutationFn: async(nickname: string) => {
    const response = await kyClient.post('users/login', {json: {nickname}}).json<any>();
    return response;
  }
});

const signupMutation = useMutation({
  mutationFn: async(nickname: string) => {
    const response = await kyClient.post('users/signup', {json: {nickname}}).json<any>();
    return response;
  }
});

async function onSignup(){
  signupSuccess.value = '';
  signupError.value = '';
  signupLoading.value = true;
  console.log('[회원가입 요청] nickname:', signupNickname.value);
  try{
    await signupMutation.mutateAsync(signupNickname.value);
    signupSuccess.value = '회원가입에 성공했습니다.';
    signupError.value = '';
    signupNickname.value = '';
  }catch(err: any){
    signupError.value = err?.response?.message || '회원가입에 실패했습니다.';
    signupSuccess.value = '';
  }finally{
    signupLoading.value = false;
  }
}

// 로그인 전용
async function onLogin(){
  loginMessage.value = '';
  loginLoading.value = true;
  console.log('[로그인 요청] nickname:', loginNickname.value);
  try{
    const loginRes = await loginMutation.mutateAsync(loginNickname.value);
    userStore.setNickname(loginNickname.value);
    userStore.setJwt(loginRes.token);
    loginMessage.value = '';
    router.push('/home');
  }catch(err: any){
    loginMessage.value = '회원가입 후 다시 시도하세요.';
  }finally{
    loginLoading.value = false;
  }
}

</script>

<template>
  <div
      class="flex justify-between border border-gray-300 p-10 h-[250px] max-w-2xl mx-auto bg-white">
    <!-- 회원가입 -->
    <form class="w-full" @submit.prevent="onSignup">
      <label class="block font-bold text-2xl mb-4"
             for="signup-nickname">회원가입</label>
      <Input
          id="signup-nickname"
          v-model="signupNickname"
          autocomplete="off"
          class=" mb-4 text-sm h-11 border border-gray-300 w-full px-4"
          placeholder="닉네임을 입력하세요"
          type="text"
      />
      <Button
          :disabled="signupLoading"
          class="w-full border bg-black text-white h-11 text-sm font-bold"
          type="submit"
      >
        회원가입
      </Button>
      <div v-if="signupSuccess" class="py-2 text-green-600 text-xs">
        {{ signupSuccess }}
      </div>
      <div v-if="signupError" class="py-2 text-red-500 text-xs">{{
          signupError
        }}
      </div>
    </form>
    <div class="border-l border-gray-200 mx-8"/>
    <form class="w-full" @submit.prevent="onLogin">
      <label class="block font-bold text-2xl mb-4"
             for="login-nickname">로그인</label>
      <Input
          id="login-nickname"
          v-model="loginNickname"
          autocomplete="off"
          class="text-sm h-11 border border-gray-300 w-full px-4 mb-4"
          placeholder="닉네임을 입력하세요"
          type="text"
      />
      <Button
          :disabled="loginLoading"
          class="w-full border bg-black text-white h-11 text-sm font-bold"
          type="submit"
      >
        로그인
      </Button>
      <div v-if="loginMessage" class="py-2 text-red-500 text-xs">
        {{ loginMessage }}
      </div>
    </form>
  </div>
</template>