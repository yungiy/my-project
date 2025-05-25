<script lang="ts" setup>
import Button from '@/shared/ui/Button.vue';

defineEmits(['exit', 'save', 'publish']);
</script>

<template>
  <div
      class="absolute w-full right-0 bottom-0 flex justify-between bg-white border-t-2 py-2">
    <Button class="bg-white text-black px-4 py-2 border border-gray-300"
            @click="$emit('exit')">나가기
    </Button>
    <div class="flex gap-2">
      <Button class="bg-white font-bold text-black px-4 py-2"
              @click="$emit('save')">임시저장
      </Button>
      <Button class="bg-white text-black px-4 py-2 border border-gray-300"
              @click="$emit('publish')">출간하기
      </Button>
    </div>

  </div>
</template>