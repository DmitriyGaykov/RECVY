import {ReturnUseGet} from "./use-friends.ts";
import {User} from "../../models";
import {
  clearSubscribers,
  setStoreSubscribers,
  useAppDispatch, useLazyGetSubscribersOfQuery,
  useStoreSubscribers
} from "../../store";
import {usePages} from "./use-pages.ts";
import {useEffect, useState} from "react";

export const useSubscribersOf = (of: string, searchText: string) : ReturnUseGet<User> => {
  const dispatch = useAppDispatch();

  const {page, getYet, isAllData, setIsAllData, setDefault} = usePages();
  const [refetch, { data, error, isLoading}] = useLazyGetSubscribersOfQuery();
  const [subscribers, setSubscribers] = useState<User[]>([]);

  const storeSubscribers = useStoreSubscribers();
  const getSubscribers = () => {
    refetch({of, page, searchText}).then(resp => data && resp.data == data && setSubscribers([...data]));
  }
  const reset = () => {
    setDefault();
    dispatch(clearSubscribers());
  }

  useEffect(() => {
    return reset;
  }, [of]);

  useEffect(() => {
    if(error || !data) return;
    if(data.length === 0) setIsAllData(true);
    setSubscribers(data);
  }, [data, error]);

  useEffect(() => {
    dispatch(setStoreSubscribers([...storeSubscribers, ...subscribers]));
    if(!isAllData) getYet();
  }, [subscribers]);

  return [storeSubscribers, getSubscribers, reset, {isLoading, isAllData}];
}