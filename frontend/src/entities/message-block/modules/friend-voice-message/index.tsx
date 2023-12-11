import {MessageBlockType} from "../index.ts";
import React, {FC} from "react";
import {usePhoto, useVoiceEventer, useVoiceMessage} from "../../../../utils";
import {DotsLoader} from "../../../loaders";
import {TextBlock} from "../../../../components";
import startVoiceSvg from './../../../../assets/images/start-voice.svg';
import stopVoiceSvg from './../../../../assets/images/stop-voice.svg';
import {ImageButton} from "../../../../components/buttons";

export const FriendVoiceMessage : FC<MessageBlockType> = (message) => {
  const photo = usePhoto(message.user.photos?.at(-1));

  const { audio, isLoading } = useVoiceMessage(message.messageid);
  const { audioRef, onVoice, isVoiceStarted } = useVoiceEventer();

  return (
    <div className="d-flex align-items-center gap-3">
      {
        photo ?
          <img src={photo} className="width-height-60 rounded-5"/>
          : <DotsLoader/>
      }

      <div className="p-2 overflow-hidden d-flex gap-2 pink-color rounded-3 align-items-center">
        <audio ref={audioRef} src={audio}/>

        {
          isLoading ?
            <>
              <DotsLoader />
            </>
            :
            <>
              <ImageButton  src={ !isVoiceStarted ? startVoiceSvg : stopVoiceSvg } onClick={onVoice} className="width-height-15" />
              <TextBlock className="text-decoration-underline">Голосовое сообщение</TextBlock>
            </>
        }
      </div>
    </div>
  )
}