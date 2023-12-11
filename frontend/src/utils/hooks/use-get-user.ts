import {User} from "../../models";
import {useGetUserQuery} from "../../store";
import {useEffect, useState} from "react";

export const useGetUser = (userid: string) : User | null => {
  const {data} = useGetUserQuery(userid);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!data) return;
    setUser(data);
  }, [data]);

  return user as const;
}