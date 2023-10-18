import {IButton} from "../button.interface.ts";
import {FC} from "react";
import {useBurger} from "../../../utils";

export const BurgerButton : FC<IButton> = ({ className, onClick }) => {
  const [isActive, onBurger] = useBurger(onClick);

  return (
    <div className={`d-flex flex-column justify-content-center gap-2  ${className} ${isActive && 'rotate-on-90'}`} style={{ width: "30px" }} onClick={onBurger}>
      <div className="bg-white w-100 rounded-1 bg-dark" style={{ height: "3px" }}></div>
      <div className="bg-white w-100 rounded-1" style={{ height: "3px" }}></div>
      <div className="bg-white w-100 rounded-1" style={{ height: "3px" }}></div>
    </div>
  );
}