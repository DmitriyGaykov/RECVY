import './vite-env.d';
import {FC, useEffect} from 'react';
import './assets/styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/colors.scss'
import './assets/styles/global-styles.scss'
import {Route, Routes} from "react-router";
import {AuthPage, MainPage} from "./pages";
import {useTokenLogin} from "./utils";
import {useCreateSocket, useGetMessage, useOnlineChecker, useSetSocketName} from "./store";

const App: FC = () => {
  const {currentUser, isLoading} = useTokenLogin();
  useCreateSocket();
  useSetSocketName(currentUser?.id);

  return (
    <div className="min-vh-100 max-height-100vh w-100 bg-color height-100vh">
      {
        !isLoading &&
        <Routes>
          {
            currentUser ?
              <>
                <Route index path="/*" element={<MainPage/>}/>
              </>
              :
              <>
                <Route index path="/auth/*" element={<AuthPage/>}/>
                <Route index path="/*" element={<AuthPage/>}/>
              </>
          }
        </Routes>
      }
    </div>
  )
}

export default App
