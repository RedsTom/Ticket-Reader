<template>
  <div class="user" v-if="!!user">
    <div class="content">
      <div class="info">
        <div class="img" :style="{'--url': 'url(' + avatarUrl + ')'}" id="avatar"/>
        <div class="text">
          <h2>{{ name }}</h2>
          <h3>{{ id }}</h3>
        </div>
      </div>
      <div class="actions">
        <Btn text="Supprimer" @click="deleteIt()" class="btn"/>
      </div>
    </div>

    <label>
      <input type="checkbox" id="show-mod" v-model="showAll">
      Afficher les messages de la modération
    </label>
  </div>
  <div class="user none" v-else>
    <h2>Aucun utilisateur sélectionné</h2>
    <div class="right">
      <input
        type="file"
        accept="application/JSON"
        name="select-file"
        id="select-file"
        v-show="false"
        ref="fileInput"
        @change="changeFile"
      />
      <Btn text="Sélectionnez un fichier" @click="selectFile()" style="width: 100%"/>
      <p>ou</p>
      <form @submit="submitUrl">
        <input v-model="url" type="url" placeholder="URL du fichier"/>
        <Btn text="Charger l'url" type="submit"/>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import Btn from './Button.vue';

interface UserModel {
  id: number;
  name: string;
  avatarUrl: string;
}

@Component({ components: { Btn } })
export default class User extends Vue {
  @Prop({})
  private user!: UserModel;

  private content = '';

  private url = '';

  private showAll = true;

  @Watch('showAll')
  showAllWatcher() {
    this.$store.dispatch('updateFilter', this.showAll ? 'ALL' : 'TRANSMITTED');
  }

  get name() {
    return this.user?.name || 'utilisateur';
  }

  get id() {
    return this.user?.id || 'XXXXXXXXXXXXXXXXXX';
  }

  get avatarUrl() {
    return this.user?.avatarUrl;
  }

  deleteIt() {
    this.$store.dispatch('updateTicket', {});
  }

  selectFile(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$refs.fileInput?.click();
  }

  // eslint-disable-next-line class-methods-use-this
  changeFile(e: InputEvent): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const file = e.target?.files[0];
    const reader = new FileReader();

    reader.onload = (ev: ProgressEvent<FileReader>) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore;
      this.content = ev.target?.result;
      this.$store.dispatch('updateTicket', JSON.parse(this.content));
    };

    reader.readAsText(file);
  }

  submitUrl(e: Event) {
    e.preventDefault();

    if (this.url.trim().length === 0) {
      alert('Le champ URL ne peut pas être vide !');
      return;
    }

    fetch(`https://cors.enimaloc.fr/${this.url}`)
      .then((res) => res.json())
      .then((json) => this.$store.dispatch('updateTicket', json))
      .catch((err) => alert(`Une erreur est survenue lors du chargement du fichier\n${err}`));
  }
}
</script>
<style lang="scss" scoped>
.user:not(.none) {
  padding: 1rem;
  flex-direction: column;
  align-items: flex-end;
}

label {
  user-select: none;

  input[type=checkbox] {
    width: 1rem;
    height: 1rem;
  }
}

.user, .content {
  position: fixed;
  top: 0;
  right: 0;
  min-width: 20rem;

  background: darken($bg, 5%);

  display: flex;
  align-items: center;
  border-radius: 0 0 0 1rem;
  grid-gap: 1rem;

  &.none {
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: relative;

    background: transparent;

    height: calc(100vh - 75px);

    .right {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      grid-gap: .5rem;
    }

    form {
      display: flex;
      grid-gap: 1rem;
      max-height: 3rem;
    }
  }

  .info {
    display: flex;
    grid-gap: 1rem;
  }

  .actions {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;
  }

  h2 {
    font-size: 1.25rem;
  }

  .img {
    height: 64px;
    width: 64px;
    border-radius: 50%;

    background-color: darken($bg, 10%);
    background-image: var(--url);

    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
  }

  h2 {
    font-weight: 800;
  }

  .btn {
    background-color: $red;

    &:hover {
      background-color: darken($red, 5%);
    }

    &:active {
      background-color: darken($red, 10%);
    }
  }

  form input {
    padding: 1rem;
    border-radius: .5rem;
    border: none;
    color: white;
    background: darken($bg, 20%);
  }
}

@media screen and (max-width: 800px) {
  .user {
    position: relative;

    .content {
      justify-content: space-between;
    }
  }
}
</style>
