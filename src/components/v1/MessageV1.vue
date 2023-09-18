<script lang="ts" setup>
import moment from 'moment'
import {marked} from 'marked'
import * as sanitize from 'sanitize-html'
import {MessageModelV1} from "@/models/report.v1";
import {Parser} from "@/utils/parser";

interface Props {
  parser: Parser<any>,
  message: MessageModelV1,
  colorClass: string;
}

// eslint-disable-next-line no-undef
const p = defineProps<Props>()
</script>

<template>
  <div class="message" :class="{[p.colorClass]: true}">
    <component :is="parser.comps.avatar" :parser="parser" :url="p.message.author.avatarUrl" class="pp"/>
    <div class="right">
      <div class="user">
        <div class="username">{{ p.message.author.name }}</div>
        <div class="date">{{
            moment(p.message.creationTimestamp).format('[Le] dddd DD MMMM YYYY [à] HH[:]mm[:]ss')
          }}
        </div>
        <div class="id">{{ p.message.author.id }}</div>
      </div>
      <div class="content">
        <div class="text-content" v-html="sanitize(marked(p.message.content))">
        </div>
        <div class="embeds">
          <component :is="parser.comps.embed" :parser="parser" v-for="embed in p.message.embeds" :key="JSON.stringify(embed)"
                     :embed="embed"/>
        </div>
        <div class="attachments" v-if="p.message.attachementUrls.length > 0">
          <a
            class="attachment"
            v-for="att in Object.entries(p.message.attachementUrls)"
            :key="JSON.stringify(att[1])"
            :href="att[1]" :style="`--bg: url(${att[1]})`">
            <p>Pièce jointe #{{ att[0] }}</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="@/styles/components/message.scss"/>
