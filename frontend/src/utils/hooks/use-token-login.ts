import {setCurrentUser, setToken, useAppDispatch, useAppSelector, useSignInWithTokenMutation} from "../../store";
import {useEffect, useState} from "react";
import {addCookie, getCookie} from "../scripts";
import {User} from "../../models";

export const useTokenLogin = () => {
  const token = useAppSelector(store => store.auth.token);
  const dispatch = useAppDispatch();

  const [ signInWithToken] = useSignInWithTokenMutation();
  const [currentUser, setCurrent] = useState<User>(null);

  useEffect(() => {
    if(!token) return;

    addCookie('jwt_recvy',token);
    signInWithToken()
      .then(data => {
        dispatch(setCurrentUser(data.data));
        setCurrent(data.data)
      })
  }, [token]);

  useEffect(() => {
    const token = getCookie('jwt_recvy');
    token && dispatch(setToken(token));
  }, []);

  return currentUser;
}