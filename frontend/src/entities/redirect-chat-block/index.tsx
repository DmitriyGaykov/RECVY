import {FC, memo, useEffect, useState} from "react";
import {TextBlock} from "../../components";
import trash from "../../assets/images/trash.svg";
import {ImageButton} from "../../components";
import {
  decrypt,
  getTime,
  isToday,
  useCurrentChat, useIsAdmin,
  useMessageDesc,
  usePhoto
} from "../../utils";
import {RemoveCallback, useRemoveChat} from "../../utils/hooks/use-remove-chat.ts";
import {useCurrentStoreUser} from "../../store";
import {MessageType} from "../../models";

export type RedirectChatBlockProps = {
  iduserto: string;
  photo: string;
  firstname: string;
  lastmessage: string;
  messagetype: string;
  sentdate: Date;
  onClick?: (iduserto?: string) => void;
  onDell?: RemoveCallback;
  isOnline?: boolean;
}

export const RedirectChatBlock: FC<RedirectChatBlockProps> = memo((props) => {
  const photo = usePhoto(props.photo);
  const lastMessage = useMessageDesc(props.lastmessage, props.messagetype);
  const isCurrent = useCurrentChat(props.iduserto);
  const removeChat = useRemoveChat(props.iduserto, props.onDell);
  const user = useCurrentStoreUser();
  const { isAdmin } = useIsAdmin(props.iduserto);

  const [decr, setDecr] = useState("");

  useEffect(() => {
    if(props.iduserto === '0') return setDecr(lastMessage);
    if (props.messagetype !== MessageType.text) return;
    const decr1 = decrypt(lastMessage, [user.id, props.iduserto]);
    const decr2 = decrypt(lastMessage, [props.iduserto, user.id]);

    setDecr(decr1 || decr2)
  }, [lastMessage]);

  return (
    <section
      className={`w-100 p-1 rounded-1 cursor-pointer d-flex align-items-center gap-2 ${isCurrent ? 'pink-color' : 'light-purple'}`}
      onClick={() => props.onClick(props.iduserto)}>
      {
        photo &&
        <img src={photo} className="width-height-60 rounded-5"/>
      }
      <div className="name-msg-wrapper d-flex flex-column justify-content-center">
        <div className="d-flex gap-1  align-items-center">
          <TextBlock
            className={`width-and-text-ender-140 ${isAdmin && 'stress-admin-name'}`}>{user.id === props.iduserto ? "Вы" : props.firstname}</TextBlock>
          {props.isOnline && <div className="width-height-10 green-color-transform-gradient rounded-3"></div>}
        </div>
        <TextBlock
          className="width-and-text-ender-140">{props.messagetype === MessageType.text ? decr : lastMessage}</TextBlock>
      </div>
      <div className="vertical-grid flex-1">
        {
          isCurrent &&
          <div className="top d-flex justify-content-end align-items-center">
            <ImageButton src={trash} onClick={removeChat} className="width-height-20"/>
          </div>
        }
        <TextBlock
          className={"center d-flex align-items-center justify-content-end " + (isToday(props.sentdate) ? 'fs-14px' : 'fs-10px')}>
          {
            isToday(props.sentdate) ?
              <>{getTime(props.sentdate)}</> :
              <>Недавно</>
          }
        </TextBlock>
      </div>
    </section>
  );
})