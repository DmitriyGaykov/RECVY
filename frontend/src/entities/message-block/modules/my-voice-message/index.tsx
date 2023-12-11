import {FC} from "react";
import {MessageBlockType} from "../index.ts";
import {useVoiceEventer, useVoiceMessage} from "../../../../utils";
import startVoiceSvg from './../../../../assets/images/start-voice.svg';
import stopVoiceSvg from './../../../../assets/images/stop-voice.svg';
import {TextBlock} from "../../../../components";
import {ImageButton} from "../../../../components/buttons";
import {DotsLoader} from "../../../loaders";

export type URLType = ReturnType<typeof URL.createObjectURL>;

export const MyVoiceMessage: FC<MessageBlockType> = ({ messageid }) => {
  const { audio, isLoading, error } = useVoiceMessage(messageid);
  const { audioRef, onVoice, isVoiceStarted } = useVoiceEventer();

  return (
    <div className="p-2 overflow-hidden d-flex gap-2 light-purple rounded-3 align-items-center">
      <audio ref={audioRef} src={audio}/>

      {
        (isLoading || error) ?
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
  )
}