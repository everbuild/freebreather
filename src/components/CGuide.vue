<template>
  <div class="guide-root" :class="rootClass">
    {{ (`guide.${breather.stateName}`) }}
  </div>
</template>

<script>
  import CProgress from './CProgress.vue';
  import CIcon from './CIcon.vue';
  import { Breather } from '../model/Breather';

  export default {
    components: { CIcon, CProgress },

    props: {
      breather: {
        type: Breather,
        required: true,
      },
    },

    data() {
      return {
        faded: false,
      };
    },

    computed: {
      rootClass() {
        return {
          active: (this.breather.settings.guide && this.breather.active) || this.done,
          faded: this.faded,
        };
      },
    },

    watch: {
      'breather.active'(active) {
        if (active) {
          this.tid = setTimeout(() => this.faded = true, this.settings.cycleTime * 4);
        } else {
          this.faded = false;
          clearTimeout(this.tid);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .guide-root {
    display: none;
    font-size: 2rem;

    &.active {
      display: block;

      &.faded {
        opacity: 0;
        transition: opacity 4s;
      }
    }
  }
</style>