import {FC, HTMLProps} from "react";
import {NavLink} from "react-router-dom";

export const ListLink : FC<HTMLProps<HTMLUListElement>> = ({ className, children, href }) => {
  return (
    <li>
      <NavLink to={href || '#'} className={`link-light fw-semibold text-decoration-none above-usual-text-size ${className || ""}`}>
        { children }
      </NavLink>
    </li>
  )
}