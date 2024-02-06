import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./loginScreen/loginScreen";
import RegisterScreen from "./registerScreen/registerScreen";

export default function RoutesDoc() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  element={<LoginScreen />} path="/" />
        <Route  element={<RegisterScreen />} path="/register" />
      </Routes>
    </BrowserRouter>
  );
}
