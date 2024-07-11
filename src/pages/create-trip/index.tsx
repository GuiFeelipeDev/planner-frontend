import { FormEvent, useState } from "react"
import { InviteGuestsModal } from "./invite-guests-modal"
import { ConfirmTripModal } from "./confirm-trip-modal"
import { DestinationAndDateStep } from "./steps/destination-and-date-step"
import { InviteGuestsStep } from "./steps/invite-guests-step"

export function CreateTripPage() {
  const [isGuestsInputOpen, setIsGuestInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([
    "guifelipedev@gmail.com",
    "capipofeio@gmail.com",
    "jessica.white44@yahoo.com",
  ])

  const openGuestsInput = () => {
    setIsGuestInputOpen(true)
  }

  const closeGuestsInput = () => {
    setIsGuestInputOpen(false)
  }

  const openGuestsModal = () => {
    setIsGuestModalOpen(true)
  }

  const closeGuestsModal = () => {
    setIsGuestModalOpen(false)
  }

  const openConfirmTripModal = () => {
    setIsConfirmTripModalOpen(true)
  }

  const closeConfirmTripModal = () => {
    setIsConfirmTripModalOpen(false)
  }

  const addNewEmailToInvite = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)
    const email = data.get("email")?.toString()

    if (!email) return

    if (emailsToInvite.includes(email)) return

    setEmailsToInvite((prev) => [...prev, email])
    e.currentTarget.reset()
  }

  const removeEmailFromInvites = (emailToRemove: string) => {
    const filteredEmails = emailsToInvite.filter(
      (email) => email !== emailToRemove
    )
    setEmailsToInvite(filteredEmails)
  }

  const createTrip = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="w-full max-w-3xl px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            closeGuestsInput={closeGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}
          />

          {isGuestsInputOpen && (
            <InviteGuestsStep
              emailsToInvite={emailsToInvite}
              openConfirmTripModal={openConfirmTripModal}
              openGuestsModal={openGuestsModal}
            />
          )}
        </div>
        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda{" "}
          <br /> com nossos{" "}
          <a className="text-zinc-300 underline" href="#">
            termos de uso
          </a>{" "}
          e{" "}
          <a className="text-zinc-300 underline" href="#">
            políticas de privacidade
          </a>
          .
        </p>
      </div>
      {isGuestsModalOpen && (
        <InviteGuestsModal
          emailsToInvite={emailsToInvite}
          addNewEmailToInvite={addNewEmailToInvite}
          closeGuestsModal={closeGuestsModal}
          removeEmailFromInvites={removeEmailFromInvites}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          createTrip={createTrip}
          closeConfirmTripModal={closeConfirmTripModal}
        />
      )}
    </div>
  )
}
