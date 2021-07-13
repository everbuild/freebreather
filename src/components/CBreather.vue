<template>
  <svg class="breather-root" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" :r="r" fill="currentColor"/>
  </svg>
</template>

<script>
  import CSettings from './CSettings.vue';
  import Settings from '../model/Settings';
  import { easeInOutQuad } from '../util/easing';
  import Status from '../model/Status';

  const OFFSET = 30;
  const SCALE = 20;

  const PHASES = [
    {
      name: 'inhale',
      y(x) {
        return easeInOutQuad(x);
      },
    },
    {
      name: 'inhaled',
      y(x) {
        return 1;
      },
    },
    {
      name: 'exhale',
      y(x) {
        return 1 - easeInOutQuad(x);
      },
    },
    {
      name: 'exhaled',
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

    created() {
      this.reset();
    },

    methods: {
      reset() {
        this.phaseTime = 0;
        this.runTime = 0;
        this.r = OFFSET;
        this.phaseIdx = 0;
        this._startPhase();
        this.$emit('status', null);
      },

      start() {
        if (this.active) return;
        this.active = true;
        this._emitStatus();
        requestAnimationFrame(t1 => {
          requestAnimationFrame(t2 => this._frame(t1, t2));
        });
      },

      stop() {
        this.active = false;
        this._emitStatus();
      },

      _startPhase() {
        this.phase = PHASES[this.phaseIdx % PHASES.length];
        this.phaseDuration = this.settings[this.phase.name];
      },

      _frame(t1, t2) {
        if (!this.active) return;

        const dt = (t2 - t1) / 1000;
        this.phaseTime += dt;

        while (this.phaseTime >= this.phaseDuration) {
          ++this.phaseIdx;

          if (this.phaseIdx >= this.settings.cycles * PHASES.length) {
            this._finish();
            return;
          }

          this.phaseTime -= this.phaseDuration;
          this._startPhase();
        }

        const y = this.phase.y(this.phaseTime / this.phaseDuration);
        this.r = OFFSET + SCALE * y;

        this.runTime += dt;
        this._emitStatus();

        requestAnimationFrame(t3 => this._frame(t2, t3));
      },

      _finish() {
        this.r = OFFSET;
        this.active = false;
        this.runTime = this.settings.totalTime;
        this._emitStatus();
      },

      _emitStatus() {
        this.$emit('status', new Status(
          this.active,
          this.phase.name,
          this.phaseTime,
          this.runTime,
        ));
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
