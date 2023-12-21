import {useUsersOnline} from "../../store";
import {useEffect, useState} from "react";

export const useIsUserOnline = (userid: string) => {
  const onlineUsers = useUsersOnline();
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    setIsOnline(onlineUsers.includes(userid));
  }, [onlineUsers]);

  return isOnline;
}