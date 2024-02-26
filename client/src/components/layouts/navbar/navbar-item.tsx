import { Link, useLocation } from "react-router-dom"
import { Button } from "../../ui/button"

type Props = {
  href: string
  label: string
}

export default function NavbarItem({ href, label }: Props) {
  const { pathname } = useLocation()

  return (
    <Button
      asChild
      variant={pathname.slice(1) === href ? "secondary" : "outline"}
      size={"lg"}
    >
      <Link to={href}>{label}</Link>
    </Button>
  )
}
