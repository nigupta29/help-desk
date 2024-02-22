import { cn } from "@/lib/utils"
import { FileQuestionIcon } from "lucide-react"
import { FC } from "react"

type Props = {
  large?: boolean
}

const Logo: FC<Props> = ({ large }) => {
  return (
    <div className="group flex items-start justify-center space-x-2 px-4 md:justify-start">
      <FileQuestionIcon size={large ? 35 : 25} />
      <p
        className={cn(
          "hidden text-xl font-semibold md:block ",
          large && "text-3xl"
        )}
      >
        <span className="underline decoration-primary">h</span>
        <span>elpDesk</span>
        <span
          className={cn(
            "text-5xl text-primary",
            large && "text-7xl",
            "leading-[1px]"
          )}
        >
          .
        </span>
      </p>
    </div>
  )
}

export default Logo
