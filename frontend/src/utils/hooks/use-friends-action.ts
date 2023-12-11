import {useCallback} from "react";
import {useRelationUpdate} from "./use-relation-update.ts";
import {useAddFriendMutation, useAppDispatch, useRemoveFriendMutation} from "../../store";

export const useFriendsAction = (whom: string) => {
  const [addFriendMutation] = useAddFriendMutation();
  const [removeFriendMutation] = useRemoveFriendMutation();
  const update = useRelationUpdate();

  const success = (res) => {
    if ('error' in res) return;
    update();
  }

  const addFriend = useCallback(async () => {
    const res = await addFriendMutation(whom);
    success(res);
  }, [whom]);

  const removeFriend = useCallback(async () => {
    const res = await removeFriendMutation(whom);
    success(res);
  }, [whom])

  return {
    addFriend,
    removeFriend
  }
}