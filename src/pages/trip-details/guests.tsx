import { CheckCircle, CircleDashed, UserCog } from "lucide-react"
import { Button } from "../../components/button"
import { useParams } from "react-router-dom"
import { api } from "../../lib/axios"
import { useQuery } from "@tanstack/react-query"

interface Participant {
  id: string
  name: string | null
  email: string
  is_confirmed: boolean
}

const Guests = () => {
  const { tripId } = useParams()

  const { data: guests } = useQuery<Participant[]>({
    queryKey: ["fetchGuests", tripId],
    queryFn: () =>
      api
        .get(`/trips/${tripId}/participants`)
        .then((res) => res.data.participants),
  })

  return (
    <div className="space-y-6">
      <h2 className="font-bold text-xl">Convidados</h2>
      <div className="space-y-5  overflow-scroll scroll-smooth no-scrollbar">
        {guests?.map((guest) => {
          return (
            <div
              key={guest.id}
              className="flex justify-between items-center gap-4"
            >
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {guest.name || "Não confirmado"}
                </span>
                <span className="block text-sm text-zinc-400 ">
                  {guest.email}
                </span>
              </div>
              {guest.is_confirmed ? (
                <CheckCircle className="size-5 text-lime-300 shrink-0" />
              ) : (
                <CircleDashed className="size-5 text-zinc-400 shrink-0" />
              )}
            </div>
          )
        })}
      </div>

      <Button variant="secondary" size="full">
        <UserCog className="size-5 " />
        Gerenciar convidados
      </Button>
    </div>
  )
}

export { Guests }
