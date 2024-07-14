import { Plus } from "lucide-react"
import { useState } from "react"
import { CreateActivityModal } from "./create-activity-modal"
import { ImportantLinks } from "./important-links"
import { Guests } from "./guests"
import { Activities } from "./activities"
import { DestinationAndDateHeader } from "./destination-and-date-header"
import { CreateLinkModal } from "./create-link-modal"
import { Button } from "../../components/button"
import { AddParticipantModal } from "./add-participant-modal"

const TripDetailsPage = () => {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false)
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false)
  const [isAddParticipantModalOpen, setIsAddParticipantModalOpen] =
    useState(false)

  const openCreateActivityModal = () => {
    setIsCreateActivityModalOpen(true)
  }

  const closeCreateActivityModal = () => {
    setIsCreateActivityModalOpen(false)
  }

  const openCreateLinkModal = () => {
    setIsCreateLinkModalOpen(true)
  }

  const closeCreateLinkModal = () => {
    setIsCreateLinkModalOpen(false)
  }

  const openAddParticipantModal = () => {
    setIsAddParticipantModalOpen(true)
  }

  const closeAddParticipantModal = () => {
    setIsAddParticipantModalOpen(false)
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <Button onClick={openCreateActivityModal}>
              <Plus className="size-5" /> Cadastrar atividade
            </Button>
          </div>

          <Activities />
        </div>

        <div className="w-80 space-y-6">
          <ImportantLinks openCreateLinkModal={openCreateLinkModal} />
          <div className="w-full h-px bg-zinc-800" />

          <Guests openAddParticipantModal={openAddParticipantModal} />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}
      {isCreateLinkModalOpen && (
        <CreateLinkModal closeCreateLinkModal={closeCreateLinkModal} />
      )}
      {isAddParticipantModalOpen && (
        <AddParticipantModal
          closeAddParticipantModal={closeAddParticipantModal}
        />
      )}
    </div>
  )
}

export { TripDetailsPage }
