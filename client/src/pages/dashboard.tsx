export default function Dashboard() {
  return (
    <div className="space-y-6 text-muted-foreground">
      <h1 className="mb-4 text-4xl font-bold text-secondary-foreground">
        Dashboard
      </h1>

      <div>
        <h3 className="mb-2 text-lg font-semibold text-secondary-foreground">
          Welcome to the Help Desk Application!
        </h3>
        <p>
          This application allows you to manage tickets related to your
          products, providing a seamless experience for users and support teams.
        </p>
        <p>
          It features multi-user role functionality, catering to different
          responsibilities within the ticket management process.
        </p>
      </div>

      <div>
        <p className="font-bold">User Role:</p>
        <p>
          Users can create tickets, update their ticket details (title and
          description), and add follow-up messages.
        </p>
      </div>

      <div>
        <p className="font-bold">Support Role:</p>
        <p>
          Support members can access and claim tickets to provide resolutions.
        </p>
        <p>
          They can set the status and priority of the ticket, working on
          unassigned tickets and their assigned ones.
        </p>
      </div>

      <div>
        <p className="font-bold">Admin Role:</p>
        <p>
          Admins have the authority to modify tickets, assign tickets to
          support, and make necessary changes as per user requests.
        </p>
      </div>

      <div>
        <p>
          This project is built with React, Tailwind/ShadCN-UI, Express, Prisma,
          and TypeScript.
        </p>
        <p>
          For updates and more information, check out the{" "}
          <a
            href="https://github.com/nigupta29/help-desk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            GitHub repository
          </a>
          .
        </p>
      </div>
    </div>
  )
}
