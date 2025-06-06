<script setup lang="ts">
defineProps<{
  modelValue: boolean;
  title?: string;
}>();
defineEmits(['close']);
</script>

<template>
  <div v-if="modelValue" class="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-xl p-6 min-w-[320px] max-w-full">

      <div v-if="title" class="text-lg font-bold mb-2">{{ title }}</div>

      <div class="mb-6">
        <slot />
      </div>

      <div class="flex gap-2 justify-end">
        <slot name="actions">
          <button
              class="px-4 py-2 rounded bg-gray-300 text-gray-800"
              @click="$emit('close')"
          >닫기</button>
        </slot>
      </div>
    </div>
  </div>
</template>