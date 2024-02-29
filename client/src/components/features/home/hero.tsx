import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

export default function Hero() {
  return (
    <div className="mx-auto max-w-xl space-y-6 text-center text-muted-foreground">
      <h1 className="mb-4 text-4xl font-bold text-secondary-foreground">
        Welcome to the Help Desk Application!
      </h1>

      <h5 className="text-lg">
        This application allows you to manage tickets related to your products,
        providing a seamless experience for users and support teams.
      </h5>

      <Table className="border">
        <TableCaption>Your you can register with dump account.</TableCaption>
        <TableHeader className="bg-secondary">
          <TableRow>
            <TableHead className="text-center">ROLE</TableHead>
            <TableHead className="text-center">EMAIL</TableHead>
            <TableHead className="text-center">PASSWORD</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>USER</TableCell>
            <TableCell>john_doe@gmail.com</TableCell>
            <TableCell>123456</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>SUPPORT</TableCell>
            <TableCell>mia.baker@gmail.com</TableCell>
            <TableCell>123456</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ADMIN</TableCell>
            <TableCell>admin@helpdesk.com</TableCell>
            <TableCell>admin123456</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div>
        <p>
          This project is built with React, Tailwind CSS, Shadow, Express,
          Prisma, and TypeScript.
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
