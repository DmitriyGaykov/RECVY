import Header from "../../layouts/header";
import {Route, Routes} from "react-router";
import {BlockedUsersPage, MessagePage, PeoplePage} from "./modules";
import {
  useCurrentStoreUser,
  useGetMessage,
  useOnlineChecker,
  useUserBlockHandler,
  useUserDeleteHandler
} from "../../store";
import React, {useState} from "react";
import {isAdmin} from "../../utils";

export const MainPage = () => {
  const currentUser = useCurrentStoreUser();
  const [_isAdmin] = useState(isAdmin(currentUser));

  useGetMessage();
  useOnlineChecker();
  useUserDeleteHandler();
  useUserBlockHandler();

  return (
    <div className="main-page h-100 height-100vh max-height-100vh d-flex flex-column">
      <Header/>

      <Routes>
        <Route path='/messages' element={<MessagePage />}/>
        <Route path='/people' element={<PeoplePage />}/>
        {
          _isAdmin &&
          <Route path='/blocked-users' element={<BlockedUsersPage />}/>
        }
        <Route path='*' element={<MessagePage />}/>
      </Routes>
    </div>
  )
}