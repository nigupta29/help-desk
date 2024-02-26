import { Route, Routes } from "react-router-dom"
import AppLayout from "./components/layouts/app-layout"
import AuthFormLayout from "./components/layouts/auth-form-layout"
import DashboardLayout from "./components/layouts/dashboard/dashboard-layout"
import ProtectedRoutes from "./components/layouts/dashboard/protected-routes"
import Dashboard from "./pages/dashboard"
import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route element={<AuthFormLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  )
}
