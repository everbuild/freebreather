<template>
  <div class="progress">
    <div class="done" :style="doneStyle"/>
  </div>
</template>

<script>
  import { pct } from '../util/css';

  export default {
    props: {
      value: {
        type: Number,
        required: true,
      },
    },

    computed: {
      doneStyle() {
        return {
          width: pct(this.value),
        };
      },
    },
  };
</script>

<style lang="scss" scoped>
  .progress {
    $color-done: $color-primary;
    $color-todo: mix($color-primary, $color-bg, 70%);

    background: $color-todo;

    .done {
      height: 4px;
      background: $color-done;
      transition: width .1s linear;
    }
  }
</style>