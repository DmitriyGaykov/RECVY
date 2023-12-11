import React, {FC, useCallback, useState} from "react";
import sendSvg from './../../assets/images/send.svg';
import stickersSvg from './../../assets/images/sticker.svg';
import voiceSvg from './../../assets/images/voice.svg';
import addSvg from './../../assets/images/add.svg';
import {ImageButton} from "../../components/buttons";
import {AdminNote, SendInput} from "../../components";
import {
  isMainAdmin,
  RelationStatus,
  useIsAdmin,
  useMessages,
  useMessageScroll,
  useMessageSender,
  useRelationDefiner
} from "../../utils";
import {MessageBlock} from "../message-block";
import {StickersMenu} from "../stickers-menu";
import {useCurrentStoreUser, useStoreCurrentChat} from "../../store";

export const MessageWrapper: FC = () => {
  const [showStickers, setShowStickers] = useState(false);
  const [textMessage, setTextMessage] = useState('');

  const [messageWrapperRef, scroll] = useMessageScroll();
  const {messages, getYet, isAllData} = useMessages();
  const {onStickerMessage, onTextMessage, onVoiceMessage, wasRecordingStarted} = useMessageSender(() => {
    scroll();
    setTextMessage('');
    setShowStickers(false);
  });

  const chat = useStoreCurrentChat();

  const onEnter = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onTextMessage(textMessage);
    }
  }, [textMessage, onTextMessage]);

  return (
    <div className="page-right-side flex-1 min-width-300 d-flex flex-column justify-content-between" style={{ zIndex: 1 }}>
      <div className="d-flex flex-column justify-content-between overflow-y-scroll scroll-container"
           style={{height: '81.5vh'}}
           ref={messageWrapperRef}>
        <div className="message-wrapper flex d-flex flex-1 justify-content-end position-relative flex-column gap-3 p-3">
          {
            !isAllData &&
            <div className="w-100 d-flex justify-content-end">
              <ImageButton onClick={getYet} src={addSvg} className="width-height-30"/>
            </div>
          }
          {
            messages?.map(msg => <MessageBlock key={msg.messageid} {...msg} />)
          }
        </div>
      </div>

      {
        showStickers &&
        <StickersMenu onSticker={onStickerMessage}/>
      }
      <div className="position-relative">
        {
          chat === '0' &&
          <div className="position-absolute w-100 h-100 bg-dark bg-opacity-50"></div>
        }
        <div className="sender-wrapper bottom-0 py-2 px-3 d-flex light-purple gap-2 justify-content-between">
          <ImageButton className="width-height-30" src={sendSvg} onClick={() => onTextMessage(textMessage)}/>
          <SendInput placeholder="Введите сообщение..." onChange={setTextMessage} onKeyPress={onEnter}
                     value={textMessage}/>
          <div className="d-flex gap-2">
            <ImageButton className="width-height-30" src={stickersSvg} onClick={() => setShowStickers(!showStickers)}/>
            <ImageButton className={"width-height-30 rounded-4 " + (wasRecordingStarted && "pink-color")} src={voiceSvg}
                         onClick={onVoiceMessage}/>
          </div>
        </div>
      </div>
    </div>
  )
}