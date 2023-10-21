import {FC, useState} from "react";
import {TextBlock} from "../../components";
import {BurgerButton} from "../../components/buttons/burger-button";
import styles from './header.module.scss';
import {NavMainPageMenu} from "../../entities";

const Header: FC = () => {
  const [appName] = useState("RECVY");

  return (
    <header className="site-header w-100 header-color p-3 ps-3 d-flex min-width-300">
      <div className="page-left-side d-flex justify-content-start align-items-center gap-3">
        <BurgerButton/>
        <TextBlock className="fw-bold header-text-size">{appName}</TextBlock>
      </div>
      <div className={`container page-right-side ${styles.gridWrapper}`}>
        <TextBlock className={`usual-text-size d-flex justify-content-center align-items-center fw-semibold ${styles.center}`}>Dmitriy</TextBlock>
        <NavMainPageMenu className={`${styles.right}`}/>
      </div>
    </header>
  )
}

export default Header;