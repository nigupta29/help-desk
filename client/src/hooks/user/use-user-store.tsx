import { UserSchemaType } from "@/lib/types"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type UserState = {
  user: UserSchemaType | null
  setUser: (newUser: UserSchemaType) => void
  removeUser: () => void
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (newUser) => set({ user: newUser }),
      removeUser: () => set({ user: null })
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

export default useUserStore
