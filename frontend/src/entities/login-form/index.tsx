import {FC} from "react";
import {ErrorMessage, TextBlock} from "../../components";
import {FormLabelInput} from "../form-label-input";
import {SubmitButton} from "../../components";
import {useLogin} from "../../utils";
import {setToken, useAppDispatch} from "../../store";
import {Link} from "react-router-dom";

export const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const {isError, onSubmit, error} = useLogin(data => dispatch(setToken(data)));

  return (
    <form className="light-purple rounded-3 form-control p-4 gap-1 d-flex flex-column border-0"
          style={{width: '35%', minWidth: '300px'}} onSubmit={onSubmit}>
      <TextBlock className="fw-bold fs-1">Авторизация</TextBlock>

      {
        isError && (error?.data?.error ? <ErrorMessage>{error.data?.error}</ErrorMessage> :
          <ErrorMessage>Неверный логин или пароль</ErrorMessage>)
      }

      <FormLabelInput labelText="Логин:" name="login"/>
      <FormLabelInput labelText="Пароль:" name="password" type="password"/>

      <div className="d-flex w-100 align-items-center flex-column gap-1">
        <SubmitButton>Войти</SubmitButton>
        <Link to="/auth/reg" className="">
          <TextBlock>Зарегистрируйтесь!</TextBlock>
        </Link>
      </div>
    </form>
  )
}