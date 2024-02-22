import { Separator } from "@/components/ui/separator"
import Logo from "../../logo"
import CreateTicket from "@/components/features/ticket/create-ticket"
import SidebarItem from "./sidebar-item"
import {
  LayoutDashboardIcon,
  MegaphoneIcon,
  TicketSlashIcon
} from "lucide-react"
import UserDropdown from "@/components/features/user/user-dropdown"

export default function Sidebar() {
  return (
    <div className="flex h-full w-full flex-col gap-5 p-1 py-5 md:p-5">
      <Logo />
      <Separator />
      <div className="flex flex-grow flex-col space-y-2">
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
      </div>
      <UserDropdown />
      <CreateTicket />
    </div>
  )
}
