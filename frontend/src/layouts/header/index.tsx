import {FC, useState} from "react";
import { TextBlock} from "../../components";
import {BurgerButton} from "../../components/buttons/burger-button";
import styles from './header.module.scss';
import {BurgerMenu, DescriptionModal, NavMainPageMenu} from "../../entities";
import {useHeaderText} from "../../utils/hooks/use-header-text.ts";
import {isMainAdmin, useGetMenu, useIsAdmin} from "../../utils";
import {useStoreCurrentChat} from "../../store";
import {Link} from "react-router-dom";

const Header: FC = () => {
  const [appName] = useState("RECVY");
  const centerText = useHeaderText();
  const [showModal, clickShowModal] = useGetMenu();
  const [showBgMenu, clickShowBgMenu] = useGetMenu();
  const userid = useStoreCurrentChat();

  const { isAdmin } = useIsAdmin(userid);

  return (
    <header className="site-header w-100 header-color p-3 ps-3 d-flex min-width-300">
      <div className="page-left-side d-flex justify-content-start align-items-center gap-3">
        <BurgerButton onClick={clickShowBgMenu} dependency={showBgMenu}/>
        <Link to="/messages" className="text-decoration-none">
          <TextBlock className="fw-bold header-text-size">{appName}</TextBlock>
        </Link>
      </div>
      <div className={`container page-right-side ${styles.gridWrapper}`}>
        <TextBlock
          className={`usual-text-size d-flex flex-column justify-content-center align-items-center fw-semibold ${isAdmin && 'stress-admin-name'} ${styles.center}`}
          onClick={clickShowModal}
        >
          {centerText}
        </TextBlock>
        <NavMainPageMenu className={`${styles.right}`}/>
      </div>
      {
        showModal &&
        <DescriptionModal userid={userid} onCross={clickShowModal}/>
      }
      {
        showBgMenu &&
        <BurgerMenu appName={appName} onBlackZone={clickShowBgMenu}/>
      }
    </header>
  )
}

export default Header;