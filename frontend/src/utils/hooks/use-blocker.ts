import {useEffect, useState} from "react";
import axios, {HttpStatusCode} from "axios";
import {SERVER_URL} from "./../../vite-env.d";
import {useLazyGetBlockReasonQuery} from "../../store";
import {useBlockAction} from "./use-block-action.ts";
import {useNoticeAboutBlock} from "./use-notice-about-block.ts";

export const useBlocker = (userid: string, onReason?: (string) => void) => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [reason, setReason] = useState<string | null>(null);
  const [refetch, setRefetch] = useState<unknown>({});
  const noticeAboutBlock = useNoticeAboutBlock();

  const [getBlockReason, state] = useLazyGetBlockReasonQuery();
  const {block, unblock} = useBlockAction({
    onBlocked: (userid, reason) => {
      setRefetch({});
      noticeAboutBlock({userid, reason});
    },
    onUnblock: () => {
      setRefetch({});
      setReason(null);
    }}
  );

  useEffect(() => {
    if (!userid) return;
    axios.head(SERVER_URL + '/api/admin/users', {
      params: {userid},
      withCredentials: true
    }).then(() => {
      getBlockReason(userid);
      setIsBlocked(true);
    }).catch(() => {
      setIsBlocked(false);
      setReason(null);
    })
  }, [userid, refetch]);

  useEffect(() => {
    if (state.error?.originalStatus !== HttpStatusCode.Ok) return;
    const data = state.error?.data;
    if (!data) return;
    setReason(data);
  }, [state]);

  useEffect(() => {
    onReason?.(reason);
  }, [reason])

  return {isBlocked, reason, block, unblock};
}