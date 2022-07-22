export interface FieldModel {
  name: string;
  value: string;
  inline?: boolean;
}
export interface EmbedModel {
  title?: string;
  description?: string;
  color?: number;
  fields?: FieldModel[];
  timestamp?: string;
}
export interface UserModel {
  name: string;
  id: string;
  avatarUrl: string;
}
export interface MessageModel {
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
  embeds: {
    title?: string;
    description?: string;
    color?: number;
    fields?: {
      name: string;
      value: string;
      inline?: boolean;
    }[];
    timestamp?: string;
  }[];
}
export interface ReportModel {
    version: number;
    to: UserModel;
    messages: MessageModel[];
}
