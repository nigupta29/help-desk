import { Outlet } from "react-router-dom"
import { Separator } from "../ui/separator"

export default function DashboardLayout() {
  return (
    <div className="flex">
      <aside className="">Sidebar</aside>
      <Separator />
      <main className="col-span-9">
        <Outlet />
      </main>
    </div>
  )
}
