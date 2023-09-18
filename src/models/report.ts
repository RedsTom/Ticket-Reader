export interface FieldModel {}
export interface EmbedModel {}
export interface UserModel {}
export interface MessageModel {}
export interface ReportModel {
  version: number;
}

export type UserType = 'MODERATION' | 'TARGET' | 'BOT';
