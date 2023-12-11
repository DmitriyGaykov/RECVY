import {updateOrAddChat, useAppDispatch, useCurrentStoreUser, useGetChatQuery} from "../../store";
import {RedirectChatBlockProps} from "../../entities";
import {useEffect, useState} from "react";
import {decryptFromChat} from "../cryptor";

export const useUpdateChat = (chatid : String) => {
  const dispatch = useAppDispatch();

  const {data, isError, refetch} = useGetChatQuery(chatid);
  const [chat, setChat] = useState<RedirectChatBlockProps>(null);
  const user = useCurrentStoreUser();

  useEffect(() => {
    refetch();
  }, [chatid]);

  useEffect(() => {
    setChat(data);
  }, [data, isError]);

  useEffect(() => {
    if(!chat) return;
    dispatch(updateOrAddChat(chat));
  }, [chat]);

  return refetch;
}