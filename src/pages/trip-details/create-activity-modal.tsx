import { Calendar, Tag } from "lucide-react"
import { Button } from "../../components/button"
import { FormEvent } from "react"
import { api } from "../../lib/axios"
import { useParams } from "react-router-dom"
import {
  Modal,
  ModalHeader,
  ModalSubtitle,
  ModalTitle,
} from "../../components/modal"
import { Input } from "../../components/input"

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void
}

const CreateActivityModal = ({
  closeCreateActivityModal,
}: CreateActivityModalProps) => {
  const { tripId } = useParams()

  const createActivity = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const activityData = {
      title: formData.get("title")?.toString(),
      occurs_at: formData.get("occurs_at")?.toString(),
    }

    try {
      await api.post(`trips/${tripId}/activities`, activityData)

      window.document.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal>
      <ModalHeader>
        <ModalTitle handleClose={closeCreateActivityModal}>
          Cadastrar atividade
        </ModalTitle>
        <ModalSubtitle>
          Todos os convidados podem visualizar as atividades.
        </ModalSubtitle>
      </ModalHeader>
      <form onSubmit={createActivity} className="space-y-3">
        <Input name="title" placeholder="Qual a atividade?" icon={<Tag />} />
        <Input
          type="datetime-local"
          name="occurs_at"
          placeholder="Data e hora da atividade"
          icon={<Calendar />}
        />
        <Button type="submit" size="full">
          Salvar atividade
        </Button>
      </form>
    </Modal>
  )
}

export { CreateActivityModal }
