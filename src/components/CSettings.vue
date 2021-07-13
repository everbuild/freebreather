<template>
  <form>
    <label class="field">
      <span class="label">{{ $t('settings.timer') }}</span>
      <span class="preview">{{ formatSeconds(settings.totalTime) }} ({{ settings.cycles }} {{ $t('settings.breaths') }})</span>
      <c-slider v-model="settings.cycles" :values="cycleValues"/>
    </label>

    <label class="field">
      <span class="label">{{ $t('settings.phase.inhale') }}</span>
      <span class="preview">{{ formatSeconds(settings.inhale) }}</span>
      <c-slider v-model="settings.inhale" min="0" max="7" step=".1"/>
    </label>

    <label class="field">
      <span class="label">{{ $t('settings.phase.inhaled') }}</span>
      <span class="preview">{{ formatSeconds(settings.inhaled) }}</span>
      <c-slider v-model="settings.inhaled" min="0" max="7" step=".1"/>
    </label>

    <label class="field">
      <span class="label">{{ $t('settings.phase.exhale') }}</span>
      <span class="preview">{{ formatSeconds(settings.exhale) }}</span>
      <c-slider v-model="settings.exhale" min="0" max="7" step=".1"/>
    </label>

    <label class="field">
      <span class="label">{{ $t('settings.phase.exhaled') }}</span>
      <span class="preview">{{ formatSeconds(settings.exhaled) }}</span>
      <c-slider v-model="settings.exhaled" min="0" max="7" step=".1"/>
    </label>

    <div class="presets">
      <label>{{ $t('settings.presets') }}</label>
      <a v-for="preset in presets" href="#" @click="settings.apply(preset)">{{ preset.name }}</a>
    </div>

    <div class="info">
      <a class="button" href="https://github.com/everbuild/freebreather" target="_blank">
        <c-icon name="github"/>
        <span>{{ $t('homepage') }}</span>
      </a>
    </div>
  </form>
</template>

<script>
  import { range } from 'lodash';
  import CSlider from './CSlider.vue';
  import Settings, { presets } from '../model/Settings';
  import { formatSecondsText } from '../util/time';
  import CIcon from './CIcon.vue';

  export default {
    components: { CIcon, CSlider },

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

      presets() {
        return presets;
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

  .presets {
    display: flex;
    flex-direction: row;
    margin-right: -1em;

    a {
      flex: 1 0 auto;
      text-align: right;
      padding-right: 1em;
    }
  }

  .info {
    display: flex;
    justify-content: flex-end;
    font-size: .75em;
    margin-top: 2em;

    .button .icon {
      padding-right: 1em;
    }
  }
</style>
