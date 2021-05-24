<template>
  <svg class="breather" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" :r="r" fill="currentColor"/>
  </svg>
</template>

<script>
  import CSettings from './CSettings.vue';
  import Settings from '../model/Settings';
  import { easeInOutQuad } from '../util/easing';

  const OFFSET = 30;
  const SCALE = 20;

  const PHASES = [
    {
      name: 'breatheIn',
      y(x) {
        return easeInOutQuad(x);
      },
    },
    {
      name: 'pauseIn',
      y(x) {
        return 1;
      },
    },
    {
      name: 'breatheOut',
      y(x) {
        return 1 - easeInOutQuad(x);
      },
    },
    {
      name: 'pauseOut',
      y(x) {
        return 0;
      },
    },
  ];

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
        r: OFFSET,
      };
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

        let phaseIdx = 0;
        let phase;
        let phaseDuration;
        let phaseTime = 0;

        const startPhase = () => {
          phase = PHASES[phaseIdx % PHASES.length];
          phaseDuration = this.settings[phase.name];
        };

        startPhase();

        this.r = OFFSET;

        const frame = (t1, t2) => {
          const dt = t2 - t1;
          phaseTime += dt / 1000;
          while (phaseTime >= phaseDuration) {
            phaseTime -= phaseDuration;
            ++phaseIdx;
            startPhase();
          }
          const y = phase.y(phaseTime / phaseDuration);
          this.r = OFFSET + SCALE * y;
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
