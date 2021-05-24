<template>
  <svg class="breather" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" :r="r" fill="currentColor"/>
  </svg>
</template>

<script>
  import CSettings from './CSettings.vue';
  import Settings from '../model/Settings';

  const OFFSET = 30;
  const SCALE = 20;

  export default {
    components: { CSettings },

    props: {
      settings: {
        type: Settings,
        required: true,
      },
    },

    data() {
      return {
        active: false,
        r: 10,
        period: 10000,
      };
    },

    computed: {
      speed() {
        return 2 * Math.PI / this.period;
      },
    },

    mounted() {
      this.start();
    },

    beforeUnmount() {
      this.stop();
    },

    methods: {
      start() {
        if (this.active) return;
        this.active = true;

        let x = 0;

        const frame = (t1, t2) => {
          const dt = t2 - t1;
          x += dt * this.speed;
          this.r = OFFSET + SCALE * Math.sin(x);
          if (this.active) requestAnimationFrame(t3 => frame(t2, t3));
        };

        requestAnimationFrame(t1 => {
          requestAnimationFrame(t2 => frame(t1, t2));
        });
      },

      stop() {
        this.active = false;
      },
    },
  };
</script>

<style lang="scss">
  $size: 60vh;

  svg.breather {
    position: fixed;
    height: $size;
    width: $size;
    top: (100vh - $size)/2;
    left: 50vw;
    margin-left: -$size/2;
    z-index: -100;
    color: $color-accent;
  }
</style>
