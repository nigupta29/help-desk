import { Separator } from "@/components/ui/separator"
import { Outlet } from "react-router-dom"
import Sidebar from "./sidebar"

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      <div className="max-w-xs md:w-3/12">
        <Sidebar />
      </div>
      <Separator orientation="vertical" />
      <div className="flex-grow p-5">
        <Outlet />
      </div>
    </div>
  )
}
