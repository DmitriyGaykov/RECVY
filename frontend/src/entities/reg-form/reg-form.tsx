import {FC, useEffect} from "react";
import {FormLabelInput} from "../form-label-input";
import {ErrorMessage, ImageInput, TextBlock} from "../../components";
import {SubmitButton} from "../../components/buttons";
import {useRegistration} from "../../utils";
import {useAppDispatch} from "../../store/hooks.ts";
import {setToken} from "../../store";

export const RegForm : FC = () => {
  const { errorData, onSubmit, data } = useRegistration();
  const dispatch = useAppDispatch();

  useEffect(() => {
    data && dispatch(setToken(data));
  }, [data]);

  return (
    <form className="light-purple rounded-3 form-control p-4 gap-3 d-flex flex-column border-0" style={{ width: '35%', minWidth: '300px' }} onSubmit={onSubmit}>
      <TextBlock className="fw-bold">Регистрация</TextBlock>

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