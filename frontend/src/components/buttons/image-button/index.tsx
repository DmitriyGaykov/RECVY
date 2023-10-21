import {IButton} from "../button.interface.ts";
import {FC} from "react";

export const ImageButton : FC<IButton & {src: string}> = ({ onClick, className, src }) => {
  return (
    <img src={src} onClick={onClick} className={className} style={{cursor: 'pointer'}}/>
  );
}