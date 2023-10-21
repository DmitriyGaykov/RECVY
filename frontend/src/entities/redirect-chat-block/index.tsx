import {FC, memo} from "react";
import {TextBlock} from "../../components";
import trash from "../../assets/images/trash.svg";
import {ImageButton} from "../../components/buttons";
import {getTime, isToday, useCurrentChat, useMessageDesc, usePhoto} from "../../utils";
import {RemoveCallback, useRemoveChat} from "../../utils/hooks/use-remove-chat.ts";

export type RedirectChatBlockProps = {
  iduserto: string;
  photo: string;
  firstname: string;
  lastmessage: string;
  messagetype: string;
  sentdate: Date;
  onClick?: (iduserto?: string) => void;
  onDell?: RemoveCallback;
}

export const RedirectChatBlock: FC<RedirectChatBlockProps> = memo((props) => {
  const photo = usePhoto(props.photo);
  const lastMessage = useMessageDesc(props.lastmessage, props.messagetype);
  const isCurrent = useCurrentChat(props.iduserto);
  const removeChat = useRemoveChat(props.iduserto, props.onDell);

  return (
    <section
      className={`w-100 p-1 rounded-1 d-flex align-items-center gap-2 ${isCurrent ? 'pink-color' : 'light-purple'}`}
      onClick={() => props.onClick(props.iduserto)}>
      {
        photo &&
        <img src={photo} className="width-height-60 rounded-5"/>
      }
      <div className="name-msg-wrapper d-flex flex-column justify-content-center">
        <TextBlock className="width-and-text-ender-140">{props.firstname}</TextBlock>
        <TextBlock className="width-and-text-ender-140">{lastMessage}</TextBlock>
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