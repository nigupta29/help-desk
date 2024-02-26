import { Separator } from "@/components/ui/separator"
import { Outlet } from "react-router-dom"
import Sidebar from "./sidebar"

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      <div className="min-w-64">
        <Sidebar />
      </div>
      <Separator orientation="vertical" />
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  )
}
