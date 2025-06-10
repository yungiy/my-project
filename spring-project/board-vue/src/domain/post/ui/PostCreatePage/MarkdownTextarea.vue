<script lang="ts" setup>
defineProps<{ modelValue: string }>();
defineEmits(['update:modelValue']);
</script>

<template>
<textarea
    :value="modelValue"
    autocomplete="off"
    class="w-full py-3 text-base bg-white h-4/5
           outline-none border-none resize-none focus:outline-none"
    placeholder="당신의 이야기를 적어보세요..."
    spellcheck="false"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
/>
</template>