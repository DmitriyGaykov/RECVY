import {FC, lazy, memo, useState} from "react";
import {User} from "../../models";
import {PhotoSlider} from "../photo-slider";
import {setToChat, useAppDispatch, useCurrentStoreUser, useOnlineChecker} from "../../store";
import {BlockButton, NavButton, RadialButton, RelationButton, TextBlock} from "../../components";
import {isAdmin, useGetMenu, useIsUserOnline, useUserDeleter} from "../../utils";
import {DescriptionModal} from "../description-modal";

export const PersonBlock: FC<User> = memo((user) => {
  const currentUser = useCurrentStoreUser();
  const [admin] = useState(isAdmin(currentUser));
  const {id} = useCurrentStoreUser();
  const dispatch = useAppDispatch();
  const deleteUser = useUserDeleter();

  const isOnline = useIsUserOnline(user.id);

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
        {isOnline && <div className="width-height-10 green-color-transform-gradient rounded-3"></div>}
      </div>
      <div className={`d-flex gap-2 align-items-center ${admin && 'flex-column'}`}>
        {
          currentUser.id !== user.id &&
          <RelationButton who={id} whom={user.id}/>
        }
        <NavButton to="/messages" onClick={() => dispatch(setToChat(user.id))}>Перейти в чат</NavButton>
        {
          currentUser.id !== user.id && admin &&
          <>
            <RadialButton className="btn btn-danger fs-10px fw-bold" onClick={() => deleteUser(user.id)}>Удалить
              пользователя</RadialButton>
            <BlockButton userid={user.id} onReason={setReason}/>
            {
              reason &&
              <TextBlock className="text-white fs-10px" style={{cursor: 'pointer'}}>Причина блокировки: {reason}</TextBlock>
            }
          </>
        }
      </div>

      {
        isShow &&
        <DescriptionModal userid={user.id} onCross={clickToOpen} _user={user}/>
      }
    </div>)
})