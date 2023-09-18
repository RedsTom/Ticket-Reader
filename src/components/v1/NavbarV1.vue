<!-- eslint-disable no-undef -->
<script lang="ts" setup>
import {ref} from 'vue'
import {UserModelV1} from "@/models/report.v1";
import {Parser} from "@/utils/parser";
import {copy} from "@/utils/utils";

interface Props {
  parser: Parser<any>,
  user: UserModelV1,
  show: boolean,
}

// eslint-disable-next-line no-undef
const p = defineProps<Props>()
const popupShow = ref(false)
const modMessages = ref(true)

const emit = defineEmits(['update:show', 'cancel-user'])

function toggleMod () {
  if (modMessages.value) {
    modMessages.value = false
    emit('update:show', modMessages.value)
  } else {
    modMessages.value = true
    emit('update:show', modMessages.value)
  }
}

</script>

<template>
  <nav id="navbar">
    <h1>Lecteur de tickets</h1>

    <div class="user" v-click-outside="() => popupShow = false">
      <component :is="parser.comps.avatar" class="left" :url="p.user.avatarUrl" @click="popupShow = !popupShow" />
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
          <button class="item red" @click="$emit('cancel-user')">
            <fai icon="fas fa-trash-alt" />
            Supprimer
          </button>
        </div>
      </transition>
    </div>
  </nav>

</template>

<style lang="scss" scoped src="@/styles/components/navbar.scss"/>
