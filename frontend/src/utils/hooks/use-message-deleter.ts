import {Message} from "../../models";
import {removeMessage, useAppDispatch, useDeleteMessageMutation, useDeleteMessageSocket} from "../../store";
import {RemoveCallback} from "./use-remove-chat.ts";

export const useMessageDeleter = (message: Message, cb?: RemoveCallback) => {
  const dispatch = useAppDispatch();
  const [doDelete] = useDeleteMessageMutation();

  const dellMessage = useDeleteMessageSocket();

  const deleteMessage = async () => {
    try {
      await doDelete(message.messageid);
      dispatch(removeMessage(message.messageid));
      dellMessage(message);
      typeof cb === 'function' && cb();
    } catch (e: unknown) {
      console.log(e);
    }
  }

  return deleteMessage
}