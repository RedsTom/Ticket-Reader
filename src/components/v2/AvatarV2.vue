<script lang="ts" setup>
// eslint-disable-next-line no-undef
import {ref} from "vue";
import {Parser} from "@/utils/parser";

const p = defineProps<{ url: string, parser: Parser<any> }>()

const avatarBackground = ref(`url(${p.url})`)
</script>

<template>
  <div class="avatar-container">
    <div class="avatar" :style="{backgroundImage: avatarBackground}"></div>
  </div>
</template>

<style lang="scss" scoped src="@/styles/components/avatar.scss"/>
