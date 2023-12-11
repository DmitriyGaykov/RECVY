import {ErrorMessage, ImageInput, TextBlock} from "../../components";
import {FormLabelInput} from "../form-label-input";
import {RadialButton, SubmitButton} from "../../components";
import {FC} from "react";
import {EditFormWrapperProps} from "../edit-form-wrapper";
import {useEditUserInfo} from "../../utils";
import {useCurrentStoreUser} from "../../store";
import {User} from "../../models";

export const EditForm: FC<EditFormWrapperProps> = ({exit}) => {
  const { onSubmit, errorData } = useEditUserInfo({onSuccess: exit});
  const user: User = useCurrentStoreUser();

  return (
    <form className="light-purple rounded-3 form-control p-3 gap-2 d-flex flex-column border-0 scroll-container"
          style={{height: '390px',width: '35%', minWidth: '350px'}} onSubmit={onSubmit}>
      <TextBlock className="fw-bold fs-1">Редактирование</TextBlock>

      <div className="d-flex gap-1">
        <div className="d-flex flex-column gap-1">
          <FormLabelInput labelText="Логин:" name="login" defaultValue={user.login}/>
          <ErrorMessage>{errorData?.login}</ErrorMessage>

          <FormLabelInput labelText="Имя:" name="firstname" defaultValue={user.firstname}/>
          <ErrorMessage>{errorData?.firstname}</ErrorMessage>

          <FormLabelInput labelText="Фамилия:" name="lastname" defaultValue={user.lastname}/>
          <ErrorMessage>{errorData?.lastname}</ErrorMessage>
        </div>

        <div className="d-flex flex-column gap-1">
          <FormLabelInput labelText="Пароль:" name="password" type="password"/>
          <ErrorMessage>{errorData?.password}</ErrorMessage>

          <FormLabelInput labelText="Возраст:" name="age" type="number" defaultValue={user.age}/>
          <ErrorMessage>{errorData?.age}</ErrorMessage>

          <FormLabelInput labelText="Описание:" name="aboutme" defaultValue={user.aboutme}/>
          <ErrorMessage>{errorData?.aboutme}</ErrorMessage>
        </div>
      </div>

      <div className="d-flex w-100 align-items-center gap-4">
        <SubmitButton>Редактировать</SubmitButton>
        <RadialButton className="pink-color text-white fw-bold" onClick={exit} type="text">Отмена</RadialButton>
      </div>
    </form>
  )
}