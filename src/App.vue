<template>
  <div id="app">
    <navbar />
    <div class="content">
      <User :user="ticket.to"/>
      <Messages :messages="ticket.messages" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Navbar from './components/Navbar.vue';
import User from './components/User.vue';
import Messages from './components/Messages.vue';

import 'normalize.css/normalize.css';

@Component({
  name: 'App',
  components: { Navbar, User, Messages },
})
export default class App extends Vue {
  mounted() {
    this.$store.dispatch('updateTicket', JSON.parse(localStorage.getItem('ticket') ?? '{}'));
  }

  get ticket() {
    return this.$store.getters.getTicket;
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

a {
  color: $cyan !important;
}

body {
  max-width: 100vw;
  overflow-x: hidden;
}

#app {
  font-family: 'Poppins', sans-serif;
  background-color: $bg;
  color: $white;

  min-width: 100vw;
  min-height: 100vh;

  .content {
    width: 100%;
    height: 100%;

    position: relative;
  }
}
</style>
