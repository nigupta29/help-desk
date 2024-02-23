import { Route, Routes } from "react-router-dom"

import AppLayout from "./components/layouts/app-layout"
import AuthFormLayout from "./components/layouts/auth-form-layout"
import DashboardLayout from "./components/layouts/dashboard/dashboard-layout"
import ProtectedRoute from "./components/layouts/protected-route"
import Dashboard from "./pages/dashboard"
import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"
import Ticket from "./pages/ticket"
import Tickets from "./pages/tickets"

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route element={<AuthFormLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="tickets/:ticketId" element={<Ticket />} />
            <Route path="*" element={<Dashboard />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}
