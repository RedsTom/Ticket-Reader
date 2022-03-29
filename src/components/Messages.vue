<template>
  <div class="messages">
    <div
      class="message"
      v-for="message in messages"
      :key="JSON.stringify(message)"
    >
      <div class="avatar" :style="{'--url': 'url(' + message.author.avatarUrl + ')'}" />
      <div class="side">
        <div class="author-container">
          <p class="author">{{ message.author.name }}</p>
          <div class="badge" :class="{mod: message.messageType === 'MODERATION'}">
            {{ message.messageType === 'MODERATION' ? 'Mod' : 'Correspondant' }}
          </div>
          <span class="timestamp">
            Le {{ dateOf(message.creationTimestamp) }}
            </span>
        </div>
        <p class="content" v-html="marked(message.content)"></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as moment from 'moment';
import * as marked from 'marked';

interface Message {
  author: {
    id: number;
    name: string;
    avatarUrl: string;
  };
  creationTimestamp: Date;
  content: string;
  attachementUrls: string[];
  edited: boolean;
  messageType: 'MODERATION' | 'TARGET';
}

@Component({})
export default class Messages extends Vue {
  get messages(): Message[] {
    return this.$store.getters.getTicket.messages;
  }

  // eslint-disable-next-line class-methods-use-this
  dateOf(timestamp: number): string {
    return moment(timestamp).format('DD/MM/YYYY à HH:mm:SS');
  }

  // eslint-disable-next-line class-methods-use-this
  marked(text: string): string {
    return marked.parse(text);
  }
}
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  padding: 1rem;

  grid-gap: 1rem;

  &:hover {
    background-color: darken($bg, 5%);
  }
}

.badge {
  padding: .25rem .5rem;
  border-radius: .25rem;
  background-color: $green;
  font-size: .75rem;

  cursor: default;

  &.mod {
    background-color: $cyan;
  }
}

.author-container {
  display: flex;
  align-items: flex-end;
  grid-gap: .5rem;

  .author {
    font-weight: 600;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}

.side {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  grid-gap: .5rem;
}
.avatar {
  width: 48px;
  height: 48px;
  min-width: 48px;
  min-height: 48px;

  border-radius: 50%;

  background-color: darken($bg, 5%);
  background-image: var(--url);

  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
.timestamp {
  font-size: .8rem;
  color: lighten($bg, 40%);
}
</style>
