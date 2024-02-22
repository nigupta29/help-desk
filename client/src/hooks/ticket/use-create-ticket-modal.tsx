import { create } from "zustand"

type TicketModalState = {
  open: boolean
  toggle: () => void
}

const useCreateTicketModal = create<TicketModalState>()((set) => ({
  open: false,
  toggle: () => set((state) => ({ open: !state.open }))
}))

export default useCreateTicketModal
