import {FC, HTMLProps} from "react";

export interface ITextBlock extends HTMLProps<HTMLSpanElement> {

}

export const TextBlock : FC<ITextBlock> = ({ className, children }) => {
    return (
        <span className={`text-white fs-1 ${(className || "")}`}>
            { children }
        </span>
    );
};