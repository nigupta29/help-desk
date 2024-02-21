import { UserSchemaType } from "@/lib/types"
import { create } from "zustand"

type UserState = {
  user: UserSchemaType | null
  setUser: (newUser: UserSchemaType) => void
  removeUser: () => void
}

const useUserStore = create<UserState>()((set) => ({
  user: null,
  setUser: (newUser) => set({ user: newUser }),
  removeUser: () => set({ user: null })
}))

export default useUserStore
