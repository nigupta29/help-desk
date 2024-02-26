import { Loader2Icon } from "lucide-react"

type Props = { label?: string }

export default function Loader({ label = "Loading" }: Props) {
  return (
    <div
      aria-label="Loading..."
      role="status"
      className="flex h-full w-full animate-pulse items-center justify-center space-x-2"
    >
      <Loader2Icon size={30} className="animate-spin" />
      <p className="font-medium text-inherit">{`${label}...`}</p>
    </div>
  )
}
