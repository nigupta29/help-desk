import useUserStore from "@/hooks/user/use-user-store"
import { Link } from "react-router-dom"
import Container from "../container"
import Logo from "../logo"
import NavbarItem from "./navbar-item"
import LogoutButton from "@/components/features/user/logout-btn"

export default function Navbar() {
  const user = useUserStore((state) => state.user)

  return (
    <header className="p-2 md:p-4 border-b-2">
      <Container>
        <div className="flex items-center justify-between">
          <Link to={"/"}>
            <Logo large />
          </Link>

          <nav className="flex items-center gap-2">
            {user ? (
              <>
                <NavbarItem href="dashboard" label="Dashboard" />
                <LogoutButton />
              </>
            ) : (
              <>
                <NavbarItem href="login" label="Login" />
                <NavbarItem href="register" label="Register" />
              </>
            )}
          </nav>
        </div>
      </Container>
    </header>
  )
}
