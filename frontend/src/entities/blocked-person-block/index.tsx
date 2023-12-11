import {FC, lazy, memo, useState} from "react";
import {User} from "../../models";
import {PhotoSlider} from "../photo-slider";
import {setToChat, useAppDispatch, useCurrentStoreUser, useOnlineChecker} from "../../store";
import {BlockButton, NavButton, RadialButton, RelationButton, TextBlock} from "../../components";
import {isAdmin, useGetMenu, useUserDeleter} from "../../utils";
import {DescriptionModal} from "../description-modal";

export const BlockedPersonBlock: FC<User> = memo((user) => {
  const dispatch = useAppDispatch();
  const deleteUser = useUserDeleter();

  const [reason, setReason] = useState(null);

  const [isShow, clickToOpen] = useGetMenu();

  return (
    <div className="d-flex w-100 gap-2 align-items-center">
      <PhotoSlider photos={user?.photos} className="width-height-100"/>
      <div className="d-flex flex-column justify-content-center align-items-start" style={{width: '200px'}}>
        <TextBlock className="text-white width-and-text-ender-140" style={{cursor: 'pointer'}}
                   onClick={clickToOpen}>{user?.firstname}</TextBlock>
        <TextBlock className="text-white width-and-text-ender-140" style={{cursor: 'pointer'}}
                   onClick={clickToOpen}>{user?.lastname}</TextBlock>
      </div>
      <div className={`d-flex gap-2 align-items-center flex-column`}>
        <NavButton to="/messages" onClick={() => dispatch(setToChat(user.id))}>Перейти в чат</NavButton>

        <RadialButton className="btn btn-danger fs-10px fw-bold" onClick={() => deleteUser(user.id)}>Удалить
          пользователя</RadialButton>
        <BlockButton userid={user.id} onReason={setReason}/>
        {
          reason &&
          <TextBlock className="text-white fs-10px" style={{cursor: 'pointer'}}>Причина блокировки: {reason}</TextBlock>
        }
      </div>

      {
        isShow &&
        <DescriptionModal userid={user.id} onCross={clickToOpen} _user={user}/>
      }
    </div>)
})