import { AtSign, Plus, X } from "lucide-react"
import { FormEvent } from "react"
import { Button } from "../../components/button"
import {
  Modal,
  ModalHeader,
  ModalSubtitle,
  ModalTitle,
} from "../../components/modal"
import { Input } from "../../components/input"

interface InviteGuestsModalProps {
  closeGuestsModal: () => void
  emailsToInvite: string[]
  removeEmailFromInvites: (emailToRemove: string) => void
  addNewEmailToInvite: (e: FormEvent<HTMLFormElement>) => void
}

const InviteGuestsModal = ({
  addNewEmailToInvite,
  closeGuestsModal,
  emailsToInvite,
  removeEmailFromInvites,
}: InviteGuestsModalProps) => {
  return (
    <Modal>
      <ModalHeader>
        <ModalTitle handleClose={closeGuestsModal}>
          Selecionar convidados
        </ModalTitle>
        <ModalSubtitle>
          Os convidados irão receber e-mails para confirmar a participação na
          viagem.
        </ModalSubtitle>
      </ModalHeader>
      <div className="flex flex-wrap gap-2">
        {emailsToInvite.map((email, index) => {
          return (
            <div
              key={index}
              className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
            >
              <span className="text-zinc-300">{email}</span>
              <button
                type="button"
                onClick={() => removeEmailFromInvites(email)}
              >
                <X className="size-4 text-zinc-400" />
              </button>
            </div>
          )
        })}
      </div>

      <div className="w-full h-px bg-zinc-800" />

      <form onSubmit={addNewEmailToInvite}>
        <Input
          type="email"
          name="email"
          placeholder="Digite o email do convidado"
          icon={<AtSign />}
        >
          <Button type="submit">
            Convidar
            <Plus className="size-5 " />
          </Button>
        </Input>
      </form>
    </Modal>
  )
}

export { InviteGuestsModal }
