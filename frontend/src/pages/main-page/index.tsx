import Header from "../../layouts/header";
import {Route, Routes} from "react-router";
import {MessagePage} from "./modules";

export const MainPage = () => {
  return (
    <div className="main-page h-100 height-100vh d-flex flex-column">
      <Header/>

      <Routes>
        <Route path='/messages' element={<MessagePage />}/>
      </Routes>
    </div>
  )
}