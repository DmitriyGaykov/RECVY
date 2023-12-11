import {clearToken, setToken, useAppDispatch} from "../../store";

export const useSignOut = () => {
  const dispatch = useAppDispatch();
  const signOut = () => {
    dispatch(clearToken());
    window.location.reload();
  }

  return signOut;
}