import {MessageType} from "../../models";
import {useEffect, useState} from "react";

export const useMessageDesc = (message: string, messagetype: MessageType) : string => {
  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    switch (messagetype) {
      case MessageType.text:
        setLastMessage(message);
        break;
      case MessageType.sticker:
        setLastMessage('Sticker ☻');
        break;
      case MessageType.voice:
        setLastMessage('Voice message...');
        break;
    }
  }, []);

  return lastMessage as const;
}