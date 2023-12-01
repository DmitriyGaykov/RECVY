import addPhotoPng from './../../../assets/images/add-sitcker.png';
import {IButton} from "../button.interface.ts";

export const AddStickerButton: IButton = ({ className }) => {
  return (
    <img
      src={addPhotoPng}
      alt="sticker"
      className={"width-height-85 " + (className || '')}
      style={{cursor: "pointer"}}/>
  )
}