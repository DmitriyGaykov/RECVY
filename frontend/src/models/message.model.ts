export interface Message {
  iduserfrom: string;
  iduserto: string;
  message: string;
  messagetype: MessageType;
  isedited: boolean;
  sentdate: Date;
}

export enum MessageType {
  text = 'text',
  sticker = 'sticker',
  voice = 'voice'
}