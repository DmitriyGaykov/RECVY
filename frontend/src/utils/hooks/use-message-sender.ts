import {useCallback, useEffect, useState} from "react";
import {Message, MessageType} from "../../models";
import {
  useAppSelector,
  useSaveVoiceMutation,
  useSendMessageMutation,
  useSendMessageToSocket
} from "../../store";
import {useVoice} from "./use-voice.ts";
import {encrypt} from "../cryptor";

export const useMessageSender = (onSended: (message: Message) => void) => {
  const [sendMessage, {data}] = useSendMessageMutation();
  const [saveVoiceMessage] = useSaveVoiceMutation();

  const [message, setMessage] = useState<Message | null>(null);
  const [finishMessage, setFinishMessage] = useState<Message | null>(null);

  useSendMessageToSocket(finishMessage, () => setFinishMessage(null));

  const currentChat = useAppSelector(state => state.chats.current);
  const {id} = useAppSelector(state => state.users.current);

  const [voice, setVoice] = useState<Blob | null>(null);

  const onStickerMessage = useCallback((stickerid: string) => {
    const message: Message = {
      message: stickerid,
      messagetype: MessageType.sticker,
      iduserfrom: id,
      iduserto: currentChat
    };

    setMessage(message);
  }, [currentChat, id]);
  const onTextMessage = useCallback((message: string) => {
    if(message === "" || message.trim().length === 0) return;

    const messageObj: Message = {
      message: encrypt(message, [id, currentChat]),
      messagetype: MessageType.text,
      iduserfrom: id,
      iduserto: currentChat
    };

    setMessage(messageObj);
  }, [currentChat, id]);

  const onVoice = useCallback((buffer: Blob) => {
    const message : Message = {
      message: 'voice message',
      messagetype: MessageType.voice,
      iduserfrom: id,
      iduserto: currentChat
    };

    setVoice(buffer);
    setMessage(message);
  }, [currentChat, id])

  const { onVoiceMessage, wasRecordingStarted } = useVoice(onVoice);

  useEffect(() => {
    sendMessage(message);
  }, [message]);

  useEffect(() => {
    if(!data) return;

    const message : Message = data;

    if(message.messagetype === MessageType.voice) {
      const formData = new FormData();
      formData.append('audio', voice as Blob);
      saveVoiceMessage({
        formData,
        messageid: message.messageid
      });
    }

    typeof onSended === 'function' && onSended(data);
    setMessage(null);
    setFinishMessage(message);
  }, [data])

  return {onStickerMessage, onTextMessage, onVoiceMessage, wasRecordingStarted}
}