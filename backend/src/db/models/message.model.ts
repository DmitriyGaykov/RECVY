export enum MessageType {
  TEXT = 'text',
  STICKER = 'sticker',
  VOICE = 'voice'
}

export class Message {
  messageid: string;
  iduserfrom: string;
  iduserto: string;
  message: string;
  messagetype: MessageType;
  isedited: boolean;
  sentdate: Date;
}