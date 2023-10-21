import {FC, memo, useCallback, useEffect, useState} from "react";
import {TextBlock} from "../../components";
import trash from "../../assets/images/trash.svg";
import {ImageButton} from "../../components/buttons";
import {useCurrentChat, useMessageDesc, usePhoto} from "../../utils";
import {useAppSelector} from "../../store";

export type RedirectChatBlockProps = {
  iduserto: string;
  photo: string;
  firstname: string;
  lastmessage: string;
  messagetype: string;
  sentdate: Date;
  onClick?: (iduserto?: string) => void;
}

export const RedirectChatBlock : FC<RedirectChatBlockProps> = memo((props) => {
  const photo = usePhoto(props.photo);
  const lastMessage = useMessageDesc(props.lastmessage, props.messagetype);
  const isCurrent = useCurrentChat(props.iduserto);

  const onDell = useCallback(async () => {

  }, [])

  return (
    <section className={`w-100 p-1 rounded-1 d-flex align-items-center gap-2 ${isCurrent ? 'pink-color' : 'light-purple' }`} onClick={() => typeof props.onClick === 'function' && props.onClick(props.iduserto)}>
      {
        photo &&
        <img src={photo} className="width-height-60 rounded-5" />
      }
      <div className="name-msg-wrapper d-flex flex-column justify-content-center">
        <TextBlock className="width-160 text-ender-160">{props.firstname}</TextBlock>
        <TextBlock className="width-160 text-ender-160">{lastMessage}</TextBlock>
      </div>
      <div className="vertical-grid flex-1">
        {
          isCurrent &&
          <div className="top d-flex justify-content-end align-items-center">
            <ImageButton src={trash} onClick={onDell} className="width-height-20" />
          </div>
        }
        <TextBlock className="center fs-14px d-flex justify-content-end align-items-center">{props.sentdate.getHours()}:{props.sentdate.getMinutes()}</TextBlock>
      </div>
    </section>
  );
})