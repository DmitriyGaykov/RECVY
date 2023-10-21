import {FC, HTMLProps} from "react";

export interface ITextBlock extends HTMLProps<HTMLSpanElement> {}

export const TextBlock : FC<ITextBlock> = ({ className, children, style }) => {
    return (
        <span className={`text-white ${(className || "")}`} style={style}>
            { children }
        </span>
    );
};