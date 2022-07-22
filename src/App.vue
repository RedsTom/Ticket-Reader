<script lang="ts" setup>
import '@/styles/index.scss'
import Navbar from './components/Navbar.vue'
import Message from './components/Message.vue'
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'

const params = new URLSearchParams(window.location.search)

const fetching = ref(true)
const file = ref(undefined)
const error = ref(undefined)

const showStaff = ref(true)

if (params.has('input')) {
  fetch(`https://cors.enimaloc.fr/${params.get('input')}`)
    .then(res => res.json())
    .then(data => { file.value = data; fetching.value = false })
    .catch(err => { error.value = err; fetching.value = false })
}

const messages = computed(() => showStaff.value ? (file.value?.messages ?? []) : (file.value?.messages ?? []).filter(a => getColorClass(a) !== 'red'))

const getColorClass: (msg: { messageType: string, author: { id: string }, content: string }) => string = (msg) => {
  let colorClass = msg.messageType === 'MODERATION' ? 'red' : 'green'
  // eslint-disable-next-line eqeqeq
  if (msg.content.startsWith('\'') || msg.author.id == '804866779519516700') {
    colorClass = 'blue'
  }
  return colorClass
}
</script>

<template>
  <div class="loader" v-if="fetching">
    <div class="loader-circle">
    </div>
  </div>
  <div class="ok" v-else-if="!fetching && !!file">
    <Navbar :user="file.to" @show-staff="showStaff = true" @hide-staff="showStaff = false" />
    <div class="messages">
      <Message :message="message" :color-class="getColorClass(message)" v-for="message in messages"
        :key="JSON.stringify(message)" />
    </div>
  </div>
  <div class="no-fetched" v-else>
    Fichier inconnu ¯\_(ツ)_/¯
  </div>
</template>

<style lang="scss">
@use '@/styles/colors';

.loader {
  background: colors.$black;

  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  .loader-circle {
    width: 5rem;
    height: 5rem;

    border: .5rem colors.$blue solid;
    border-radius: 50%;
    border-left-color: transparent;

    animation: spin 2s infinite linear;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
