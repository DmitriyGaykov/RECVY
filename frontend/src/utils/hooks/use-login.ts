import {setToken, useAppDispatch, useSignInMutation} from "../../store";
import {useEffect, useState} from "react";
import {HttpStatusCode} from "axios";

export const useLogin = (onData?: (data : string) => void) => {
  const [data, setData] = useState<string>();
  const [signIn, { error }] = useSignInMutation();
  const [isError, setIsError] = useState(false);

  const onSubmit = async (e : SubmitEvent) : void => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const res = await signIn(formData);

    setIsError(res.error.originalStatus  !== HttpStatusCode.Created);

    if(res.error.originalStatus  !== HttpStatusCode.Created) return;
    setData(res.error.data);
  }

  useEffect(() => {
    data && typeof onData === 'function' && onData(data);
  }, [data]);

  return { isError, onSubmit, data, error };
}