<script setup lang="ts">
import { ref, watch } from 'vue';
import Input from '@/shared/ui/Input.vue';

const props = defineProps<{ modelValue?: string; placeholder?: string }>();
const emit = defineEmits(['update:modelValue', 'search']);

const keyword = ref(props.modelValue || '');

watch(keyword, (val) => emit('update:modelValue', val));

function onSearch() {
  emit('search', keyword.value);
}
</script>

<template>
  <form @submit.prevent="onSearch" class="flex justify-center items-center mb-8">
    <Input
        v-model="keyword"
        type="search"
        :placeholder="placeholder"
        class=" w-6xl border border-gray-300 rounded px-4 py-2"
        @keydown.enter="onSearch"
    />
  </form>
</template>