import {useEffect, useState} from "react";
import {useAppSelector, useGetUserQuery} from "../../store";

export const useHeaderText = () : string => {
  const [centerText, setCenterText] = useState("");
  const current = useAppSelector(state => state.chats.current);

  const { data, isError } = useGetUserQuery(current);

  useEffect(() => {
    !isError && data && setCenterText(data?.firstname);
  }, [data]);

  return centerText as const;
}