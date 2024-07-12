import { Mail, User } from "lucide-react"
import { FormEvent } from "react"
import { Button } from "../../components/button"
import {
  Modal,
  ModalHeader,
  ModalSubtitle,
  ModalTitle,
} from "../../components/modal"
import { Input } from "../../components/input"

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
        <Input
          name="name"
          placeholder="Seu nome completo"
          onChange={(e) => setOwnerName(e.target.value)}
          icon={<User />}
        />

        <Input
          type="email"
          name="email"
          placeholder="Seu email pessoal"
          onChange={(e) => setOwnerEmail(e.target.value)}
          icon={<Mail />}
        />

        <Button type="submit" size="full">
          Confirmar criação da viagem
        </Button>
      </form>
    </Modal>
  )
}

export { ConfirmTripModal }
