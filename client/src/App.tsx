import { Route, Routes } from "react-router-dom"
import AppLayout from "./components/layouts/app-layout"
import AuthFormLayout from "./components/layouts/auth-form-layout"
import AdminRoutes from "./components/layouts/dashboard/admin-routes"
import DashboardLayout from "./components/layouts/dashboard/dashboard-layout"
import ProtectedRoutes from "./components/layouts/dashboard/protected-routes"
import Dashboard from "./pages/dashboard"
import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"
import Ticket from "./pages/ticket"
import Tickets from "./pages/tickets"
import Users from "./pages/users"

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
      {/* Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="tickets/:ticketId" element={<Ticket />} />

          {/* Admin Routes */}
          <Route element={<AdminRoutes />}>
            <Route path="users" element={<Users />} />
          </Route>

          {/* TODO: Add Not Found Route */}
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  )
}
