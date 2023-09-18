import { EmbedModel, FieldModel, MessageModel, ReportModel, UserModel } from '@/models/report'

export interface FieldModelV1 extends FieldModel {
  name: string;
  value: string;
  inline?: boolean;
}
export interface EmbedModelV1 extends EmbedModel {
  title?: string;
  description?: string;
  color?: number;
  fields?: FieldModelV1[];
  timestamp?: string;
  footer: {
    text: string;
    icon_url: string;
  }
}
export interface UserModelV1 extends UserModel {
  name: string;
  id: string;
  avatarUrl: string;
}

export interface MessageModelV1 extends MessageModel {
  author: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  creationTimestamp: number;
  content: string;
  attachementUrls: string[];
  edited: boolean;
  messageType: 'MODERATION' | 'TARGET';
  embeds: EmbedModelV1[];
}
export interface ReportModelV1 extends ReportModel {
  to: UserModelV1;
  messages: MessageModelV1[];
}
