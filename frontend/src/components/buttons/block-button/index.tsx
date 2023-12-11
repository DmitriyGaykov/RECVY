import {IButton} from "../button.interface.ts";
import {FC, memo} from "react";
import {useBlocker} from "../../../utils";

export type BlockButtonProps = {
  userid: string;
  onReason?: (reason: string) => void;
};

export const BlockButton: FC<BlockButtonProps> = memo(({userid, onReason}) => {
  const {isBlocked, block, unblock} = useBlocker(userid, onReason);
  return (
    <>
      {
        !isBlocked ?
          <button className='btn btn-danger fw-bold fs-10px' onClick={() => block(userid)}>Заблокировать</button> :
          <button className='btn btn-success fw-bold fs-10px' onClick={() => unblock(userid)}>Разблокировать</button>
      }
    </>
  )
})