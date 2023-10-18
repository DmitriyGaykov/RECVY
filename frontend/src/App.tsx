import {FC} from 'react';
import './assets/styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/colors.scss'
import './assets/styles/global-styles.scss'
import {Route, Routes} from "react-router";
import {AuthPage, MainPage} from "./pages";

const App : FC = () => {
  return (
    <div className="min-vh-100 w-100 bg-color">
      <Routes>
        <Route index path="/" element={<MainPage />}/>
        <Route index path="/auth/*" element={<AuthPage />}/>
      </Routes>
    </div>
  )
}

export default App
