import UserOptions from "@/components/features/user/user-option"
import { Separator } from "@/components/ui/separator"
import { LayoutDashboardIcon, TicketSlashIcon } from "lucide-react"
import Logo from "../../logo"
import SidebarItem from "./sidebar-item"

export default function Sidebar() {
  return (
    <aside className="flex h-full w-full flex-col gap-4 p-4">
      <div className="px-4">
        <Logo />
      </div>
      <Separator />
      <nav className="flex flex-grow flex-col space-y-2">
        <SidebarItem
          href="/dashboard"
          label="dashboard"
          Icon={LayoutDashboardIcon}
        />
        <SidebarItem
          href="/dashboard/tickets"
          label="tickets"
          Icon={TicketSlashIcon}
        />
      </nav>
      <Separator />
      <UserOptions />
    </aside>
  )
}
