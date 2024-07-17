import { Plus } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { CreateActivityModal } from "./create-activity-modal"
import { ImportantLinks } from "./important-links"
import { Guests } from "./guests"
import { Activities } from "./activities"
import { DestinationAndDateHeader } from "./destination-and-date-header"
import { CreateLinkModal } from "./create-link-modal"
import { Button } from "../../components/button"
import { AddParticipantModal } from "./add-participant-modal"
import ConfirmTripGuestModal from "./confirm-trip-guest-modal"
import { useLocalStorage } from "../../hooks/use-local-storage"
import ConfirmGuestEmailModal from "./confirm-guest-email-modal"
import { useQuery } from "@tanstack/react-query"
import { api } from "../../lib/axios"
import { useNavigate, useParams } from "react-router-dom"
import { localUserProps, Trip } from "../../interfaces/interfaces"

const TripDetailsPage = () => {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false)
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false)
  const [isAddParticipantModalOpen, setIsAddParticipantModalOpen] =
    useState(false)
  const [isGuestConfirmationModalOpen, setIsGuestConfirmationModalOpen] =
    useState(false)
  const [isMailConfirmationModalOpen, setIsMailConfirmationModalOpen] =
    useState(false)

  const verifyLocal = useLocalStorage<localUserProps>(
    "plannr-user-verification"
  )

  const { tripId } = useParams()

  const navigate = useNavigate()

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

  const openGuestConfirmationModal = () => {
    setIsGuestConfirmationModalOpen(true)
  }

  const closeGuestConfirmationModal = () => {
    setIsGuestConfirmationModalOpen(false)
  }

  const openMailConfirmationModal = () => {
    setIsMailConfirmationModalOpen(true)
  }

  const closeMailConfirmationModal = () => {
    setIsMailConfirmationModalOpen(false)
  }

  const { isSuccess, isError } = useQuery({
    queryKey: ["verifyUser"],
    queryFn: async () => {
      const res = await api.get(
        "/participants/" + verifyLocal.getFromLocal()?.id
      )
      const data = await res.data
      if (!data.participant.is_confirmed) openGuestConfirmationModal()
      return data.participant
    },
    enabled: !!verifyLocal.getFromLocal(),
    retry: false,
  })

  const tripDetails = useQuery<Trip>({
    queryKey: ["fetchTripDetails"],
    queryFn: () => api.get("/trips/" + tripId).then((res) => res.data.trip),
    enabled: isSuccess,
  })

  const verifyError = useCallback(() => {
    isError && navigate("/")
  }, [isError, navigate])

  useEffect(() => {
    const localData = verifyLocal.getFromLocal()

    if (!localData) {
      openMailConfirmationModal()
      return
    }

    verifyError()
  }, [verifyLocal, verifyError])

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      {tripDetails.isSuccess && (
        <DestinationAndDateHeader tripData={tripDetails.data} />
      )}

      {isSuccess && (
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
      )}

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
      {isGuestConfirmationModalOpen && (
        <ConfirmTripGuestModal
          closeGuestConfirmationModal={closeGuestConfirmationModal}
          tripDestination={tripDetails.data?.destination || ""}
        />
      )}
      {isMailConfirmationModalOpen && (
        <ConfirmGuestEmailModal
          closeMailConfirmationModal={closeMailConfirmationModal}
        />
      )}
    </div>
  )
}

export { TripDetailsPage }
