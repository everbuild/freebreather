<template>
  {{ cycleTime }}/{{ cycleValues.length }}
  <form>
    <label class="field">
      <span class="label">Cycles</span>
      <span class="preview">{{ settings.cycles }} ({{ formatSeconds(settings.cycles * cycleTime) }})</span>
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
      },
    },

    computed: {
      cycleTime() {
        const s = this.settings;
        return s.breatheIn + s.pauseIn + s.breatheOut + s.pauseOut;
      },

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
        const seconds = value % 60;
        return [
          minutes && `${minutes}m`,
          (seconds || !minutes) && `${seconds}s`,
        ].filter(Boolean).join(' ');
      },
    },
  };
</script>
