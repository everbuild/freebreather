<template>
  <div class="wrapper">
    <form>
      <label class="field">
        <span class="label">Timer</span>
        <span class="preview">{{ formatSeconds(settings.cycles * settings.totalTime) }} ({{ settings.cycles }} breaths)</span>
        <c-slider v-model="settings.cycles" :values="cycleValues"/>
      </label>

      <label class="field">
        <span class="label">Breathe in</span>
        <span class="preview">{{ formatSeconds(settings.breatheIn) }}</span>
        <c-slider v-model="settings.breatheIn" min="0" max="7" step=".1"/>
    </label>

    <label class="field">
      <span class="label">Pause after breathing in</span>
      <span class="preview">{{ formatSeconds(settings.pauseIn) }}</span>
      <c-slider v-model="settings.pauseIn" min="0" max="7" step=".1"/>
    </label>

    <label class="field">
      <span class="label">Breathe out</span>
      <span class="preview">{{ formatSeconds(settings.breatheOut) }}</span>
      <c-slider v-model="settings.breatheOut" min="0" max="7" step=".1"/>
    </label>

      <label class="field">
        <span class="label">Pause after breathing out</span>
        <span class="preview">{{ formatSeconds(settings.pauseOut) }}</span>
        <c-slider v-model="settings.pauseOut" min="0" max="7" step=".1"/>
      </label>
    </form>
  </div>
</template>

<script>
  import { range } from 'lodash';
  import CSlider from './CSlider.vue';
  import Settings from '../model/Settings';

  export default {
    components: { CSlider },

    props: {
      settings: {
        type: Settings,
        required: true,
      },
    },

    computed: {
      cycleValues() {
        return [
          ...range(6, 12, 1),
          ...range(12, 36, 2),
          ...range(36, 90, 4),
          ...range(90, 190, 10),
        ];
      },
    },

    methods: {
      formatSeconds(value) {
        const minutes = Math.floor(value / 60);
        const seconds = Math.round((value % 60)*10)/10;
        return [
          minutes && `${minutes}m`,
          (seconds || !minutes) && `${seconds}s`,
        ].filter(Boolean).join(' ');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .wrapper {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    top: 0;
    bottom: 0;
    right: 0;
    width: 400px;
    max-width: 100vw;
    padding: 4em;
  }

  .label {
    float: left;
  }

  .preview {
    float: right;
  }

  .field {
    display: block;
    margin-bottom: 1em;
  }
</style>
