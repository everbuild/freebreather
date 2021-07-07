<template>
  <form>
    <label class="field">
      <span class="label">Timer</span>
      <span class="preview">{{ formatSeconds(settings.totalTime) }} ({{ settings.cycles }} breaths)</span>
      <c-slider v-model="settings.cycles" :values="cycleValues"/>
    </label>

    <label class="field">
      <span class="label">Breathe in</span>
      <span class="preview">{{ formatSeconds(settings.inhale) }}</span>
      <c-slider v-model="settings.inhale" min="0" max="7" step=".1"/>
    </label>

    <label class="field">
      <span class="label">Pause after breathing in</span>
      <span class="preview">{{ formatSeconds(settings.inhaled) }}</span>
      <c-slider v-model="settings.inhaled" min="0" max="7" step=".1"/>
    </label>

    <label class="field">
      <span class="label">Breathe out</span>
      <span class="preview">{{ formatSeconds(settings.exhale) }}</span>
      <c-slider v-model="settings.exhale" min="0" max="7" step=".1"/>
    </label>

    <label class="field">
      <span class="label">Pause after breathing out</span>
      <span class="preview">{{ formatSeconds(settings.exhaled) }}</span>
      <c-slider v-model="settings.exhaled" min="0" max="7" step=".1"/>
    </label>
  </form>
</template>

<script>
  import { range } from 'lodash';
  import CSlider from './CSlider.vue';
  import Settings from '../model/Settings';
  import { formatSecondsText } from '../util/time';

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
        return formatSecondsText(value);
      },
    },
  };
</script>

<style lang="scss" scoped>
  form {
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
