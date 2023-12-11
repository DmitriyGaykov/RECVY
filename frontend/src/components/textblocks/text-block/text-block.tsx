import {FC, HTMLProps} from "react";

export interface ITextBlock extends HTMLProps<HTMLSpanElement> {
}

export const TextBlock: FC<ITextBlock> = ({className, children, style, onClick}) => {
  return (
    <span className={`text-white ${(className || "")}`} style={style} onClick={onClick}>
      {children}
    </span>
  );
};