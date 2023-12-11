import {useCallback} from "react";
import {useSubscribe} from "./use-subscribe.ts";
import {useFriendsAction} from "./use-friends-action.ts";

export type UseRelationActionParams = {
  who: string;
  whom: string;
}
export const useRelationAction = ({ who, whom } : UseRelationActionParams) => {
  const { subscribe, describe } = useSubscribe(whom);
  const { addFriend, removeFriend } = useFriendsAction(whom);

  return {
    subscribe,
    describe,
    addFriend,
    removeFriend
  }
}