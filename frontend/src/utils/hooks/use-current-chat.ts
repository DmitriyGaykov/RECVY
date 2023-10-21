import {ChatId, useAppSelector} from "../../store";
import {useEffect, useState} from "react";

export const useCurrentChat = (chatid : ChatId) => {
  const [isCurrent, setIsCurrent] = useState(false);
  const current = useAppSelector(state => state.chats.current);

  useEffect(() => {
    current && setIsCurrent(current === chatid);
  }, [current]);

  return isCurrent as const;
}