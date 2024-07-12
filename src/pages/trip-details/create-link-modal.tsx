import { Link2, Tag } from "lucide-react"
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
import { TripUrl } from "../../interfaces/interfaces"

interface CreateLinkModalProps {
  closeCreateLinkModal: () => void
}

const CreateLinkModal = ({ closeCreateLinkModal }: CreateLinkModalProps) => {
  const { tripId } = useParams()

  const queryClient = useQueryClient()

  const createLink = useMutation({
    mutationFn: (data: TripUrl) => api.post(`/trips/${tripId}/links`, data),
    mutationKey: ["createLink", tripId],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["fetchLinks"],
      })
      closeCreateLinkModal()
    },
  })

  const handleCreateLink = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const title = formData.get("title")?.toString()
    const url = formData.get("url")?.toString()

    if (!title || !url) return

    createLink.mutate({ title, url })
  }

  return (
    <Modal>
      <ModalHeader>
        <ModalTitle handleClose={closeCreateLinkModal}>
          Cadastrar link
        </ModalTitle>
        <ModalSubtitle>
          Todos convidados podem visualizar os links importantes.
        </ModalSubtitle>
      </ModalHeader>
      <form onSubmit={handleCreateLink} className="space-y-2">
        <Input icon={<Tag />} placeholder="Titulo do link" name="title" />
        <Input icon={<Link2 />} type="url" placeholder="URL" name="url" />
        <Button type="submit" size="full" isLoading={createLink.isPending}>
          Salvar link
        </Button>
      </form>
    </Modal>
  )
}

export { CreateLinkModal }
