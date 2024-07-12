import { X } from "lucide-react"
import { ReactNode } from "react"

export function ModalHeader({ children }: ModalProps) {
  return <div className="space-y-2">{children}</div>
}

interface ModalTileProps {
  children: ReactNode
  handleClose: () => void
}

export function ModalTitle({ handleClose, children }: ModalTileProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <h2 className="text-lg font-semibold">{children}</h2>
      <button type="button" onClick={handleClose}>
        <X className="size-5 text-zinc-400" />
      </button>
    </div>
  )
}

export function ModalSubtitle({ children }: ModalProps) {
  return <p className="text-sm text-zinc-400">{children}</p>
}

interface ModalProps {
  children: ReactNode
}

const Modal = ({ children }: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        {children}
      </div>
    </div>
  )
}

export { Modal }
