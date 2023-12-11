import {FC, HTMLProps, useState} from "react";
import {ListLink} from "../../components";
import {useCurrentStoreUser} from "../../store";
import {isAdmin} from "../../utils";

export const NavMainPageMenu : FC<HTMLProps<HTMLUListElement>> = ({ className }) => {
  const currentUser = useCurrentStoreUser();
  const [_isAdmin] = useState(isAdmin(currentUser));

  return (
    <ul className={`m-0 d-flex align-items-center justify-content-end gap-5 ${className || ""}`}>
      {
        _isAdmin &&
        <ListLink href="/blocked-users">Нарушители</ListLink>
      }
      <ListLink href="/people">Люди</ListLink>
    </ul>
  )
}