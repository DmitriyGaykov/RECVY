import {FC, HTMLProps} from "react";
import {ListLink} from "../../components";

export const NavMainPageMenu : FC<HTMLProps<HTMLUListElement>> = ({ className }) => {
  return (
    <ul className={`m-0 d-flex align-items-center justify-content-end gap-5 ${className || ""}`}>
      <ListLink href="/friends">Друзья</ListLink>
      <ListLink href="/subscribers">Подпищики</ListLink>
    </ul>
  )
}