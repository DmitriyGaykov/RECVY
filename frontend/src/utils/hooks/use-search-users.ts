import {ReturnUseGet} from "./use-friends.ts";
import {User} from "../../models";
import {
  clearUsers, setStoreUsers,
  useAppDispatch, useLazyGetUsersQuery, useStoredUsers
} from "../../store";
import {usePages} from "./use-pages.ts";
import {useEffect, useState} from "react";

export const useSearchUsers = (searchText: string): ReturnUseGet<User> => {
  const dispatch = useAppDispatch();

  const {page, getYet, isAllData, setIsAllData, setDefault} = usePages();
  const [refetch, {data, error, isLoading}] = useLazyGetUsersQuery();
  const [users, setUsers] = useState<User[]>([]);

  const storedUsers = useStoredUsers();
  const getSubscribers = () => {
    refetch({page, searchText}).then(resp => {
      data && resp.data == data && setUsers([...data])
    });
  }
  const reset = () => {
    setDefault();
    dispatch(clearUsers());
  }

  useEffect(() => {
    if (error || !data) return;
    if (data.length === 0) setIsAllData(true);
    setUsers(data);
  }, [data, error]);

  useEffect(() => {
    dispatch(setStoreUsers([...storedUsers, ...users]));
    if (!isAllData) getYet();
  }, [users]);

  return [storedUsers, getSubscribers, reset, {isLoading, isAllData}];
}