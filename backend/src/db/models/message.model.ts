export enum MessageType {
  TEXT = 'text',
  STICKER = 'sticker',
  VOICE = 'voice'
}

export class Message {
  iduserfrom: string;
  iduserto: string;
  message: string;
  messagetype: MessageType;
  isedited: boolean;
  sentdate: Date;
}