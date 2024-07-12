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

      closeCreateActivityModal()
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
        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <Tag className="size-5 text-zinc-400" />
          <input
            name="title"
            placeholder="Qual a atividade?"
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          />
        </div>

        <div className="flex gap-2 items-center">
          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Calendar className="size-5 text-zinc-400" />
            <input
              type="datetime-local"
              name="occurs_at"
              placeholder="Data e hora da atividade"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>
        </div>

        <Button type="submit" size="full">
          Salvar atividade
        </Button>
      </form>
    </Modal>
  )
}

export { CreateActivityModal }
