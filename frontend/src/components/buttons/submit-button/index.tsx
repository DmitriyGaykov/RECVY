import {FC} from "react";
import {IButton} from "../button.interface.ts";

export const SubmitButton : FC<IButton> = ({children, className}) => {
  return (
    <button type="submit" className={`btn pink-color bg-opacity-25 text-white fw-bold w-50 ${className || ""}`}>{ children }</button>
  )
}