export interface Message {
  messageid: string;
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