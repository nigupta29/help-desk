import LogoutButton from "@/components/features/user/logout-button"
import { Button } from "@/components/ui/button"
import useUserStore from "@/hooks/user/use-user-store"
import { Link } from "react-router-dom"
import Logo from "../logo"

export default function Navbar() {
  const user = useUserStore((state) => state.user)

  return (
    <div className="flex items-center justify-between p-5">
      <Link to={user ? "/dashboard" : "/"}>
        <Logo />
      </Link>

      <nav className="flex items-center space-x-2">
        {user ? (
          <>
            <p>{`Hello! ${user.name}`}</p>
            <LogoutButton />
          </>
        ) : (
          <>
            <Button asChild variant={"link"}>
              <Link to="/login">login</Link>
            </Button>
            <Button asChild variant={"link"}>
              <Link to="/register">register</Link>
            </Button>
          </>
        )}
      </nav>
    </div>
  )
}
