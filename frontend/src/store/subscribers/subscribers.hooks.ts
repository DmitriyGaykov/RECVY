import {useAppSelector} from "../hooks.ts";

export const useStoreSubscribers = () => useAppSelector(state => state.subscribers.subscribers);