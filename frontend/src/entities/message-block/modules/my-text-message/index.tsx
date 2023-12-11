import {FC, FormEventHandler, memo, useCallback, useEffect, useMemo, useRef} from "react";
import {MessageBlockType} from "../index.ts";
import {dateMapper, decrypt, getDateTime, getTime, useComeBackState, useDecryptor} from "../../../../utils";

export type MyTextMessageCallback = {
  onChange: string;
}

export const MyTextMessage: FC<MessageBlockType & MyTextMessageCallback> = memo((props) => {
  const onInput: FormEventHandler<HTMLDivElement> = useCallback(e => {
    if (typeof props.onChange !== 'function') return;
    props.onChange(e.target.innerText);
  }, [props]);

  const textMessage = useDecryptor(props.message, [props.iduserfrom, props.iduserto]);
  const divRef = useComeBackState<HTMLDivElement>(textMessage, props.onChange == null);

  return (
    <div className="p-2 overflow-hidden light-purple text-white rounded-2 d-flex d-flex flex-column gap-1">
      <div contentEditable={props.onChange != null}
           style={{wordBreak: 'break-all'}}
           onInput={onInput}
           ref={divRef}>
        {
          textMessage
        }
      </div>
      <div className="w-100 fs-7px d-flex justify-content-end">
        {getDateTime(props.sentdate)} { props.isedited && " | edited"}
      </div>
    </div>)
})