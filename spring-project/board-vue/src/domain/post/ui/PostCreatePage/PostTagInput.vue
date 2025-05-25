<template>
  <div class="flex gap-2">
    <Button
        v-for="cat in categories"
        :key="cat"
        :class="[
        'bg-white text-black px-4 py-2 border',
        modelValue === cat ? 'border-black' : 'border-gray-300'
      ]"
        @click="$emit('update:modelValue', cat)"
    >
      {{ cat }}
    </Button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: string }>();
defineEmits(['update:modelValue']);
import Button from '@/shared/ui/Button.vue';
const categories = ['자유게시판', '공부게시판', '기타'];
</script>