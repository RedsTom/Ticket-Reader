<template>
    <nav id="nav">
        <div class="left">
            <img src="https://media.discordapp.net/attachments/723482024278753280/827273632996130826/logo.png" alt="Logo" class="logo">
            <h1>Lecteur de tickets</h1>
        </div>
    </nav>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import Btn from './Button.vue';

@Component({ components: { Btn } })
export default class Navbar extends Vue {
}
</script>

<style lang="scss" scoped>
nav#nav {
    background-color: darken($bg, 5%);
    height: 75px;
    width: 100%;

    padding: 0 2rem;

    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-gap: 1rem;

    .left, .right {
        display: flex;
        grid-gap: .5rem;
        align-items: center;
    }

    h1 {
        font-size: 1.5rem;
        font-weight: 600;
    }
    img {
        width: 64px;
        height: 64px;
    }
}
</style>
