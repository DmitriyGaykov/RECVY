import { useState} from "react";

export const useGetMenu = () : [boolean, () => void] => {
  const [showMenu, setShowMenu] = useState(false);
  const changeShowMenuValue = () => setShowMenu(!showMenu);

  return [showMenu, changeShowMenuValue];
}