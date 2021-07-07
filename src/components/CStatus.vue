<template>
  <div class="status-root">
    <div class="controls">
      <div style="width: 4em">{{ status.phase }}</div>
      <div style="width: 4em">{{ remaining }}</div>
      <div v-if="status.active" class="button" @click="$emit('pause')">
        <c-icon name="pause"/>
        <span>Pause</span>
      </div>
      <div v-else class="button" @click="$emit('resume')">
        <c-icon name="play"/>
        <span>Resume</span>
      </div>
      <div class="button" @click="$emit('reset')">
        <c-icon name="close"/>
        <span>Reset</span>
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
        return Math.floor(this.status.runTime) / this.settings.totalTime;
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

    .controls {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }
  }
</style>