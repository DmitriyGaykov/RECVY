import {FC} from "react";
import {FormLabelInput} from "../form-label-input";
import {ErrorMessage, ImageInput, TextBlock} from "../../components";
import {SubmitButton} from "../../components/buttons";
import {useRegistration} from "../../utils";
import {setToken, useAppDispatch} from "../../store";

export const RegForm : FC = () => {
  const dispatch = useAppDispatch();
  const { errorData, onSubmit } = useRegistration(data => dispatch(setToken(data)));

  return (
    <form className="light-purple rounded-3 form-control p-4 gap-3 d-flex flex-column border-0" style={{ width: '35%', minWidth: '300px' }} onSubmit={onSubmit}>
      <TextBlock className="fw-bold fs-1">Регистрация</TextBlock>

      <FormLabelInput labelText="Логин:" name="login"/>
      <ErrorMessage>{errorData?.login}</ErrorMessage>

      <FormLabelInput labelText="Имя:" name="firstname" />
      <ErrorMessage>{errorData?.firstname}</ErrorMessage>

      <FormLabelInput labelText="Фамилия:" name="lastname" />
      <ErrorMessage>{errorData?.lastname}</ErrorMessage>

      <FormLabelInput labelText="Пароль:" name="password" type="password" />
      <ErrorMessage>{errorData?.password}</ErrorMessage>

      <FormLabelInput labelText="Возраст:" name="age" type="number" />
      <ErrorMessage>{errorData?.age}</ErrorMessage>

      <ImageInput />
      <ErrorMessage>{errorData?.photo}</ErrorMessage>
      <div className="d-flex w-100 justify-content-center">
        <SubmitButton>Зарегистрироваться</SubmitButton>
      </div>
    </form>
  );
}