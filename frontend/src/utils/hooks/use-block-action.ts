import {useBlockUserMutation, useUnBlockUserMutation} from "../../store";
import {useCallback} from "react";

export type UseBlockActionArgs = {
  onBlocked?: (userid: string, reason: string) => void;
  onUnblock?: () => void;
}

export const useBlockAction = ({onBlocked, onUnblock}: UseBlockActionArgs) => {
  const [blockMutation] = useBlockUserMutation();
  const [unblockMutation] = useUnBlockUserMutation();

  const onSuccess = (
    resp, cb: (...params: unknown[]) => void, params: unknown[] = []) => {
    if (resp.error) return;
    cb?.(...params);
  }

  const block = async (userid: string) => {
    const reason = prompt('Причина блокировки:');
    const resp = await blockMutation?.({userid, reason});
    onSuccess(resp, onBlocked, [userid, reason]);
  };

  const unblock = async (userid: string) => {
    const resp = await unblockMutation(userid);
    onSuccess(resp, onUnblock)
  }

  return {block, unblock};
}