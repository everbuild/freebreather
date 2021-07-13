<template>
  <div class="app-root">
    <div class="breather-block clickable">
      <c-breather ref="breather" :settings="settings" @click="toggle" @status="status = $event"/>
      <c-icon v-if="canStart" name="play"/>
    </div>
    <div class="settings-block" :class="settingsClass">
      <c-settings class="settings" :settings="settings"/>
    </div>
  </div>
  <c-status v-if="started" :settings="settings" :status="status"
            @pause="pause" @resume="resume" @reset="reset"/>
</template>

<script>
  import CBreather from './components/CBreather.vue';
  import Settings from './model/Settings.ts';
  import CSettings from './components/CSettings.vue';
  import CIcon from './components/CIcon.vue';
  import CStatus from './components/CStatus.vue';

  export default {
    components: { CStatus, CIcon, CSettings, CBreather },

    data() {
      return {
        settings: new Settings().load(),
        status: null,
      };
    },

    computed: {
      canStart() {
        return !this.status?.active && !this.done;
      },

      started() {
        return this.status?.runTime > 0;
      },

      done() {
        return this.settings.totalTime === this.status?.runTime;
      },

      settingsClass() {
        return {
          collapsed: this.status?.active || this.done,
        };
      },
    },

    methods: {
      toggle() {
        if (this.done) {
          this.reset();
        } else if (this.status?.active) {
          this.pause();
        } else {
          this.resume();
        }
      },

      pause() {
        this.$refs.breather.stop();
      },

      resume() {
        this.$refs.breather.start();
        this.settings.save();
      },

      reset() {
        this.$refs.breather.stop();
        this.$refs.breather.reset();
      },
    },

    mounted() {
      this.onKeydown = event => {
        if (event.key === ' ') {
          this.toggle();
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
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 16vh;
  }

  .breather-block {
    flex: 0 1 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;

    .icon {
      $size: 25%;
      $offset: (100% - $size)/2;
      position: absolute;
      color: $color-bg;
      width: $size;
      height: $size;
      top: $offset;
      left: #{$offset + 1};
      pointer-events: none;
    }
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

    &.collapsed {
      width: 0;
    }
  }
</style>