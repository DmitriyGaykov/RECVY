import {FC, memo} from "react";
import {useLocation, useNavigate} from "react-router";

export type NavButtonProps = {
  to: string;
  children: string;
  onClick?: () => void;
}
export const NavButton: FC<NavButtonProps> = memo(({to, children, onClick}) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    onClick?.();
    navigate(to);
  }

  return (
    <button className="btn pink-color text-white fs-10px fw-bold"
            onClick={clickHandler}>{children}</button>
  )
});