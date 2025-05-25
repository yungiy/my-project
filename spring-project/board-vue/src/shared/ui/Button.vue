<script lang="ts">
import { defineComponent, computed, useAttrs } from 'vue';

export default defineComponent({
  name: 'Button',
  props: {
    class: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const attrs = useAttrs();

    const customClass = computed(() => props.class ?? '');

    return {
      customClass,
      attrs,
    };
  },
});
</script>

<template>
  <button
      :class="['rounded-sm', customClass]"
      v-bind="attrs"
  >
    <slot />
  </button>
</template>