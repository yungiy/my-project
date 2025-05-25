<script setup lang="ts">
defineProps<{ modelValue: string }>();
defineEmits(['update:modelValue']);
import Input from '@/shared/ui/Input.vue';
</script>

<template>
  <Input
      type="text"
      class="text-3xl w-full border-r-4 font-bold"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="제목을 입력하세요"
      autocomplete="off"
  />
  <div class="border-b-4 border-black w-20"/>
</template>