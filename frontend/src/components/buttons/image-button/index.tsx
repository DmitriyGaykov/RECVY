import {IButton} from "../button.interface.ts";
import {FC, memo} from "react";

export const ImageButton: FC<IButton & { src: string, style: StyleSheet }> = memo(({
                                                                                     onClick,
                                                                                     className,
                                                                                     src,
                                                                                     style
                                                                                   }) => {
  return (
    <img src={src} onClick={onClick} className={className}
         style={Object.assign({}, style, {cursor: 'pointer', objectFit: 'contain', borderRadius: '10000px'})}/>
  );
})