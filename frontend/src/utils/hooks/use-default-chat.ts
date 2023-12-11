import {useCurrentStoreUser, useGetChatQuery} from "../../store";
import {useEffect, useState} from "react";
import {RedirectChatBlockProps} from "../../entities";
import {MessageType} from "../../models";

export const useDefaultChat = () => {
  const user = useCurrentStoreUser();

  const [defaultChat, setDefaultChat] = useState<RedirectChatBlockProps | null>(null);

  useEffect(() => {
    if(!user) return;

    const chat: RedirectChatBlockProps = {
      iduserto: user.id,
      photo: user.photos?.at(-1),
      firstname: user.firstname,
      sentdate: new Date(),
      messagetype: MessageType.text,
      lastmessage: ''
    };

    chat.isDefault = true;

    setDefaultChat(chat)
  }, [user]);

  return defaultChat;
}