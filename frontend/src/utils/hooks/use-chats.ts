import {useCallback, useEffect, useState} from "react";
import {RedirectChatBlockProps} from "../../entities";
import {
  setCurrentChat,
  setStoreChats,
  setToChat,
  useAppDispatch,
  useGetChatsQuery,
  useStoreChats,
  useStoreCurrentChat,
  useStoreToChat,
} from "../../store";
import {RemoveCallback} from "./use-remove-chat.ts";
import {usePages} from "./use-pages.ts";
import {useDefaultChat} from "./use-default-chat.ts";

export const useChats = () => {
  const dispatch = useAppDispatch();
  const storeChats = useStoreChats();
  const defaultChat = useDefaultChat();
  const chatTo = useStoreToChat();

  const {page, getYet, setDefault, isAllData, setIsAllData} = usePages();
  const [chats, setChats] = useState<RedirectChatBlockProps[]>([]);

  const {data, error} = useGetChatsQuery(page);

  useEffect(() => {
    if (!(!error && data)) return;
    if (!data.length) return setIsAllData(true);
    setChats([...chats, ...data]);

    page < 1 && getYet();
  }, [data, error]);

  useEffect(() => {
    if (chats == null) return;
    const chatsWithoutDefault = chats.filter((el) => !("isDefault" in el));
    const _chats = chatsWithoutDefault.length > 0 ? chatsWithoutDefault : chats;
    dispatch(setStoreChats(_chats));

    const id = _chats?.[0]?.iduserto;
    if (!chatTo && id) dispatch(setCurrentChat(id));
    else chatTo && dispatch(setCurrentChat(chatTo));
  }, [chats]);

  useEffect(() => {
    if (chats?.length > 0 || !defaultChat) return;
    setChats([defaultChat]);
  }, [defaultChat]);

  useEffect(() => {
    return () => {
      dispatch(setCurrentChat(null));
      dispatch(setStoreChats(null));
      dispatch(setToChat(null));
      setDefault();
    };
  }, []);

  const onDell: RemoveCallback = useCallback((iduserto?: string) => {
      setChats(chats.filter((chat) => chat.iduserto !== iduserto));
    }, [chats]);

  return {chats: storeChats, onDell, getYet, isAllData};
};
