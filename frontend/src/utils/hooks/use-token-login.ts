import {
  DELETE_TOKEN_FROM_COOKIE,
  setCurrentUser,
  setToken,
  useAppDispatch,
  useAppSelector,
  useSetSocketName,
  useSignInWithTokenMutation
} from "../../store";
import {useEffect, useState} from "react";
import {addCookie, getCookie, removeCookie} from "../scripts";
import {User} from "../../models";

export const useTokenLogin = () => {
  const token = useAppSelector(store => store.auth.token);
  const dispatch = useAppDispatch();

  const [ signInWithToken, { isLoading }] = useSignInWithTokenMutation();
  const [currentUser, setCurrent] = useState<User>(null);

  useEffect(() => {
    if(!token) return;

    if(token === DELETE_TOKEN_FROM_COOKIE)
      return removeCookie('jwt_recvy');

    addCookie('jwt_recvy', token);
    signInWithToken()
      .then(data => {
        dispatch(setCurrentUser(data.data));
        setCurrent(data.data)
      })

    return () => dispatch(setCurrentUser(null));
  }, [token]);

  useEffect(() => {
    const token = getCookie('jwt_recvy');
    token && dispatch(setToken(token));
  }, []);

  return {currentUser, isLoading};
}