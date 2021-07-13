<template>
  <div class="status-root">
    <div class="controls">
      <div>{{ $t(`status.phase.${done ? 'done' : status.phase}`) }}</div>
      <div v-if="!done">{{ remaining }}</div>
      <div v-if="status.active" class="button" @click="$emit('pause')">
        <c-icon name="pause"/>
        <span>{{ $t('status.pause') }}</span>
      </div>
      <div v-else-if="!done" class="button" @click="$emit('resume')">
        <c-icon name="play"/>
        <span>{{ $t('status.resume') }}</span>
      </div>
      <div class="button" @click="$emit('reset')">
        <c-icon name="close"/>
        <span>{{ $t('status.reset') }}</span>
      </div>
    </div>
    <c-progress :value="progress"/>
  </div>
</template>

<script>
  import Settings from '../model/Settings';
  import Status from '../model/Status';
  import CProgress from './CProgress.vue';
  import CIcon from './CIcon.vue';
  import { formatSecondsDigital } from '../util/time';

  export default {
    components: { CIcon, CProgress },

    props: {
      status: {
        type: Status,
        required: true,
      },

      settings: {
        type: Settings,
        required: true,
      },
    },

    computed: {
      progress() {
        return Math.floor(this.status.runTime * 10) / this.settings.totalTime / 10;
      },

      done() {
        return this.settings.totalTime === this.status.runTime;
      },

      remaining() {
        return formatSecondsDigital(this.settings.totalTime - this.status.runTime);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .status-root {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1em;
    background: $color-bg;
    box-shadow: 0 -1em 1em $color-bg;

    .controls {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      margin-bottom: 1rem;
      font-size: 1.5rem;

      > * {
        min-width: 5em;
        text-align: left;
      }
    }
  }
</style>