import {useAppSelector} from "../hooks.ts";

export const useStoreFriends = () => useAppSelector(state => state.friends.friends);