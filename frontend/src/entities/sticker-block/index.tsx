import {FC, memo} from "react";
import {Sticker} from "../../models";

export type StickerBlockProps = Sticker & {
  onClick?: (stickerid: string) => void
};

export const StickerBlock : FC<StickerBlockProps> = memo(({ sticker, stickerid, onClick }) => {
  return (
    <img src={sticker} alt="sticker" className="width-height-90" onClick={onClick}/>
  )
})