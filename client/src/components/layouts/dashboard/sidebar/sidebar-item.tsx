import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

type Props = {
  href: string
  Icon: LucideIcon
  label: string
}

export default function SidebarItem({ href, label, Icon }: Props) {
  const { pathname } = useLocation()
  const activeRoute = pathname === href

  return (
    <Button
      asChild
      variant={activeRoute ? "secondary" : "ghost"}
      className="gap-2 md:justify-start"
    >
      <Link to={href}>
        <Icon />
        <span className="hidden text-base capitalize md:block">{label}</span>
      </Link>
    </Button>
  )
}
