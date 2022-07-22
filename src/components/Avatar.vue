<script lang="ts" setup>
import { ref } from '@vue/reactivity'

// eslint-disable-next-line no-undef
const p = defineProps<{url: string}>()

const avatarBackground = ref(`url(${p.url})`)
</script>

<template>
    <div class="avatar-container">
        <div class="avatar"></div>
    </div>
</template>

<style lang="scss" scoped>
  .avatar-container {
    display: flex;
    background-image: url(@/assets/default-avatar.jpg);
    background-size: cover;
    background-position: center;

    $size: 2.5rem;
    min-width: $size;
    min-height: $size;
    max-width: $size;
    max-height: $size;

    border-radius: 50%;

    overflow: hidden;

    .avatar {
      width: 100%;
      height: 100%;

      background-image: v-bind(avatarBackground);
      background-position: center;
      background-size: cover;
    }
  }

</style>
