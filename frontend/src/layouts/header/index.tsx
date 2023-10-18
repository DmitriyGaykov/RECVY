import {FC, useState} from "react";
import {TextBlock} from "../../components";
import {BurgerButton} from "../../components/buttons/burger-button";
const Header : FC = () => {
  const [appName] = useState("RECVY");

  return (
    <header className="w-100 header-color p-4 ps-5 d-flex">
      <div className="page-left-side d-flex justify-content-start align-items-center gap-3">
        <BurgerButton />
        <TextBlock className="fw-bold">{appName}</TextBlock>
      </div>
      <div className="container page-right-side">
      </div>
    </header>
  )
}

export default Header;