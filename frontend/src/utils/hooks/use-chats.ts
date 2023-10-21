import {useEffect, useState} from "react";
import {RedirectChatBlockProps} from "../../entities";
import {useGetChatsQuery} from "../../store";

export const useChats = () : RedirectChatBlockProps => {
  const [page, setPage] = useState<number>(0);
  const [chats, setChats] = useState<RedirectChatBlockProps[]>([])

  const {data, error} = useGetChatsQuery(page);

  useEffect(() => {
    if(!error && data) {
      setChats([...chats, ...data]);
      data.length && setPage(page + 1);
    }
  }, [data, error]);

  return chats;
}