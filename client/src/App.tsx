import { Route, Routes } from "react-router-dom"

import AuthForm from "./components/layouts/auth-form"
import Dashboard from "./pages/dashboard"
import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"

export default function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route element={<AuthForm />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  )
}
