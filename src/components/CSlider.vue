<template>
  <input type="range" :value="value" @input="onInput" v-bind="attrs"/>
</template>

<script>
  export default {
    props: {
      modelValue: {
        type: Number,
        required: true,
      },
      values: {
        type: Array,
      },
    },

    computed: {
      value() {
        if (this.values) {
          if (this.values.length < 2) return 0;
          const i = this.values.indexOf(this.modelValue);
          if (i >= 0) return i;
          return this.values
            .map((v, i) => [i, Math.abs(v - this.value)])
            .sort((a, b) => a[1] - b[1])
            [0][0];
        } else {
          return this.modelValue;
        }
      },

      attrs() {
        if (this.values) {
          return {
            ...this.$attrs,
            min: 0,
            max: this.values.length - 1,
            step: 1,
          };
        } else {
          return this.$attrs;
        }
      },
    },

    methods: {
      onInput(event) {
        const { value } = event.target;
        this.$emit('update:modelValue', 1*(this.values ? this.values[value] : value));
      },
    },
  };
</script>

<style lang="scss" scoped>
  $size: 60vh;
  $color-knob: darken($color-accent,10);
  $height: 1em;

  input {
    color: $color-knob;
    cursor: pointer;
    -webkit-appearance: none;
    width: 100%;
    height: $height;
    outline: none;
    border-radius: $height/2;
    overflow: hidden;
    background-color: mix($color-primary, $color-bg, 20%);
    -webkit-transition: .2s;
    transition: background-color .2s;

    &:hover {
      background-color: mix($color-primary, $color-bg, 40%);
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 2em;
      height: $height;
      background: $color-knob;
      cursor: pointer;
    }

    &::-moz-range-thumb {
      width: 2em;
      height: $height;
      background: $color-knob;
      cursor: pointer;
    }
  }
</style>
