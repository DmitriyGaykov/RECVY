import {FC, useState} from "react";
import {TextBlock} from "../../components";
import {ImageButton, RadialButton} from "../../components/buttons";
import {useAddPhoto, useGetMenu, usePhotoDeleter, useSignOut} from "../../utils";
import {EditFormWrapper} from "../edit-form-wrapper";
import {addPhoto, dellPhoto, useAppDispatch, useCurrentStoreUser} from "../../store";
import {PhotoSlider} from "../photo-slider";
import plusSvg from './../../assets/images/plus-svgrepo-com.svg';
import minusSvg from './../../assets/images/minus-svgrepo-com.svg';

export type BurgerMenuProps = {
  appName?: string;
  onBlackZone?: string;
}
export const BurgerMenu: FC<BurgerMenuProps> = ({appName, onBlackZone}) => {
  const signOut = useSignOut();
  const dispatch = useAppDispatch();
  const [showEditForm, clickShowEditForm] = useGetMenu();

  const onAddPhoto = useAddPhoto({ onSuccess: photo => dispatch(addPhoto(photo)) });
  const onDellPhoto = usePhotoDeleter({ onSuccess: photo => dispatch(dellPhoto(photo)) });

  const user = useCurrentStoreUser();
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);

  return (
    <div className="d-flex position-fixed min-vw-100 min-vh-100" style={{left: 0, top: 0, zIndex: 100}}>
      <div className="header-color w-100 d-flex flex-column gap-3 p-3" style={{maxWidth: '300px'}}>
        <TextBlock className="fw-bold header-text-size">{appName}</TextBlock>
        <div className="profile d-flex flex-column gap-2 w-100">
          <h2 className="h2 text-white header-text-size border-bottom border-2">Profile</h2>
          <div className="profile-info d-flex justify-content-start align-items-center gap-1">
            <PhotoSlider photos={user.photos} setCurrentPhoto={setCurrentPhoto}/>
            <div className="d-flex flex-column gap-1">
              <div className="d-flex justify-content-start gap-1">
                <ImageButton className="width-height-15" src={plusSvg} alt="plus" onClick={onAddPhoto}/>
                <ImageButton className="width-height-15" src={minusSvg} alt="minus" onClick={() => onDellPhoto(currentPhoto)} />
              </div>
              <TextBlock className="text-white text-break">{user.firstname}</TextBlock>
              <TextBlock className="text-white text-break">{user.lastname}</TextBlock>
              <TextBlock className="text-white">Возраст: {user.age}</TextBlock>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <RadialButton className="text-white light-purple" onClick={clickShowEditForm}>Редактировать
            профиль</RadialButton>
        </div>
        <RadialButton className="text-white pink-color" onClick={signOut}>Выйти с аккаунта</RadialButton>
      </div>
      <div className="flex-1 bg-black opacity-50" onClick={onBlackZone}></div>

      {
        showEditForm &&
        <EditFormWrapper exit={clickShowEditForm}/>
      }
    </div>
  )
}