import { cn } from "@/lib/utils"
import { FileQuestionIcon } from "lucide-react"
import { FC } from "react"

type Props = {
  large?: boolean
}

const Logo: FC<Props> = ({ large }) => {
  return (
    <div className="group flex items-center justify-center space-x-2 md:justify-start">
      <FileQuestionIcon size={large ? 35 : 25} />
      <p className={cn("text-xl font-semibold", large && "text-3xl")}>
        <span className="underline decoration-primary">h</span>
        <span>elpDesk</span>
      </p>
    </div>
  )
}

export default Logo
