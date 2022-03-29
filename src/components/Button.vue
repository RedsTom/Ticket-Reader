<template>
    <button @click="(event) => click(event)">
        {{text}}
    </button>
</template>

<script lang="ts">
/* eslint-disable vuejs-accessibility/form-control-has-label */

import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({})
export default class Btn extends Vue {
    @Prop({
      default: '',
    })
    private text!: string;

    click(event: MouseEvent): void {
      this.$emit('click', event);
    }
}
</script>

<style lang="scss" scoped>
button {
  outline: none;
  border: none;

  background-color: $green;
  color: $white;

  padding: .5rem;
  border-radius: .25rem;

  &:hover {
    background-color: darken($green, 5%);
  }
  &:active {
    background-color: darken($green, 10%);
  }
}
</style>
