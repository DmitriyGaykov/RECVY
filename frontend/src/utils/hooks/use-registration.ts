import {useSignUpMutation} from "../../store";
import {ReactEventHandler, useEffect, useState} from "react";
import {HttpStatusCode} from "axios";

export const useRegistration = (onData?: (data : string) => void) => {
  const [signUp, { isError, error }] = useSignUpMutation();
  const [errorData, setErrorData] = useState();
  const [data, setData] = useState<string>();

  const onSubmit = async (e: ReactEventHandler<SubmitEvent>) : Promise<void> => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const resp = await signUp(formData);

    if(resp.error.originalStatus === HttpStatusCode.Created) {
      setData(resp.error.data);
      setErrorData(null);
    }
  }

  useEffect(() => {
    isError && setErrorData(error?.data);
  }, [isError]);

  useEffect(() => {
    data && onData && typeof onData === 'function' && onData(data);
  }, [data]);

  return { data, errorData, onSubmit }
}