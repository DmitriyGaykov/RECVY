import {useCallback, useEffect, useState} from "react";
import {RedirectChatBlockProps} from "../../entities";
import {setCurrentChat, useAppDispatch, useAppSelector, useGetChatsQuery} from "../../store";
import {RemoveCallback} from "./use-remove-chat.ts";

export const useChats = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector(state => state.chats.current);

  const [page, setPage] = useState<number>(0);
  const [chats, setChats] = useState<RedirectChatBlockProps[]>([])

  const {data, isError: error} = useGetChatsQuery(page);

  useEffect(() => {
    if(!error && data) {
      setChats([...chats, ...data]);
      data.length && setPage(page + 1);

      if(!current) {
        dispatch(setCurrentChat(data?.at(0)?.iduserto));
      }
    }

    return () => {
      setCurrentChat(null);
    }
  }, [data, error]);

  const onDell : RemoveCallback = useCallback((iduserto?: string) => {
    setChats(chats.filter(chat => chat.iduserto !== iduserto));
  }, [chats])

  return [chats, onDell];
}