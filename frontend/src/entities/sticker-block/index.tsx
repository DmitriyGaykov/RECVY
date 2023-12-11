import {FC, memo, useCallback, useState} from "react";
import {Sticker} from "../../models";
import {isAdmin, useSticker} from "../../utils";
import {Simulate} from "react-dom/test-utils";
import contextMenu = Simulate.contextMenu;
import {useCurrentStoreUser} from "../../store";

export type StickerBlockProps = Sticker & {
  onClick?: (stickerid: string) => void,
  className?: string,
  onRightClick?: (stickerid: string) => void
};

export const StickerBlock: FC<StickerBlockProps> = memo(({sticker, stickerid, onClick, className, onRightClick}) => {
  const currentUser = useCurrentStoreUser();
  const [_isAdmin] = useState(isAdmin(currentUser));
  const [photo] = useSticker(sticker);

  const onContextMenu = () => {
    if(!confirm('Вы желаете удалить это стикер?')) return;
    onRightClick(stickerid);
  }

  return (
    <>
      <img
        src={photo}
        alt="sticker"
        onContextMenu={_isAdmin ? onContextMenu : undefined}
        className={"width-height-85 " + (className || '')}
        onClick={() => typeof onClick === 'function' && onClick(stickerid)}
        style={{cursor: "pointer"}}/>
    </>
  )
})