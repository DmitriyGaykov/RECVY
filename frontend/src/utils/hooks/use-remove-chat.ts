import {useRemoveChatMutation} from "../../store";
import {useCallback} from "react";

export type RemoveCallback = (...args?: any) => void;

export const useRemoveChat = (chatId, cb?: RemoveCallback) => {
  const [removeChat, { isError }] = useRemoveChatMutation();

  const remove = useCallback(async () => {
    try {
      await removeChat(chatId);
      typeof cb === 'function' && cb(chatId);
    } catch {
      return;
    }
  }, []);

  return remove;
}