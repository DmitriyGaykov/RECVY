import {useEffect, useState} from "react";
import {useAppSelector, useLazyGetUserQuery} from "../../store";

export const useHeaderText = () : string => {
  const [centerText, setCenterText] = useState("");
  const current = useAppSelector(state => state.chats.current);
  const [getUser, { data, isError}] = useLazyGetUserQuery();

  useEffect(() => {
    getUser(current);
  }, [current]);

  useEffect(() => {
    setCenterText(!isError ? data?.firstname : "");
  }, [data, isError]);

  return centerText;
}