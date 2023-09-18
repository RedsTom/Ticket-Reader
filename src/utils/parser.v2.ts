import { MessageModelV2, ReportModelV2 } from '@/models/report.v2'
import { UserType } from '@/models/report'
import AvatarV2 from '@/components/v2/AvatarV2.vue'
import EmbedV2 from '@/components/v2/EmbedV2.vue'
import MessageListV2 from '@/components/v2/MessageListV2.vue'
import MessageV2 from '@/components/v2/MessageV2.vue'
import NavbarV2 from '@/components/v2/NavbarV2.vue'
import { Parser } from '@/utils/parser'

export default <Parser<ReportModelV2>> {
  parse: (content: object) => {
    return content as ReportModelV2
  },
  messageType (message: MessageModelV2): UserType {
    return message.messageType
  },
  filterOutModeration (report: ReportModelV2): ReportModelV2 {
    return {
      ...report,
      messages: report.messages.filter(message => message.messageType !== 'MODERATION')
    }
  },
  comps: {
    avatar: AvatarV2,
    embed: EmbedV2,
    messageList: MessageListV2,
    message: MessageV2,
    navbar: NavbarV2
  }
}
