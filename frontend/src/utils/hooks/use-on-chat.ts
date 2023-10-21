import {ChatId, setCurrentChat, useAppDispatch} from "../../store";
import {useCallback} from "react";

export const useOnChat = () => {
  const dispatch = useAppDispatch();
  return useCallback((id: ChatId) => {
    dispatch(setCurrentChat(id));
  }, []);
}