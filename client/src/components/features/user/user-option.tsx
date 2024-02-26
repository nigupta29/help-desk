import SidebarItem from "@/components/layouts/dashboard/sidebar/sidebar-item"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible"
import { UserIcon } from "lucide-react"
import LogoutButton from "./logout-btn"
import UserAvatar from "./user-avatar"

export default function UserOptions() {
  return (
    <Collapsible>
      <CollapsibleContent>
        <div className="mb-2 flex flex-col gap-2">
          <SidebarItem
            href="/dashboard/profile"
            label="Profile"
            Icon={UserIcon}
          />
          <LogoutButton />
        </div>
      </CollapsibleContent>
      <Button
        variant="ghost"
        className="h-12 w-full justify-start gap-2"
        asChild
      >
        <CollapsibleTrigger>
          <UserAvatar />
        </CollapsibleTrigger>
      </Button>
    </Collapsible>
  )
}
