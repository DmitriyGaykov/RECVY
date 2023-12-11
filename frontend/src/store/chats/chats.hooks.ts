import {useAppSelector} from "../hooks.ts";

export const useStoreCurrentChat = () => useAppSelector(state => state.chats.current);
export const useStoreChats = () => useAppSelector(state => state.chats.chats);
export const useStoreToChat = () => useAppSelector(state => state.chats.toChat);