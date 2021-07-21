<template>
  <svg class="breather-root" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" :r="r" fill="currentColor"/>
  </svg>
</template>

<script>
  import CSettings from './CSettings.vue';
  import { Breather } from '../model/Breather';

  const OFFSET = 30;
  const SCALE = 20;

  export default {
    components: { CSettings },

    props: {
      breather: {
        type: Breather,
        required: true,
      },
    },

    computed: {
      r() {
        return this.breather.value * SCALE + OFFSET;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .breather-root {
    width: 100%;
    color: $color-accent;
  }
</style>
