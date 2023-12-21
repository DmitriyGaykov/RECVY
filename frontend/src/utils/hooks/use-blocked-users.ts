import {usePages} from "./use-pages.ts";
import {clearPeople, setPeople, useAppDispatch, useLazyGetBlockedUsersQuery, useStoredPeople} from "../../store";
import {useEffect, useState} from "react";
import {User} from "../../models";

export const useBlockedUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const {page, getYet, isAllData, setIsAllData, setDefault} = usePages();
  const [getUsersQuery] = useLazyGetBlockedUsersQuery();

  const people = useStoredPeople();
  const dispatch = useAppDispatch();

  const reset = () => {
    setDefault();
    setUsers([]);
    dispatch(clearPeople());
  }

  const getUsers = async () => {
    const resp = await getUsersQuery({page, searchText});
    const data = resp.data as User[];

    if (data.length !== 0) {
      setUsers([...users, ...data]);
      setIsAllData(false);
    } else
      setIsAllData(true);
  }

  const onEnter = (searchText: string) => {
    setSearchText(searchText);
    reset();
  }

  useEffect(() => {
    getUsers();
    return reset;
  }, []);

  useEffect(() => {
    getUsers();
  }, [page, searchText]);

  useEffect(() => {
    users?.length === 0 && setIsAllData(true);
  }, [users]);

  useEffect(() => {
    dispatch(setPeople(users));
  }, [users])

  return {users: people, getYet, onEnter, isAllData, getUsers};
}