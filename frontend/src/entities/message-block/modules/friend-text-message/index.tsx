import {FC} from "react";
import {MessageBlockType} from "../index.ts";
import {getDateTime, useDecryptor, usePhoto} from "../../../../utils";
import {DotsLoader} from "../../../loaders";

export const FriendTextMessage: FC<MessageBlockType> = (message) => {
  const photo = usePhoto(message.user.photos?.at(-1));

  const textMessage = message.iduserfrom !== '0' ? useDecryptor(message.message, [message.iduserfrom, message.iduserto]) : message.message;

  return (
    <div className="d-flex align-items-center gap-3">
      {
        photo ?
          <img src={photo} className="width-height-60 rounded-5"/>
          : <DotsLoader/>
      }
      <div className="p-2 overflow-hidden pink-color text-white rounded-2 d-flex d-flex flex-column gap-1">
        <div contentEditable={message.onChange != null}
             style={{wordBreak: 'break-all'}}>
          {
            textMessage
          }
        </div>
        <div className="w-100 fs-7px d-flex justify-content-end">
          {getDateTime(message.sentdate)} { message.isedited && " | edited"}
        </div>
      </div>
    </div>
  )
}