import { Outlet } from "react-router-dom"
import Container from "./container"
import Footer from "./footer"
import Navbar from "./navbar"

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="my-10 flex-grow">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  )
}
