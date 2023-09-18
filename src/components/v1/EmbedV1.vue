<script lang="ts" setup>
import sanitize from 'sanitize-html'
import {marked} from 'marked'
import moment from 'moment'
import {EmbedModelV1, FieldModelV1} from "@/models/report.v1";
import {Parser} from "@/utils/parser";
import {toColor} from "@/utils/utils";

interface Props {
  embed: EmbedModelV1,
  parser: Parser<any>
}
// eslint-disable-next-line no-undef
const p = defineProps<Props>()

const lines: FieldModelV1[][] = []

for (const field of (p.embed.fields ?? [])) {
  if (!field.inline || lines.length === 0) {
    lines.push([])
  }
  lines[lines.length - 1].push(field)
}

const color = toColor(p.embed.color ?? 0xFFFFFF)
</script>

<template>
  <div class="embed" :style="{borderLeftColor: color}">
    <div class="title" v-if="p.embed.title" v-html="sanitize(marked(p.embed.title))">
    </div>
    <div class="description" v-if="p.embed.description" v-html="sanitize(marked(p.embed.description))">
    </div>
    <div class="fields" v-if="lines.length != 0">
      <div class="line" v-for="line in lines" :key="JSON.stringify(line)">
        <div class="field" v-for="field in line" :key="JSON.stringify(field)">
          <div class="name" v-html="sanitize(marked(field.name))"></div>
          <div class="value" v-html="sanitize(marked(field.value))"></div>
        </div>
      </div>
    </div>
    <div class="footer" v-if="p.embed.timestamp">
      <img class="footer-image" :src="embed.footer.icon_url" alt="Image" v-if="embed.footer?.icon_url">
      <span>{{ embed.footer?.text }}</span>
      |
      <span>{{ moment(p.embed.timestamp).format('[Le] dddd DD MMMM YYYY [à] HH[:]mm[:]ss') }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped src="@/styles/components/embed.scss" />
