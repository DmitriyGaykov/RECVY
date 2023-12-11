import addPhotoPng from './../../../assets/images/add-sitcker.png';
import {IButton} from "../button.interface.ts";
import {useAddSticker, useLoadPhoto} from "../../../utils";
import {useAddStickerMutation} from "../../../store";
import {FC} from "react";

export type AddStickerButtonProps = IButton & {
  onAddSticker?: () => void;
}

export const AddStickerButton: FC<AddStickerButtonProps> = ({className, onAddSticker}) => {
  const addSticker = useAddSticker(onAddSticker);

  return (
    <img
      src={addPhotoPng}
      alt="sticker"
      className={"width-height-85 " + (className || '')}
      style={{cursor: "pointer"}}
      onClick={addSticker}/>
  )
}