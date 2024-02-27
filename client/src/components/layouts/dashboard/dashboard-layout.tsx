import { Separator } from "@/components/ui/separator"
import { Outlet } from "react-router-dom"
import Sidebar from "./sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      <div className="min-w-64">
        <Sidebar />
      </div>
      <Separator orientation="vertical" />
      <ScrollArea className="h-screen flex-grow p-4 pb-10">
        <main className="container mx-auto">
          <Outlet />
        </main>
      </ScrollArea>
    </div>
  )
}
