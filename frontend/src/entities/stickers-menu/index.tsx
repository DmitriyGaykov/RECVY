import {FC, memo, useState} from "react";
import {StickerBlock} from "../sticker-block";
import {isAdmin, useStickers} from "../../utils";
import {DotsLoader} from "../loaders";
import {useCurrentStoreUser} from "../../store";
import {AddStickerButton} from "../../components/buttons/add-sticker-button";

export type StickersMenuProps = {
  onSticker?: (stickerid: string) => void;
};

export const StickersMenu: FC<StickersMenuProps> = memo(({onSticker}) => {
  const currentUser = useCurrentStoreUser();
  const [_isAdmin] = useState(isAdmin(currentUser));
  const {stickers, isLoading, getStickers, deleteSticker} = useStickers();

  return (
    <div className="light-purple p-2 d-flex gap-2 position-fixed rounded-2 flex-column align-items-center"
         style={{width: '300px', height: '310px', bottom: '10vh', right: '4vh'}}>
      <h1 className="text-white h4">Stickers</h1>
      <div className="flex-1 w-100 h-100 grid-container-3-columns scroll-container align-items-start">
        {
          !isLoading ?
            stickers.map(s => <StickerBlock
              key={s.stickerid}
              stickerid={s.stickerid}
              sticker={s.sticker}
              onClick={onSticker}
              onRightClick={deleteSticker}
            />)
            : <DotsLoader/>
        }
        {
          _isAdmin &&
          <AddStickerButton onAddSticker={getStickers} />
        }
      </div>
    </div>
  )
})