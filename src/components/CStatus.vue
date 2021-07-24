<template>
  <div class="status-root">
    <div class="controls">
      <div>{{ runTime }}</div>
      <div v-if="breather.active" class="button" @click="$emit('pause')">
        <c-icon name="pause"/>
        <span>{{ $t('status.pause') }}</span>
      </div>
      <div v-else-if="!breather.done" class="button" @click="$emit('resume')">
        <c-icon name="play"/>
        <span>{{ $t('status.resume') }}</span>
      </div>
      <div class="button" @click="$emit('reset')">
        <c-icon name="close"/>
        <span>{{ $t('status.reset') }}</span>
      </div>
    </div>
    <c-progress :value="breather.progress"/>
  </div>
</template>

<script>
  import CProgress from './CProgress.vue';
  import CIcon from './CIcon.vue';
  import { formatSecondsDigital } from '../util/time';
  import { Breather } from '../model/Breather';

  export default {
    components: { CIcon, CProgress },

    props: {
      breather: {
        type: Breather,
        required: true,
      },
    },

    computed: {
      runTime() {
        return formatSecondsDigital(this.breather.runTime);
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