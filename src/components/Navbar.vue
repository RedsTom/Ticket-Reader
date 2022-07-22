<!-- eslint-disable no-undef -->
<script lang="ts" setup>
import { ref } from '@vue/reactivity'
import { createToaster } from '@meforma/vue-toaster'
import Avatar from './Avatar.vue'

interface Props {
  user: {
    name: string;
    id: string;
    avatarUrl: string;
  }
}

// eslint-disable-next-line no-undef
const p = defineProps<Props>()
const popupShow = ref(false)
const modMessages = ref(true)

const toast = createToaster({
  duration: 3000,
  type: 'success',
  position: 'bottom'
})

function copy (toCopy: string) {
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard api method'
    return navigator.clipboard.writeText(toCopy)
  } else {
    // text area method
    const textArea = document.createElement('textarea')
    textArea.value = toCopy
    // make the textarea out of viewport
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    document.execCommand('copy')
    textArea.remove()
  }
  toast.show('Texte copié !')
}

const emit = defineEmits(['hide-staff', 'show-staff'])

function toggleMod () {
  if (modMessages.value) {
    modMessages.value = false
    emit('hide-staff')
  } else {
    modMessages.value = true
    emit('show-staff')
  }
}

</script>

<template>
  <nav id="navbar">
    <h1>Lecteur de tickets</h1>

    <div class="user">
      <Avatar class="left" :url="p.user.avatarUrl" @click="popupShow = !popupShow" />
      <div class="right" @click="popupShow = !popupShow">
        <div class="username">{{ p.user.name }}</div>
        <div class="id">{{ p.user.id }}</div>
      </div>
      <fai icon="fas fa-chevron-down" @click="popupShow = !popupShow" />

      <transition name="fade">
        <div class="popup" v-if="popupShow">
          <button class="item" @click="copy(p.user.id)">
            <fai icon="fas fa-copy" />
            Copier l'identifiant
          </button>
          <button class="item" @click="copy(p.user.name)">
            <fai icon="fas fa-copy" />
            Copier le nom d'utilisateur
          </button>
          <button class="item" :class="`${modMessages ? 'red' : 'green'}`" @click.prevent="toggleMod">
            <fai icon="fas fa-eye" />
            {{ modMessages ? 'Cacher' : 'Afficher' }} les messages de la modération
          </button>
          <button class="item yellow">
            <fai icon="fas fa-star" />
            Marquer comme favori
          </button>
          <button class="item red">
            <fai icon="fas fa-trash-alt" />
            Supprimer
          </button>
        </div>
      </transition>
    </div>
  </nav>

</template>

<style lang="scss" scoped>
@use '@/styles/colors';

#navbar {
  position: sticky;
  top: 0;

  width: 100%;
  height: 4rem;

  padding: 0 0 0 2rem;

  background-color: colors.$quite-black;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user {
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 1rem;

  width: fit-content;
  height: 100%;

  padding: 1rem;

  transition: .2s;

  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: lighten(colors.$quite-black, 5%);
  }

  &:active {
    background-color: lighten(colors.$quite-black, 10%);
  }

  .right {
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: flex-start;

    .username {
      font-size: 1.25rem;
      font-weight: 600;
    }

    .id {
      font-size: .75rem;
      color: darken(colors.$white, 25%);
    }
  }

  svg {
    padding-left: 1rem;
  }
}

.popup {
  position: absolute;
  right: 0;
  top: 4rem;

  width: 100%;

  background-color: colors.$quite-black;

  display: flex;
  flex-direction: column;

  border-radius: 0 0 0 .5rem;
  overflow: hidden;

  .item {
    display: flex;
    align-items: center;
    grid-gap: 1rem;

    background-color: colors.$quite-black;
    color: colors.$white;

    font-weight: 600;
    font-size: 1rem;

    outline: none;
    border: none;

    padding: .75rem 2rem;
    transition: .2s;

    text-align: left;

    &:hover {
      background-color: lighten(colors.$quite-black, 5%);
    }

    &:active {
      background-color: lighten(colors.$quite-black, 10%);
    }

    @mixin colorize($color) {
      svg {
        transition: .2s;
        color: $color;
      }
    }

    &.red {
      @include colorize(colors.$red);
    }

    &.green {
      @include colorize(colors.$green);
    }

    &.yellow {
      @include colorize(colors.$yellow);
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  pointer-events: none;
}
</style>
