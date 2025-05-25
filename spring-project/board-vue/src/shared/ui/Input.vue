<template>
  <input
      ref="inputRef"
      v-bind="attrs"
      :type="type"
      :class="['font-medium focus:outline-none', customClass]"
  />
</template>

<script lang="ts">
import { defineComponent, ref, computed, useAttrs } from 'vue';

export default defineComponent({
  name: 'Input',
  props: {
    type: {
      type: String as () => 'text' | 'password' | 'email' | 'search',
      required: true,
    },
    class: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const attrs = useAttrs();
    const inputRef = ref<HTMLInputElement | null>(null);
    const customClass = computed(() => (props.class ?? '') as string);

    return {
      inputRef,
      type: props.type,
      customClass,
      attrs,
    };
  },
});
</script>