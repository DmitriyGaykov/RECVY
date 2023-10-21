import { MessageType } from "./message.model";

export class Chat {
  iduserto: string;
  photo: string;
  firstname: string;
  lastmessage: string;
  messagetype: MessageType;
  sentdate: Date;
}