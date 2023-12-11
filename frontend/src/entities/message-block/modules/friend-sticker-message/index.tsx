import {FC} from "react";
import {MessageBlockType} from "../index.ts";
import {usePhoto, useSticker} from "../../../../utils";

export const FriendStickerMessage: FC<MessageBlockType> = (message) => {
  const [sticker] = useSticker(message.message);

  return (
    <div className="d-flex align-items-center gap-3">
      <img src={sticker} alt="sticker" className="width-height-180"/>
    </div>
  )
}