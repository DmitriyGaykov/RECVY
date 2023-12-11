import * as CryptoJS from "crypto-js";
import { Message, MessageType } from "../../models";
import { RedirectChatBlockProps } from "../../entities";

const getKey = (keys?: string[]) => {
  return !keys
    ? process.env.REACT_APP_SECRET_KEY
    : `${keys[0]}${import.meta.env.REACT_APP_SECRET_KEY}${keys.join("")}`;
};

export const encrypt = (text: string, keys?: string[]) => {
  const secretKey = getKey(keys);
  return CryptoJS.AES.encrypt(text, secretKey).toString();
};

export const decrypt = (text: string, keys?: string[]) => {
  try {
    const secretKey = getKey(keys);
    return CryptoJS.AES.decrypt(text, secretKey).toString(CryptoJS.enc.Utf8);
  } catch {
    return text;
  }
};

export const decryptMessage = (message: Message): Message => {
  return message.messagetype === MessageType.text
    ? {
        ...message,
        message: decrypt(message.message, [
          message.iduserfrom,
          message.iduserto,
        ]),
      }
    : message;
};

export const decryptFromChat = (
  chat: RedirectChatBlockProps,
  myId: string
): RedirectChatBlockProps => {
  return chat.messagetype === MessageType.text
    ? {
        ...chat,
        lastmessage: decrypt(chat.lastmessage, [myId, chat.iduserto]),
      }
    : chat;
};
