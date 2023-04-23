<script lang="ts" setup>
import { EmbedModel, FieldModel } from '@/models/report'
import { sanitize } from 'dompurify'
import { marked } from 'marked'
import moment from 'moment'

interface Props {
  embed: EmbedModel
}
// eslint-disable-next-line no-undef
const p = defineProps<Props>()

const lines: FieldModel[][] = []

for (const field of (p.embed.fields || []) as FieldModel[]) {
  if (!field.inline || lines.length === 0) {
    lines.push([])
  }
  lines[lines.length - 1].push(field)
}

function toColor (num: number): string {
  num >>>= 0
  const b = num & 0xFF
  const g = (num & 0xFF00) >>> 8
  const r = (num & 0xFF0000) >>> 16
  return 'rgba(' + [r, g, b, 255].join(',') + ')'
}

console.log(p.embed.color)
const color = toColor(p.embed.color || 0xFFFFFF)
</script>

<template>
  <div class="embed">
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
      <img class="footer-image" :src="embed.footer.icon_url" alt="Image" v-if="embed.footer.icon_url">
      <span>{{ embed.footer.text }}</span>
      |
      <span>{{ moment(p.embed.timestamp).format('[Le] dddd DD MMMM YYYY [à] HH[:]mm[:]ss') }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/colors';

.embed {
  max-width: 50rem;
  width: fit-content;

  font-size: .8rem;

  display: flex;
  flex-direction: column;
  grid-gap: .5rem;
  padding: .75rem;

  border-radius: .5rem;

  background-color: colors.$quite-black;

  border-left: 3px v-bind(color) solid;

  .title {
    font-size: 1rem;
    font-weight: bold;
  }

  .description {}

  .fields {
    display: flex;
    flex-direction: column;

    .line {
      display: flex;
      flex-wrap: wrap;
      grid-gap: .25rem;

      .field {
        flex: 1 0 30%;
        display: flex;
        grid-gap: .25rem;
        flex-direction: column;
      }
    }
  }

  .footer {
    display: flex;
    align-items: center;
    gap: .25rem;

    .footer-image {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      margin-right: .25rem;
    }
  }
}
</style>
