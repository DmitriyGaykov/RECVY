import {FC, useEffect} from 'react';
import './assets/styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/colors.scss'
import './assets/styles/global-styles.scss'
import {Route, Routes} from "react-router";
import {AuthPage, MainPage} from "./pages";
import {useTokenLogin} from "./utils";

const App : FC = () => {
  const currentUser = useTokenLogin();

  return (
    <div className="min-vh-100 w-100 bg-color height-100vh">
      <Routes>
        {
          currentUser ?
            <>
              <Route index path="/*" element={<MainPage />}/>
            </>
             :
            <>
              <Route index path="/auth/*" element={<AuthPage />}/>
              <Route index path="/*" element={<AuthPage />}/>
            </>
        }
      </Routes>
    </div>
  )
}

export default App
