import {FC} from "react";
import {FormLabelInput} from "../form-label-input";
import {ErrorMessage, ImageInput, TextBlock} from "../../components";
import {SubmitButton} from "../../components/buttons";
import {useRegistration} from "../../utils";
import {setToken, useAppDispatch} from "../../store";
import {Link} from "react-router-dom";

export const RegForm: FC = () => {
  const dispatch = useAppDispatch();
  const {errorData, onSubmit} = useRegistration(data => dispatch(setToken(data)));

  return (
    <form className="light-purple rounded-3 form-control scroll-container p-3 gap-2 d-flex flex-column border-0"
          style={{width: '35%', minWidth: '300px', height: '400px'}} onSubmit={onSubmit}>
      <TextBlock className="fw-bold fs-1">Регистрация</TextBlock>

      <div className="d-flex gap-1">
        <div className="d-flex flex-column gap-1">
          <FormLabelInput labelText="Логин:" name="login"/>
          <ErrorMessage>{errorData?.login}</ErrorMessage>

          <FormLabelInput labelText="Имя:" name="firstname"/>
          <ErrorMessage>{errorData?.firstname}</ErrorMessage>

          <FormLabelInput labelText="Фамилия:" name="lastname"/>
          <ErrorMessage>{errorData?.lastname}</ErrorMessage>
        </div>

        <div className="d-flex flex-column gap-1">
          <FormLabelInput labelText="Пароль:" name="password" type="password"/>
          <ErrorMessage>{errorData?.password}</ErrorMessage>

          <FormLabelInput labelText="Возраст:" name="age" type="number"/>
          <ErrorMessage>{errorData?.age}</ErrorMessage>
        </div>
      </div>

      <ImageInput/>
      <ErrorMessage>{errorData?.photo}</ErrorMessage>

      <div className="d-flex w-100 align-items-center flex-column gap-1">
        <SubmitButton>Зарегистрироваться</SubmitButton>
        <Link to="/auth/login">
          <TextBlock>Войдите!</TextBlock>
        </Link>
      </div>
    </form>
  );
}