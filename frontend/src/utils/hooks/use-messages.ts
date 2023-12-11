import { useEffect, useState} from "react";
import {useAppDispatch, useAppSelector, useGetMessagesFromQuery, setMessages as setStoreMessages} from "../../store";
import {Message} from "../../models";
import {usePages} from "./use-pages.ts";

export type Callback = (...args?: any) => void;
export type MessageCallback = {
  ondelete?: Callback;
  onedit?: Callback;
}

export const useMessages = () => {
  const dispatch = useAppDispatch();
  const state_messages = useAppSelector(state => state.messages.messages)

  const { page, getYet, isAllData, setIsAllData, setDefault } = usePages();

  const [messages, setMessages] = useState<Message[]>([]);
  const current = useAppSelector(state => state.chats.current);
  const {data} = useGetMessagesFromQuery({iduserto: current, page});

  const addMessage = (message: Message): void => {
    if(!message) return;
    setMessages([...messages, message]);
  }

  useEffect(() => {
    return () => {
      setMessages([]);
      setDefault();
    }
  }, [current]);

  useEffect(() => {
    if(!data) return;
    if(page === 0) {
      return data && setMessages(([...data].reverse()));
    }
    if(data?.length === 0) {
      setIsAllData(true);
      return;
    }
    data && setMessages([...[...data].reverse(), ...messages]);
  }, [data]);

  useEffect(() => {
    dispatch(setStoreMessages(messages));
  }, [messages])

  return {messages: state_messages, getYet, addMessage, isAllData};
}