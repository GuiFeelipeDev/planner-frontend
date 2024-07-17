import { User } from "lucide-react"
import { Input } from "../../components/input"
import {
  Modal,
  ModalHeader,
  ModalSubtitle,
  ModalTitle,
} from "../../components/modal"
import { Button } from "../../components/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "../../lib/axios"
import { useParams } from "react-router-dom"
import { FormEvent } from "react"
import { useLocalStorage } from "../../hooks/use-local-storage"
import { localUserProps } from "../../interfaces/interfaces"

interface ConfirmTripGuestModalProps {
  closeGuestConfirmationModal: () => void
  tripDestination: string
}

interface ConfirmGuestData {
  name: string
  email: string
}

const ConfirmTripGuestModal = ({
  closeGuestConfirmationModal,
  tripDestination,
}: ConfirmTripGuestModalProps) => {
  const { tripId } = useParams()

  const { getFromLocal } = useLocalStorage<localUserProps>(
    "plannr-user-verification"
  )

  const queryClient = useQueryClient()

  const confirmGuest = useMutation({
    mutationFn: (data: ConfirmGuestData) =>
      api.post(`/participants/${tripId}/confirm`, data),
    mutationKey: ["confirmGuest"],
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["fetchGuests"] })
      closeGuestConfirmationModal()
    },
  })

  const handleConfirmGuest = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const name = formData.get("name")?.toString()
    const email = getFromLocal()?.email

    if (!name || !email) return

    confirmGuest.mutate({ name, email })
  }

  return (
    <Modal>
      <ModalHeader>
        <ModalTitle handleClose={closeGuestConfirmationModal}>
          Confirmação de presença
        </ModalTitle>
        <ModalSubtitle>
          Confirme sua presença na viagem para {tripDestination}
        </ModalSubtitle>
      </ModalHeader>
      <form onSubmit={handleConfirmGuest} className="space-y-2">
        <Input placeholder="Seu nome completo" icon={<User />} name="name" />
        <Button type="submit" size="full">
          Eu confirmo minha participação!
        </Button>
      </form>
    </Modal>
  )
}

export default ConfirmTripGuestModal
