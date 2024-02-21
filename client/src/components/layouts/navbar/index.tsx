import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import Logo from "../logo"

export default function Navbar() {
  return (
    <div className="flex items-center justify-between p-5">
      <Link to="/">
        <Logo />
      </Link>

      <nav>
        <Button asChild variant={"link"}>
          <Link to="/login">login</Link>
        </Button>
        <Button asChild variant={"link"}>
          <Link to="/register">register</Link>
        </Button>
        <Button asChild variant={"link"}>
          <Link to="/dashboard">dashboard</Link>
        </Button>
      </nav>
    </div>
  )
}
