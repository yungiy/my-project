<script lang="ts" setup>
import {computed} from 'vue';
import {marked} from 'marked';

marked.setOptions({
  breaks: true,  // 엔터키를 <br>로 변환
  gfm: true
});

const props = defineProps<{
  title: string;
  content: string;
  category: string;
}>();

const htmlContent = computed(() => {
  const cleaned = (props.content || '')
  .split('\n')
  .map(line => line.replace(/^\s+/, ''))
  .join('\n');
  return marked.parse(cleaned);
});
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">{{ title }}</h1>
    <h2 class="text-lg font-bold mb-6">{{ category }}</h2>
    <div class="prose max-w-full" v-html="htmlContent"></div>
  </div>
</template>