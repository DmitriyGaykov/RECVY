import {FC} from "react";
import {IButton} from "../button.interface.ts";

export const RadialButton: FC<IButton> = ({children, onClick, content, className, type}) => {
  return (
    <button content={content} onClick={onClick} type={type}
            className={`btn rounded-2 ${className || ""}`}>{children}</button>
  )
}