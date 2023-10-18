import {Route, Routes} from "react-router";
import {RegForm} from "../../entities/reg-form/reg-form.tsx";

export const AuthPage = () => {
  return (
    <div className="min-vh-100 w-100 d-flex justify-content-center align-items-center">
      <Routes>
        <Route path="/reg" element={<RegForm />}/>
      </Routes>
    </div>
  )
}