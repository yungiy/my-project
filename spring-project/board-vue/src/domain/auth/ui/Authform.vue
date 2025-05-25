<script lang="ts">
import {defineComponent, ref} from 'vue';
import Button from '@/shared/ui/Button.vue';
import Input from '@/shared/ui/Input.vue';

export default defineComponent({
  name: 'AuthForm',
  components: {Input, Button},
  setup(){
    const nickname = ref('');

    function onSubmit(){

    }

    return {
      nickname,
      onSubmit
    };
  }
});
</script>
<template>
  <form class="w-full border border-gray-300 p-8 max-w-xs mx-auto space-y-4"
        @submit.prevent="onSubmit">
    <label class="block font-bold text-2xl" for="nickname">로그인</label>
    <Input
        id="nickname"
        v-model="nickname"
        autocomplete="off"
        class="text-sm h-11 border border-gray-300 w-full px-4"
        placeholder="닉네임을 입력하세요"
        type="text"
    />
    <Button
        class="w-full border bg-black text-white h-11 text-sm font-bold"
        type="submit"
    >
      로그인
    </Button>
  </form>
</template>