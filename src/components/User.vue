<template>
  <div class="user" v-if="!!user">
      <div class="img" :style="{'--url': 'url(' + avatarUrl + ')'}" id="avatar" />
      <div class="text">
        <h2>{{name}}</h2>
        <h3>{{id}}</h3>
      </div>
      <Btn text="Supprimer" @click="deleteIt()" class="btn"/>
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
        <Btn text="Sélectionner le fichier" @click="selectFile()" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
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

  private content!: string;

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
}
</script>
<style lang="scss" scoped>
.user {
  position: sticky;
  top: 0;
  float: right;
  min-width: 20rem;

  padding: 1rem;

  background-color: darken($bg, 5%);

  display: flex;
  align-items: center;
  border-radius: 0 0 0 1rem;
  grid-gap: 1rem;

  &.none {
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
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
}
</style>
