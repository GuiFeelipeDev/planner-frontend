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
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void
}

interface NewActivity {
  title: string
  occurs_at: string
}

const CreateActivityModal = ({
  closeCreateActivityModal,
}: CreateActivityModalProps) => {
  const { tripId } = useParams()

  const queryClient = useQueryClient()

  const createActivity = useMutation({
    mutationFn: (activityData: NewActivity) =>
      api.post(`trips/${tripId}/activities`, activityData),
    mutationKey: ["createActivity"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchActivities"] })
      closeCreateActivityModal()
    },
  })

  const handleCreateActivity = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const title = formData.get("title")?.toString()
    const occurs_at = formData.get("occurs_at")?.toString()

    if (!title || !occurs_at) return

    const activityData: NewActivity = {
      title,
      occurs_at,
    }

    createActivity.mutate(activityData)
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
      <form onSubmit={handleCreateActivity} className="space-y-3">
        <Input name="title" placeholder="Qual a atividade?" icon={<Tag />} />
        <Input
          type="datetime-local"
          name="occurs_at"
          placeholder="Data e hora da atividade"
          icon={<Calendar />}
        />
        <Button disabled={createActivity.isPending} type="submit" size="full">
          Salvar atividade
        </Button>
      </form>
    </Modal>
  )
}

export { CreateActivityModal }
