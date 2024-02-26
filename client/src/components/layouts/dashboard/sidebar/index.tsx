import { Separator } from "@/components/ui/separator"
import {
  LayoutDashboardIcon,
  MegaphoneIcon,
  TicketSlashIcon
} from "lucide-react"
import Logo from "../../logo"
import SidebarItem from "./sidebar-item"

export default function Sidebar() {
  return (
    <aside className="flex h-full w-full flex-col gap-4 p-4">
      <div className="px-4">
        <Logo />
      </div>
      <Separator />
      <nav className="flex flex-col space-y-2">
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
        <SidebarItem
          href="/dashboard/activity"
          label="activity"
          Icon={MegaphoneIcon}
        />
      </nav>
    </aside>
  )
}
