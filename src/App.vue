<template>
  <c-breather :settings="settings"/>
  <c-settings :settings="settings"/>
</template>

<script>
  import CBreather from './components/CBreather.vue';
  import Settings from './model/Settings.ts';
  import CSettings from './components/CSettings.vue';

  export default {
    components: { CSettings, CBreather },

    data() {
      return {
        settings: new Settings(),
      };
    },
  };
</script>
