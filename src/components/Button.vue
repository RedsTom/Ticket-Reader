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

  padding: 1rem;
  border-radius: .25rem;

  height: 2.5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: darken($green, 5%);
  }
  &:active {
    background-color: darken($green, 10%);
  }
}
</style>
