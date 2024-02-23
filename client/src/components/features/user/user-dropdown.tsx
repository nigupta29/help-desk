import SidebarItem from "@/components/layouts/dashboard/sidebar/sidebar-item"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible"
import { UserIcon } from "lucide-react"
import LogoutButton from "./logout-button"
import UserAvatar from "./user-avatar"

export default function UserDropdown() {
  return (
    <Collapsible>
      <CollapsibleContent>
        <div className="md:-2 mb-2 flex flex-col gap-2 rounded-md border p-1">
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
        className="h-12 w-full gap-2 md:justify-start"
        asChild
      >
        <CollapsibleTrigger>
          <UserAvatar />
        </CollapsibleTrigger>
      </Button>
    </Collapsible>
  )
}