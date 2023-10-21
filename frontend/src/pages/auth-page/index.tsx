import {Route, Routes} from "react-router";
import {RegForm} from "../../entities/reg-form/reg-form.tsx";
import {LoginForm} from "../../entities/login-form";

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