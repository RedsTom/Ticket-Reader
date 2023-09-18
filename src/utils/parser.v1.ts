import { MessageModelV1, ReportModelV1 } from '@/models/report.v1'
import { UserType } from '@/models/report'
import AvatarV1 from '@/components/v1/AvatarV1.vue'
import EmbedV1 from '@/components/v1/EmbedV1.vue'
import MessageListV1 from '@/components/v1/MessageListV1.vue'
import MessageV1 from '@/components/v1/MessageV1.vue'
import NavbarV1 from '@/components/v1/NavbarV1.vue'
import { Parser } from '@/utils/parser'

export default <Parser<ReportModelV1>> {
  parse: (content: object) => {
    return content as ReportModelV1
  },
  messageType (message: MessageModelV1): UserType {
    if (message.messageType === 'TARGET') {
      return 'TARGET'
    } else {
      if (message.author.id == '804866779519516700') {
        return 'BOT'
      }
      if (message.author.id == '1126550239030030386') {
        return 'BOT'
      }

      return 'MODERATION'
    }
  },
  filterOutModeration (report: ReportModelV1): ReportModelV1 {
    return {
      ...report,
      messages: report.messages.filter(message => this.messageType(message) !== 'MODERATION')
    }
  },
  comps: {
    avatar: AvatarV1,
    embed: EmbedV1,
    messageList: MessageListV1,
    message: MessageV1,
    navbar: NavbarV1
  }
}
