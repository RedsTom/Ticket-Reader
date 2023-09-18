<script setup lang="ts">
import {Parser} from "@/utils/parser";
import colorForUser from "@/utils/color";
import {ReportModelV1} from "@/models/report.v1";
import {computed, ref} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();

const props = defineProps<{
  parser: Parser<ReportModelV1>,
  report: ReportModelV1
}>()

const showStaff = ref(true);
const messages = computed(() => {
  if (showStaff.value) {
    return props.report.messages;
  }

  return props.parser.filterOutModeration(props.report).messages;
})

const cancel = () => {
  location.replace(route.path)
}
</script>

<template>
  <component
    :is="props.parser.comps.navbar"
    :parser="parser"

    :user="report.to"
    v-model:show="showStaff"
    @cancel-user="cancel"
  />
  <div class="messages">
    <component
      :is="props.parser.comps.message"
      :parser="parser"

      v-for="message in messages"
      :key="JSON.stringify(message)"
      :message="message"
      :color-class="colorForUser(parser?.messageType(message) ?? 'MODERATION')"
    />
  </div>
</template>
