export default function Footer() {
  return (
    <footer className="gap-2 bg-muted p-6 text-center text-muted-foreground">
      <p>Copyright&copy; {new Date().getFullYear()} helpDesk.</p>
      <p>
        Crafted by <span className="font-bold">Nikhil Gupta</span>
      </p>
    </footer>
  )
}
