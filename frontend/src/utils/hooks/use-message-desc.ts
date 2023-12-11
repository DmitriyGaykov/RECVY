import {MessageType} from "../../models";
import {useEffect, useState} from "react";
import {decrypt} from "../cryptor";

export const useMessageDesc = (message: string, messagetype: MessageType) : string => {
  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    switch (messagetype) {
      case MessageType.text:
        setLastMessage(message);
        break;
      case MessageType.sticker:
        setLastMessage('Стикер 😁');
        break;
      case MessageType.voice:
        setLastMessage('Голосовое 🎤');
        break;
    }
  }, [message, messagetype]);

  return lastMessage as const;
}