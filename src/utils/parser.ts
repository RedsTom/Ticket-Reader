import { MessageModel, ReportModel, UserType } from '@/models/report'
import { DefineComponent } from 'vue'
import parserV1 from '@/utils/parser.v1'
import parserV2 from '@/utils/parser.v2'

export interface Parser<T extends ReportModel> {
  version: number;
  parse: (content: object) => T;
  messageType (message: MessageModel): UserType;
  filterOutModeration(report: T): T;
  comps: {
    avatar: DefineComponent,
    embed: DefineComponent,
    message: DefineComponent,
    messageList: DefineComponent,
    navbar: DefineComponent
  }
}

export const parsers: {[key: number]: Parser<any>} = {
  1: parserV1,
  2: parserV2
}

export default function parse<T extends ReportModel> (data: object & { version: number }): { parser: Parser<T>, data: T } {
  const parser = parsers[data.version]
  return {
    parser: parser,
    data: parser.parse(data)
  }
}
