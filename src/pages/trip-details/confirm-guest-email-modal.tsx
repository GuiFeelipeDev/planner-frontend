import { Mail } from "lucide-react"
import { Input } from "../../components/input"
import {
  Modal,
  ModalHeader,
  ModalSubtitle,
  ModalTitle,
} from "../../components/modal"
import { Button } from "../../components/button"
import { useMutation } from "@tanstack/react-query"
import { api } from "../../lib/axios"
import { useNavigate, useParams } from "react-router-dom"
import { useLocalStorage } from "../../hooks/use-local-storage"
import { FormEvent } from "react"

interface ConfirmGuestEmailModalProps {
  closeMailConfirmationModal: () => void
}

const ConfirmGuestEmailModal = ({
  closeMailConfirmationModal,
}: ConfirmGuestEmailModalProps) => {
  const { tripId } = useParams()

  const { setLocal } = useLocalStorage("plannr-user-verification")

  const navigate = useNavigate()

  const verifyGuest = useMutation({
    mutationFn: (email: string) =>
      api.post(`/participants/${tripId}/verify`, { email }).then((res) => {
        setLocal(res.data)
        window.document.location.reload()
      }),
    mutationKey: ["verifyGuest"],
    onError: () => navigate("/"),
  })

  const handleVerifyGuests = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const email = formData.get("email")?.toString()

    if (!email) return

    verifyGuest.mutate(email)
  }

  return (
    <Modal>
      <ModalHeader>
        <ModalTitle handleClose={closeMailConfirmationModal}>
          Confirmação de email
        </ModalTitle>
        <ModalSubtitle>Por gentileza, insira seu email abaixo.</ModalSubtitle>
      </ModalHeader>
      <form onSubmit={handleVerifyGuests} className="space-y-2">
        <Input
          type="email"
          placeholder="Seu email"
          icon={<Mail />}
          name="email"
        />
        <Button type="submit" size="full">
          Validar email
        </Button>
      </form>
    </Modal>
  )
}

export default ConfirmGuestEmailModal
