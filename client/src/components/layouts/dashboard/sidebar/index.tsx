import CreateTicket from "@/components/features/ticket/create-ticket"
import UserOptions from "@/components/features/user/user-option"
import { Separator } from "@/components/ui/separator"
import useUserStore from "@/hooks/user/use-user-store"
import { LayoutDashboardIcon, TicketSlashIcon, UsersIcon } from "lucide-react"
import Logo from "../../logo"
import SidebarItem from "./sidebar-item"
import { USER_ROLE } from "@/lib/constant"

export default function Sidebar() {
  const user = useUserStore((state) => state.user)

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
        {user?.role === USER_ROLE.Values.ADMIN && (
          <>
            <SidebarItem
              href="/dashboard/users"
              label="Users"
              Icon={UsersIcon}
            />
          </>
        )}
      </nav>
      <Separator />
      {user?.role === "USER" && <CreateTicket />}
      <UserOptions />
    </aside>
  )
}
