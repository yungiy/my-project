<template>
  <input
      ref="inputRef"
      :class="['font-medium focus:outline-none', customClass]"
      :type="type"
      :value="modelValue"
      v-bind="attrs"
      @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent, ref, computed, useAttrs } from 'vue';

export default defineComponent({
  name: 'Input',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    type: {
      type: String as () => 'text' | 'password' | 'email' | 'search',
      required: true
    },
    class: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup(props) {
    const attrs = useAttrs();
    const inputRef = ref<HTMLInputElement | null>(null);
    const customClass = computed(() => props.class ?? '');
    return {
      inputRef,
      customClass,
      attrs,
      type: props.type,
    };
  }
});
</script>