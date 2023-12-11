import {useCallback} from "react";
import {
  clearPeople,
  setFriends, setStoreSubscribers,
  setStoreUsers,
  useAppDispatch,
  useStoredUsers,
  useStoreFriends,
  useStoreSubscribers
} from "../../store";

export const useRelationUpdate = () => {
  const dispatch = useAppDispatch();

  const users = useStoredUsers();
  const friends = useStoreFriends();
  const subs = useStoreSubscribers();

  return useCallback(() => {
    dispatch(clearPeople());
    dispatch(setStoreUsers([...users]));
    dispatch(setFriends([...friends]));
    dispatch(setStoreSubscribers([...subs]));
  }, [users, friends, subs, dispatch]);
}