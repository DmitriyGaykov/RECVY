import {Route, Routes} from "react-router";
import {LoginForm, RegForm} from "../../entities";

export const AuthPage = () => {
  return (
    <div className="min-vh-100 w-100 d-flex justify-content-center align-items-center">
      <Routes>
        <Route path="/reg" element={<RegForm />}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/*" element={<LoginForm/>}/>
      </Routes>
    </div>
  )
}