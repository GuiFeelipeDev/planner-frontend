import { Mail } from "lucide-react"
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

interface AddParticipantModalProps {
  closeAddParticipantModal: () => void
}

const AddParticipantModal = ({
  closeAddParticipantModal,
}: AddParticipantModalProps) => {
  const { tripId } = useParams()

  const queryClient = useQueryClient()

  const createParticipant = useMutation({
    mutationFn: (email: string) =>
      api.post(`/trips/${tripId}/invites`, { email }),
    mutationKey: ["createGuest", tripId],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["fetchGuests"],
      })
      closeAddParticipantModal()
    },
  })

  const handleAddParticipant = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email")?.toString()

    if (!email) return

    createParticipant.mutate(email)
  }

  return (
    <Modal>
      <ModalHeader>
        <ModalTitle handleClose={closeAddParticipantModal}>
          Convidar novo participante
        </ModalTitle>
        <ModalSubtitle>
          Todos convidados podem visualizar as informações da viagem.
        </ModalSubtitle>
      </ModalHeader>
      <form onSubmit={handleAddParticipant} className="space-y-2">
        <Input
          icon={<Mail />}
          placeholder="Email do participante"
          name="email"
        />
        <Button
          type="submit"
          size="full"
          isLoading={createParticipant.isPending}
        >
          Convidar participante
        </Button>
      </form>
    </Modal>
  )
}

export { AddParticipantModal }
