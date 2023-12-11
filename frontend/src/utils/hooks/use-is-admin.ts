import {useEffect, useState} from "react";
import {isAdmin} from "../scripts";
import {useGetUser} from "./use-get-user.ts";

export const useIsAdmin = (userid: string) => {
  const [_isAdmin, setIsAdmin] = useState(false);
  const user = useGetUser(userid);

  useEffect(() => {
    if (!user) return;
    setIsAdmin(isAdmin(user));
  }, [user]);

  return {isAdmin: _isAdmin, roles: user?.role, user};
}