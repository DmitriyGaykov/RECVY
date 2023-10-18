import {useState} from "react";

export const useBurger = (onclick?: () => void) => {
  const [isActive, setIsActive] = useState(false);
  const onClickHandler = () : void => {
    setIsActive(!isActive);
    typeof onclick === 'function' && onclick();
  }

  return [isActive, onClickHandler];
}