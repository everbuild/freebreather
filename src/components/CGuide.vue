<template>
  <div class="guide-root" :class="{ faded }">
    {{ text }}
  </div>
</template>

<script>
  import { Breather, State } from '../model/Breather';

  const FADE_S = .5;

  export default {
    props: {
      breather: {
        type: Breather,
        required: true,
      },
    },

    data() {
      return {
        faded: true,
      };
    },

    computed: {
      key() {
        switch (this.breather.state) {
          case State.WARMUP:
            return 'warmup';
          case State.CYCLE:
            return this.breather.phaseName;
          case State.DONE:
            return 'done';
        }
      },

      text() {
        return this.key ? this.$t(`guide.${this.key}`) : '';
      },
    },

    methods: {
      onTextUpdate() {
        console.log('onTextUpdate', this.text);
        if (this.text) {
          this.faded = false;
          const ttl = this.breather.settings[this.key];
          if (ttl) {
            clearTimeout(this.tid);
            this.tid = setTimeout(() => {
              this.faded = true;
            }, Math.max(0, (ttl - FADE_S) * 1000));
          }
        } else {
          this.faded = true;
        }
      },
    },

    watch: {
      text: 'onTextUpdate',
    },

    mounted() {
      this.onTextUpdate();
    },
  };
</script>

<style lang="scss" scoped>
  .guide-root {
    font-size: 2rem;
    transition: opacity .5s;

    &.faded {
      opacity: 0;
    }
  }
</style>