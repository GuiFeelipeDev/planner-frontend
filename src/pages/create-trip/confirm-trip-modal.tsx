import { Mail, User } from "lucide-react"
import { FormEvent } from "react"
import { Button } from "../../components/button"
import {
  Modal,
  ModalHeader,
  ModalSubtitle,
  ModalTitle,
} from "../../components/modal"

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void
  createTrip: (e: FormEvent<HTMLFormElement>) => void
  setOwnerName: (ownerName: string) => void
  setOwnerEmail: (ownerEmail: string) => void
}

const ConfirmTripModal = ({
  closeConfirmTripModal,
  setOwnerName,
  setOwnerEmail,
  createTrip,
}: ConfirmTripModalProps) => {
  return (
    <Modal>
      <ModalHeader>
        <ModalTitle handleClose={closeConfirmTripModal}>
          Confirmar criação de viagem
        </ModalTitle>
        <ModalSubtitle>
          Para concluir a criação da viagem para{" "}
          <span className="font-semibold text-zinc-100">
            Florianópolis, Brasil
          </span>{" "}
          nas datas de{" "}
          <span className="font-semibold text-zinc-100">
            16 a 27 de Agosto de 2024
          </span>{" "}
          preencha seus dados abaixo:
        </ModalSubtitle>
      </ModalHeader>
      <form className="space-y-3" onSubmit={createTrip}>
        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <User className="size-5 text-zinc-400" />
          <input
            name="name"
            placeholder="Seu nome completo"
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            onChange={(e) => setOwnerName(e.target.value)}
          />
        </div>
        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <Mail className="size-5 text-zinc-400" />
          <input
            type="email"
            name="email"
            placeholder="Seu email pessoal"
            onChange={(e) => setOwnerEmail(e.target.value)}
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          />
        </div>
        <Button type="submit" size="full">
          Confirmar criação da viagem
        </Button>
      </form>
    </Modal>
  )
}

export { ConfirmTripModal }
