import {useAppSelector} from "../hooks.ts";

export const useStoreMessages = () => useAppSelector(state => state.messages.messages);