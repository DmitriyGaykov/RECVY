import { store } from './index.ts';
import {useDispatch, useSelector} from "react-redux";

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T) => useSelector(selector);