import { EmbedModel, FieldModel, MessageModel, ReportModel, UserModel } from '@/models/report'

export interface FieldModelV2 extends FieldModel {
  name: string;
  value: string;
  inline?: boolean;
}
export interface EmbedModelV2 extends EmbedModel {
  title?: string;
  description?: string;
  color?: number;
  fields?: FieldModelV2[];
  timestamp?: string;
  footer: {
    text: string;
    icon_url: string;
  }
}
export interface UserModelV2 extends UserModel {
  name: string;
  id: string;
  avatarUrl: string;
}
export interface MessageModelV2 extends MessageModel {
  author: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  creationTimestamp: number;
  content: string;
  attachmentUrls: string[];
  edited: boolean;
  messageType: 'MODERATION' | 'TARGET' | 'BOT';
  embeds: EmbedModelV2[];
}
export interface ReportModelV2 extends ReportModel {
  to: UserModelV2;
  messages: MessageModelV2[];
}
