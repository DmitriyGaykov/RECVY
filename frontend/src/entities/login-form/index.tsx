import {FC} from "react";
import {ErrorMessage, TextBlock} from "../../components";
import {FormLabelInput} from "../form-label-input";
import {SubmitButton} from "../../components/buttons";
import {useLogin} from "../../utils";
import {setToken, useAppDispatch} from "../../store";

export const LoginForm : FC = () => {
  const dispatch = useAppDispatch();
  const { isError, onSubmit } = useLogin(data=> dispatch(setToken(data)));

  return (
    <form className="light-purple rounded-3 form-control p-4 gap-3 d-flex flex-column border-0" style={{ width: '35%', minWidth: '300px' }} onSubmit={onSubmit}>
      <TextBlock className="fw-bold fs-1">Авторизация</TextBlock>

      {
        isError &&
        <ErrorMessage>Неверный логин или пароль</ErrorMessage>
      }

      <FormLabelInput labelText="Логин:" name="login"/>
      <FormLabelInput labelText="Пароль:" name="password" type="password" />

      <div className="d-flex w-100 justify-content-center">
        <SubmitButton>Войти</SubmitButton>
      </div>
    </form>
  )
}