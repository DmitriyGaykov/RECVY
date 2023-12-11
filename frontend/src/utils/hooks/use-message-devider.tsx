import {useAppSelector, useGetUserQuery} from "../../store";
import {useEffect, useState} from "react";
import {Message, MessageType} from "../../models";
import {
  FriendStickerMessage,
  FriendTextMessage,
  FriendVoiceMessage,
  MyStickerMessage,
  MyTextMessage, MyTextMessageCallback,
  MyVoiceMessage
} from "../../entities";

export const useMessageDevider = (message: Message, onMyTextMessageChange?: MyTextMessageCallback) => {
  const current = useAppSelector(state => state.users.current);
  const friendId = useAppSelector(state => state.chats.current);
  const { data: friend } = useGetUserQuery(friendId);

  const [isMy] = useState(message.iduserfrom === current.id);
  const [MsgElement, setMsgElement] = useState(<></>);

  useEffect(() => {
    if(isMy && message.messagetype === MessageType.text) {
      setMsgElement(<MyTextMessage {...message} user={current} onChange={onMyTextMessageChange} />)
    } else if(isMy && message.messagetype === MessageType.sticker) {
      setMsgElement(<MyStickerMessage {...message} user={current} />)
    } else if(isMy && message.messagetype === MessageType.voice) {
      setMsgElement(<MyVoiceMessage {...message} user={current}/>)
    } else if(!isMy && message.messagetype === MessageType.text) {
      setMsgElement(<FriendTextMessage {...message} user={friend} />)
    } else if(!isMy && message.messagetype === MessageType.voice) {
      setMsgElement(<FriendVoiceMessage {...message} user={friend} />)
    } else if(!isMy && message.messagetype === MessageType.sticker) {
      setMsgElement(<FriendStickerMessage { ...message } user={friend}/>)
    }
  }, [isMy, onMyTextMessageChange, message])

  return {MsgElement, isMy}
}