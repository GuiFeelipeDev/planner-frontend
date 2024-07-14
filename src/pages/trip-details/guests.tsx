import { CheckCircle, CircleDashed, Trash2, UserCog } from "lucide-react"
import { Button } from "../../components/button"
import { useParams } from "react-router-dom"
import { api } from "../../lib/axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

interface Participant {
  id: string
  name: string | null
  email: string
  is_confirmed: boolean
  is_owner?: boolean
}

interface GuestsProps {
  openAddParticipantModal: () => void
}

const Guests = ({ openAddParticipantModal }: GuestsProps) => {
  const { tripId } = useParams()

  const [guestInCurrentHover, setGuestInCurrentHover] = useState("")

  const { data: guests } = useQuery<Participant[]>({
    queryKey: ["fetchGuests", tripId],
    queryFn: () =>
      api
        .get(`/trips/${tripId}/participants`)
        .then((res) => res.data.participants),
  })

  const showDeleteButton = (index: string) => {
    setGuestInCurrentHover(index)
  }

  const hideDeleteButton = () => {
    setGuestInCurrentHover("")
  }

  const queryClient = useQueryClient()

  const deleteGuest = useMutation({
    mutationFn: (guestId: string) => api.delete("/participants/" + guestId),
    mutationKey: ["deleteGuest"],
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["fetchGuests"] }),
  })

  const handleDeleteGuest = (id: string) => {
    if (!id) return

    deleteGuest.mutate(id)
  }

  return (
    <div className="space-y-6">
      <h2 className="font-bold text-xl">Convidados</h2>
      <div className="space-y-5  overflow-scroll scroll-smooth no-scrollbar">
        {guests?.map((guest) => {
          return (
            <div
              key={guest.id}
              className="flex justify-between items-center gap-4"
              onMouseEnter={() => showDeleteButton(guest.id || "")}
              onMouseLeave={hideDeleteButton}
            >
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {guest.name || "Não confirmado"}{" "}
                  <span className="text-zinc-400 text-xs">
                    {guest.is_owner && "(criador)"}
                  </span>
                </span>
                <span className="block text-sm text-zinc-400 ">
                  {guest.email}
                </span>
              </div>
              {guest.id === guestInCurrentHover && !guest.is_owner ? (
                <button
                  type="button"
                  onClick={() => handleDeleteGuest(guest.id || "")}
                >
                  <Trash2 className="size-5 text-red-500" />
                </button>
              ) : guest.is_confirmed ? (
                <CheckCircle className="size-5 text-lime-300 shrink-0" />
              ) : (
                <CircleDashed className="size-5 text-zinc-400 shrink-0" />
              )}
            </div>
          )
        })}
      </div>

      <Button
        onClick={openAddParticipantModal}
        type="button"
        variant="secondary"
        size="full"
      >
        <UserCog className="size-5 " />
        Gerenciar convidados
      </Button>
    </div>
  )
}

export { Guests }
