<template>
  <div class="messages">
    <div
      class="message"
      :class="{
        sendCandidate: message.content.startsWith('\'') || message.author.id === 804866779519516713,
        received: message.messageType === 'TARGET'
    }"
      v-for="message in messages"
      :key="JSON.stringify(message)"

      v-if="showAll || message.messageType === 'TARGET' || message.content.startsWith('\'')"
    >
      <div class="avatar" :style="{'--url': 'url(' + message.author.avatarUrl + ')'}"/>
      <div class="side">
        <div class="author-container">
          <div class="name">
            <p class="author">{{ message.author.name }}</p>
            <div class="badge"
                 :class="{
              mod: message.messageType === 'MODERATION' && message.author.id !== 804866779519516713,
              bot: message.author.id === 804866779519516713
              }">
              {{
                message.messageType === 'MODERATION'
                  ? (message.author.id === 804866779519516713
                    ? 'Bot'
                    : 'Mod')
                  : 'Correspondant'
              }}
            </div>
          </div>
          <span class="timestamp">
            Le {{ dateOf(message.creationTimestamp) }}
            </span>
        </div>
        <p class="content" v-html="marked(message.content)">
        </p>
        <p class="content sent"
           v-if="message.author.id === 804866779519516713 && marked(message.content).length === 0">
          📤 Message envoyé (probablement)
        </p>
        <div class="buttons">
          <a v-for="attachement in Object.entries(message.attachementUrls)"
             :key="attachement[1]"
             :href="attachement[1]" target="_blank">
            Attachement {{ attachement[0] }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import moment from 'moment';
import { marked } from 'marked';
import Button from '@/components/Button.vue';

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

@Component({
  components: { Button },
})
export default class Messages extends Vue {
  get messages(): Message[] {
    return this.$store.getters.getTicket.messages;
  }

  get showAll(): boolean {
    return this.$store.getters.showAll;
  }

  // eslint-disable-next-line class-methods-use-this
  dateOf(timestamp: number): string {
    return moment(timestamp).format('DD/MM/YYYY à HH:mm:SS');
  }

  // eslint-disable-next-line class-methods-use-this
  marked(text: string): string {
    return marked(text);
  }

  open(url: string) {
    window.open(url);
  }
}
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  padding: .5rem 2rem .5rem .5rem;

  grid-gap: 1rem;

  &:hover {
    background-color: darken($bg, 5%);
  }

  &.sendCandidate {
    border-left: $green .5rem solid;
  }

  &.received {
    border-left: $cyan .5rem solid;
  }

  &:not(.sendCandidate):not(.received) {
    border-left: $red .5rem solid;
  }
}

.content {
  max-width: 90vw;
  text-align: justify;
}

.content ~ .content.sent {
  height: 0;
}

.content.sent {
  color: $green;
}

.badge {
  padding: .25rem .5rem;
  border-radius: .25rem;
  background-color: $cyan;
  font-size: .75rem;

  cursor: default;

  &.mod {
    background-color: $green;
  }

  &.bot {
    background-color: $red;
  }
}

.buttons {
  display: flex;
  grid-gap: .5rem;

  flex-wrap: wrap;
}

.author-container, .name {
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
  width: 36px;
  height: 36px;

  margin-top: .5rem;

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

@media screen and(max-width: 500px) {
  .author-container {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
