import {FC} from "react";
import {MessageBlockType} from "../index.ts";
import {useSticker} from "../../../../utils";

export const MyStickerMessage : FC<MessageBlockType> = (props) => {
  const [sticker] = useSticker(props.message);
  return <img src={sticker} alt="sticker" className="width-height-180"/>
}