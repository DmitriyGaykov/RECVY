import {useAppSelector} from "../hooks.ts";

export const useCurrentStoreUser = () => useAppSelector(state => state.users.current);
export const useStoredUsers = () => useAppSelector(state => state.users.users);
export const useStoredPeople = () => useAppSelector(state => state.users.people);
export const useUsersOnline = () => useAppSelector(state => state.users.usersOnline);