import React, {FC} from "react";
import {ChatsWrapper, MessageWrapper} from "../../../../entities";
import {useAppSelector} from "../../../../store";

export const MessagePage: FC = () => {
  const current = useAppSelector(state => state.chats.current);

  return (
    <div className="w-100 flex-1 d-flex">
      <ChatsWrapper />
      {
        current && <MessageWrapper/>
      }
    </div>
  );
}