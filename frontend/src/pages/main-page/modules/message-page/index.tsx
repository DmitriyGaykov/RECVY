import {FC} from "react";
import {RedirectChatBlock} from "../../../../entities";
import {useChats, useOnChat} from "../../../../utils";

export const MessagePage : FC = () => {
  const chats = useChats();
  const onChat = useOnChat();
  return (
    <div className="w-100 flex-1 d-flex">
      <div className="users-wrapper page-left-side p-2 min-width-300 header-color d-flex flex-column justify-content-start gap-2">
        {
          chats?.map(chat => {
            return (
              <RedirectChatBlock key={chat.iduserto} {...chat} onClick={onChat} />
            )
          })
        }
      </div>
    </div>
  );
}