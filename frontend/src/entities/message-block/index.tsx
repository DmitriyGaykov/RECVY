import {Message, MessageType} from "../../models";
import React, {FC, memo} from "react";
import {MessageCallback, useGetMenu, useMessageDeleter, useMessageDevider, useMessageEditor} from "../../utils";
import {ImageButton} from "../../components/buttons";

import deleteSvg from './../../assets/images/delete.svg';
import editSvg from './../../assets/images/edit.svg';

export type MessageBlockProps = Message & MessageCallback;

export const MessageBlock: FC<MessageBlockProps> = memo((message) => {
  const [showMenu, onMenu] = useGetMenu();

  const {onEdit, onTextChange} = useMessageEditor(message, onMenu);
  const {MsgElement, isMy} = useMessageDevider(message, showMenu ? onTextChange : null);
  const deleteMessage = useMessageDeleter(message);

  return (
    <div className={"w-100 d-flex text-wrap gap-3 justify-content-" + (isMy ? "end" : "start")} onDoubleClick={onMenu}>
      {MsgElement}
      {
        isMy && showMenu &&
        <div className="d-flex gap-2 align-items-center">
          <ImageButton src={deleteSvg} className="width-height-20" onClick={deleteMessage}/>
          {
            message.messagetype === MessageType.text &&
            <ImageButton src={editSvg} className="width-height-20" onClick={onEdit}/>
          }
        </div>
      }
    </div>
  )
})

export * from './modules';