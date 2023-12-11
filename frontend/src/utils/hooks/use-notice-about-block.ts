import {useSocket} from "../../store";
import {useCallback} from "react";

export type UseNoticeAboutBlockArgs = {
  userid: string;
  reason: string;
}
export const useNoticeAboutBlock = () => {
  const socket = useSocket();
  return (info: UseNoticeAboutBlockArgs) => {
    socket?.emit('block-user', info);
  }
}