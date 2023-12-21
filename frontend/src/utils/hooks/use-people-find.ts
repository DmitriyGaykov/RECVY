import {ChangeEventHandler, useEffect, useState} from "react";
import {User} from "../../models";
import {useFriendsOf} from "./use-friends.ts";
import {
  clearPeople,
  setPeople,
  useAppDispatch,
  useCurrentStoreUser,
  useGetOnlineUsers,
  useStoredPeople
} from "../../store";
import {useReset} from "./use-reset.ts";
import {useSubscribersOf} from "./use-subscribers.ts";
import {useSearchUsers} from "./use-search-users.ts";

export const usePeopleFind = () => {
  const people = useStoredPeople();
  const dispatch = useAppDispatch();

  const [isFriendsChecked, setIsFriendsChecked] = useState(false);
  const [isSubsChecked, setIsSubsChecked] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [isAll, setIsAllData] = useState(false);

  const {id} = useCurrentStoreUser();

  const [friends, getFriends, resetFriends, {isAllData: isAllFriends}] = useFriendsOf(id, searchText);
  const [subs, getSubs, resetSubs, {isAllData: isAllSubs}] = useSubscribersOf(id, searchText);
  const [users, getUsers, resetUsers, {isAllData}] = useSearchUsers(searchText);

  const reset = () => {
    dispatch(clearPeople());
    resetUsers();
    resetFriends();
    resetSubs();
    setIsAllData(false);
  }

  useReset(reset, [isFriendsChecked, isSubsChecked, isAllChecked]);

  useEffect(() => {
    setIsFriendsChecked(true);
    getFriends();
  }, []);

  const getYet = () => {
    if (isFriendsChecked && !isAllFriends) getFriends();
    if (isSubsChecked && !isAllSubs) getSubs();
    if (isAllChecked && !isAllData) getUsers();
  }

  useEffect(() => {
    if (isAllData) return;
    if (isAllFriends && isFriendsChecked) setIsAllData(true);
    if (isAllSubs && isSubsChecked) setIsAllData(true);
    if (isAllData && isAllChecked) setIsAllData(true);
  }, [isFriendsChecked, isSubsChecked, isAllChecked, isAllData, isAllFriends, isAllSubs]);

  useEffect(() => {
    !isAllSubs && isSubsChecked && dispatch(setPeople([...subs]));
    !isAllFriends && isFriendsChecked && dispatch(setPeople([...friends]));
    !isAllData && isAllChecked && dispatch(setPeople([...users]));
  }, [subs, friends, users]);

  const onFriends: ChangeEventHandler<HTMLInputElement> = event => {
    setIsFriendsChecked(event.target.checked);
    setIsAllChecked(!event.target.checked);
    setIsSubsChecked(!event.target.checked);
    reset();
    getFriends();
  }

  const onSubs: ChangeEventHandler<HTMLInputElement> = event => {
    setIsSubsChecked(event.target.checked);
    setIsAllChecked(!event.target.checked);
    setIsFriendsChecked(!event.target.checked);
    reset();
    getSubs();
  }

  const onAll: ChangeEventHandler<HTMLInputElement> = event => {
    setIsAllChecked(event.target.checked);
    setIsSubsChecked(!event.target.checked);
    setIsFriendsChecked(!event.target.checked);
    reset();
    getUsers();
  }

  const onEnter = (text: string) => {
    setSearchText(text);
    reset();
  }

  useEffect(() => {
    getYet?.();
  }, [searchText]);

  return {
    people,
    onFriends,
    onSubs,
    onAll,
    onEnter,
    getYet,
    isAll
  }
}