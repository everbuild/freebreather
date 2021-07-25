<template>
  <div class="app-root" :class="{active}">
    <div class="breather-block clickable">
      <c-breather :breather="breather" @click="toggle"/>
      <div class="overlay">
        <c-guide v-if="showGuide" :breather="breather"/>
        <c-icon v-if="!active" name="play"/>
      </div>
    </div>
    <div class="settings-block">
      <c-settings class="settings" :settings="settings"/>
    </div>
  </div>
  <c-status v-if="breather.started" :breather="breather" @pause="pause" @resume="resume" @reset="reset"/>
</template>

<script>
  import CBreather from './components/CBreather.vue';
  import Settings from './model/Settings.ts';
  import CSettings from './components/CSettings.vue';
  import CIcon from './components/CIcon.vue';
  import CStatus from './components/CStatus.vue';
  import CGuide from './components/CGuide.vue';
  import { Breather } from './model/Breather';

  export default {
    components: { CGuide, CStatus, CIcon, CSettings, CBreather },

    data() {
      const settings = new Settings().load();
      const breather = new Breather(settings);
      return {
        settings,
        breather,
      };
    },

    computed: {
      active() {
        return this.breather.active || this.breather.done;
      },

      showGuide() {
        if (this.breather.done) return true;
        if (!this.settings.guide) return false;
        return this.breather.active && this.breather.cycles < 5;
      },
    },

    methods: {
      toggle() {
        if (this.breather.done) {
          this.reset();
        } else if (this.breather.active) {
          this.pause();
        } else {
          this.resume();
        }
      },

      pause() {
        this.breather.stop();
      },

      resume() {
        this.breather.start();
        this.settings.save();
      },

      reset() {
        this.breather.reset();
      },
    },

    mounted() {
      this.onKeydown = event => {
        if (event.key === ' ') {
          this.toggle();
          event.preventDefault();
        }
      };
      document.addEventListener('keydown', this.onKeydown);
    },

    unmounted() {
      document.removeEventListener('keydown', this.onKeydown);
    },
  };
</script>

<style lang="scss" scoped>
  .app-root {
    margin-bottom: 8em;
  }

  .breather-block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;

    .overlay {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $color-bg;
      pointer-events: none;

      .icon {
        $size: 25%;
        width: $size;
        height: $size;
        padding-left: 1%;
      }
    }
  }

  @media (orientation: landscape) and (min-width: 40rem) {
    .app-root {
      display: flex;
      flex-direction: row;
      justify-content: center;
      height: calc(100vh - 4em);
    }

    .breather-block {
      flex: 0 1 60vh;
    }

    .settings-block {
      $width: 25rem;

      flex: 0 0 auto;
      width: $width;
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      transition: width .5s;

      .settings {
        width: $width;
      }

      .active & {
        width: 0;
      }
    }
  }

  @media (orientation: portrait), (max-width: 40rem) {
    .app-root {
      min-width: 25rem;
    }

    .breather-block {
      width: 50vw;
      height: 50vw;
      padding: 4em;
      margin: auto;
      transition: width .5s, height .5s;

      .active & {
        width: 100vw;
        height: calc(100vh - 4em);
      }
    }
  }
</style>