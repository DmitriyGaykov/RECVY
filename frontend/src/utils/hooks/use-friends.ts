import {usePages} from "./use-pages.ts";
import {useEffect, useState} from "react";
import {
  clearFriends,
  setFriends as setStoreFriends,
  useAppDispatch, useLazyGetFriendsOfQuery,
  useStoreFriends
} from "../../store";
import {User} from "../../models";

export type ReturnUseGet<T> = [
  T[],
  () => void,
  () => void,
  {
    isLoading: boolean,
    isAllData: boolean
  }
];

export const useFriendsOf = (of: string, searchText: string): ReturnUseGet<User> => {
  const dispatch = useAppDispatch();

  const {page, getYet, isAllData, setIsAllData, setDefault} = usePages();
  const [refetch, {data, error, isLoading}] = useLazyGetFriendsOfQuery();
  const [friends, setFriends] = useState<User[]>([]);

  const storeFriends = useStoreFriends();

  const getFriends = () => {
    refetch({of, page, searchText}).then(resp => data && resp.data == data && setFriends([...data]));
  }
  const reset = () => {
    setDefault();
    dispatch(clearFriends());
  }

  useEffect(() => {
    return reset;
  }, [of])

  useEffect(() => {
    if (error || !data) return;
    if (data.length === 0) setIsAllData(true);
    setFriends(data);
  }, [data, error]);

  useEffect(() => {
    dispatch(setStoreFriends([...storeFriends, ...friends]));
    if (!isAllData)
      getYet();
  }, [friends]);

  return [storeFriends, getFriends, reset, {isLoading, isAllData}];
}