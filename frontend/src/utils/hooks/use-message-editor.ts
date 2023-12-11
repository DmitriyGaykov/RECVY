import {Message} from "../../models";
import {
  editMessage,
  EditMessageParams,
  useAppDispatch,
  useEditMessageMutation,
  useUpdateMessageSocket
} from "../../store";
import {MyTextMessageCallback} from "../../entities";
import {useCallback, useEffect, useState} from "react";
import {Callback} from "./use-messages.ts";
import {encrypt} from "../cryptor";

export const useMessageEditor = (message: Message, cb?: Callback) => {
  const dispatch = useAppDispatch();

  const [edit] = useEditMessageMutation();
  const [content, setContent] = useState("");

  const socketUpdate = useUpdateMessageSocket();

  const onTextChange = useCallback(value => {
    setContent(value);
  })

  const onEdit = async () => {
    try {
      const editObj: EditMessageParams = {
        messageid: message.messageid,
        newValue: encrypt(content, [message.iduserfrom, message.iduserto])
      };

      const res = await edit(editObj);
      if(res.error) return;

      dispatch(editMessage(editObj));
      socketUpdate({
        ...message,
        message: editObj?.newValue,
        isedited: true
      });

      typeof cb === 'function' && cb(editObj);
    } catch (e: unknown) {
      console.log(e);
    }
  }

  return {onEdit, onTextChange};
}