<script lang="ts" setup>
import '@/styles/index.scss'
import {ReportModel} from '@/models/report'
import {useRoute, useRouter} from 'vue-router'
import {onMounted, Ref, ref} from "vue";
import parse, {Parser} from "@/utils/parser";

const fetching = ref(true)
const parser: Ref<Parser<any> | undefined> = ref();
const report: Ref<ReportModel> = ref(undefined)
const error = ref(undefined)

const route = useRoute()
const router = useRouter()

const load = () => {
  if (route.query.input) {
    fetch(`https://cors.enimaloc.fr/${route.query.input}`)
      .then(res => res.json())
      .then(data => {
        const parseResult = parse(data);
        parser.value = parseResult.parser;
        report.value = parseResult.data;

        fetching.value = false
      })
      .catch(err => {
        error.value = err;
        fetching.value = false
      })
  } else {
    fetching.value = false
  }
}



onMounted(() => load())

const reportLink = ref('')
const update = async () => {
  if (!reportLink) {
    return
  }

  await router.replace({path: '/', query: {input: reportLink.value}})
  load()
}
</script>

<template>
  <transition name="fade" mode="out-in">
    <div class="loader" v-if="fetching">
      <div class="loader-circle">
      </div>
    </div>
    <div class="ok" v-else-if="!fetching && !!report">
      <component :is="parser?.comps.messageList" :report="report" :parser="parser" />
    </div>
    <div class="no-fetched" v-else>
      <div class="content">
        <h1>Aucun fichier selectionné !</h1>
        <form @submit.prevent="update">
          <input placeholder="Lien du rapport" v-model="reportLink"/>
          <button type="submit">Valider</button>
        </form>
      </div>
    </div>
  </transition>
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

.no-fetched {
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    grid-gap: 1rem;

    width: 30rem;

    h1 {
      font-size: 1.75rem;
      font-weight: bold;
    }

    form {
      width: 100%;
      display: grid;
      grid-template-columns: 5fr 2fr;
      grid-gap: 1rem;
    }

    input {
      color: colors.$white;
      background-color: colors.$quite-black;
      border: none;
      outline: none;

      padding: .5rem 1rem;
      border-radius: .5rem;
    }

    button {
      color: colors.$white;
      background-color: colors.$blue;
      border: none;
      outline: none;

      padding: .5rem 1rem;
      border-radius: .5rem;
    }
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
