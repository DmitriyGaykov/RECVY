import {RedirectChatBlock, RedirectChatBlockProps} from "../redirect-chat-block";
import React, {FC, useEffect} from "react";
import {useChats, useOnChat} from "../../utils";
import {ImageButton} from "../../components";
import addSvg from './../../assets/images/add.svg';

export const ChatsWrapper : FC = () => {
  const {chats, onDell, getYet, isAllData} = useChats();
  const onChat = useOnChat();

  return (
    <div
      className="users-wrapper page-left-side p-2 min-width-300 header-color">
      <div className="gap-2 d-flex flex-column justify-content-start scroll-container" style={{ height: '80vh' }}>
        {
          chats?.map(chat => <RedirectChatBlock key={chat.iduserto} {...chat} onClick={onChat} onDell={onDell}/>)
        }
        {
          !isAllData &&
          <ImageButton src={addSvg} onClick={getYet} className="width-height-30" />
        }
      </div>
    </div>
  )
}