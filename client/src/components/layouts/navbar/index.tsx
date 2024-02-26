import { Link } from "react-router-dom"
import Container from "../container"
import Logo from "../logo"
import NavbarItem from "./navbar-item"

export default function Navbar() {
  return (
    <header className="p-2 md:p-4">
      <Container>
        <div className="flex items-center justify-between">
          <Link to={"/"}>
            <Logo />
          </Link>

          <nav className="space-x-2">
            <NavbarItem href="login" label="Login" />
            <NavbarItem href="register" label="Register" />
            <NavbarItem href="dashboard" label="Dashboard" />
          </nav>
        </div>
      </Container>
    </header>
  )
}
