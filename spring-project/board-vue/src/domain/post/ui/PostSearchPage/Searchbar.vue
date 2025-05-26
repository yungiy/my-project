<script setup lang="ts">
import { ref, watch } from 'vue';
import Input from '@/shared/ui/Input.vue';

const props = defineProps<{ modelValue?: string; placeholder?: string }>();
const emit = defineEmits(['update:modelValue', 'search']);

const keyword = ref(props.modelValue || '');

watch(keyword, (val) => emit('update:modelValue', val));

// 검색 실행 (엔터 or 버튼)
function onSearch() {
  emit('search', keyword.value);
}
</script>

<template>
  <form @submit.prevent="onSearch" class="flex justify-center items-center w-full mb-8">
    <Input
        v-model="keyword"
        type="search"
        :placeholder="placeholder"
        class="w-4xl border border-gray-300 rounded px-4 py-2"
        @keydown.enter="onSearch"
    />
  </form>
</template>