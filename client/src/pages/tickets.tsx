import TicketTable from "@/components/features/ticket/ticket-table"

export default function Tickets() {
  return (
    <>
      <h1 className="mb-2 text-4xl font-bold tracking-tight">Tickets</h1>
      <p className="mb-6 text-lg text-muted-foreground">
        Manage your tickets below.
      </p>

      <TicketTable />
    </>
  )
}
