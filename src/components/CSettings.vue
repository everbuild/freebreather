<template>
  <form>
    <label class="field">
      <span class="label">Timer</span>
      <span class="preview">{{ formatSeconds(settings.sessionTime) }}</span>
      <c-slider v-model="settings.sessionTime" :values="sessionTimes"/>
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
      sessionTimes() {
        return [
          ...range(10, 60, 10),
          ...range(60, 6 * 60, 30),
          ...range(6 * 60, 15 * 60, 60),
          ...range(15 * 60, 31 * 60, 5 * 60),
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
