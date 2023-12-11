import {setCurrentUser, useAppDispatch, useCurrentStoreUser, useEditUserInfoMutation} from "../../store";
import {FormEvent, useEffect, useState} from "react";
import {User} from "../../models";

export type UseEditUserInfoParams = {
  onSuccess?: (data: User) => void;
}

export const useEditUserInfo = ({ onSuccess } : UseEditUserInfoParams) => {
  const [edit, { data, error}] = useEditUserInfoMutation();
  const user = useCurrentStoreUser();
  const dispatch = useAppDispatch();

  const [errorData, setErrorData] = useState();
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const userInfo : User = {
      id: user.id,
    };

    if(form.login && form.login.value !== "") {
      userInfo.login = form.login.value;
    }
    if(form.aboutme && form.aboutme.value !== "") {
      userInfo.aboutme = form.aboutme.value;
    }
    if(form.firstname && form.firstname.value !== "") {
      userInfo.firstname = form.firstname.value;
    }
    if(form.lastname && form.lastname.value !== "") {
      userInfo.lastname = form.lastname.value;
    }
    if(form.password && form.password.value !== "") {
      userInfo.password = form.password.value;
    }
    if(form.age && form.age.value !== "") {
      userInfo.age = Number(form.age.value);
    }

    edit(userInfo);
  }

  useEffect(() => {
    if(!data) return;
    const _user = data as User;
    setIsSuccess(true);
    dispatch(setCurrentUser(_user));

    onSuccess?.(_user);
  }, [data]);

  useEffect(() => {
    setErrorData(error?.data);
  }, [error]);

  return { onSubmit, errorData, isSuccess }
}