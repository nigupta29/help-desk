import { Outlet } from "react-router-dom"
import Navbar from "./navbar"
import Container from "./container"

export default function AppLayout() {
  return (
    <div>
      <Navbar />
      <main className="my-10">
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  )
}
