<template>
  <h1>Blijven ademen ;-)</h1>
  <svg class="breather" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" :r="r" fill="currentColor"/>
  </svg>
<!--  <form class="settings">-->
<!--    <label>-->
<!--      <span>Periode: {{ period / 1000 }}s</span>-->
<!--      <input type="range" v-model="period" step="100" min="500" max="30000"/>-->
<!--    </label>-->
<!--  </form>-->
  <c-settings :settings="settings"/>
</template>

<script>
  import CSettings from './CSettings.vue';
  import Settings from '../model/Settings';

  const OFFSET = 30;
  const SCALE = 20;

  export default {
    components: { CSettings },

    data() {
      return {
        active: false,
        r: 10,
        period: 10000,
        settings: new Settings(),
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
    color: orangered;
  }

  form.settings {
    width: 20em;
    position: fixed;
    bottom: 2em;
    left: 50vw;
    margin-left: -10em;
  }

  input[type=range] {
    color: orangered;
    cursor: pointer;
    -webkit-appearance: none;
    width: 100%;
    height: 25px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;

    &:hover {
      opacity: 1;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 25px;
      height: 25px;
      background: orangered;
      cursor: pointer;
    }

    &::-moz-range-thumb {
      width: 25px;
      height: 25px;
      background: orangered;
      cursor: pointer;
    }
  }

</style>
