import { useParams } from "react-router-dom"

export default function Ticket() {
  const { ticketId } = useParams()

  return (
    <div>
      <h3>{ticketId}</h3>
    </div>
  )
}
