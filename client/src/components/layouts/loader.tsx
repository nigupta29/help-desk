import { cn } from "@/lib/utils"
import { Loader2Icon } from "lucide-react"

type Props = { label?: string; className?: string }

export default function Loader({ label = "Loading", className = "" }: Props) {
  return (
    <div
      aria-label="Loading..."
      role="status"
      className={cn(
        "flex h-full w-full animate-pulse items-center justify-center space-x-2",
        className
      )}
    >
      <Loader2Icon size={30} className="animate-spin" />
      <p className="font-medium text-inherit">{`${label}...`}</p>
    </div>
  )
}
