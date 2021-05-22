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
        this.$emit('update:modelValue', this.values ? this.values[value] : value);
      },
    },
  };
</script>

<style lang="scss" scoped>
  $size: 60vh;

  input {
    color: orangered;
    cursor: pointer;
    -webkit-appearance: none;
    width: 100%;
    height: 25px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;

    &:hover {
      opacity: 1;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 25px;
      height: 25px;
      background: orangered;
      cursor: pointer;
    }

    &::-moz-range-thumb {
      width: 25px;
      height: 25px;
      background: orangered;
      cursor: pointer;
    }
  }
</style>
