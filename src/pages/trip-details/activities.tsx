import { CircleCheck } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../../lib/axios"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface Activity {
  date: string
  activities: {
    id: string
    title: string
    occurs_at: string
  }[]
}

const Activities = () => {
  const { tripId } = useParams()
  const [tripActivities, setTripActivities] = useState<Activity[] | undefined>(
    []
  )

  const fetchTripGuests = useCallback(async () => {
    try {
      const res = await api.get(`/trips/${tripId}/activities`)
      const data = await res.data

      setTripActivities(data.activities)
    } catch (error) {
      console.log(error)
    }
  }, [tripId])

  useEffect(() => {
    fetchTripGuests()
  }, [fetchTripGuests])

  return (
    <div className="space-y-8">
      {tripActivities?.map((activity) => {
        return (
          <div key={activity.date} className="space-y-2.5">
            <div className="flex gap-2 items-baseline">
              <span className="text-xl text-zinc-300 font-semibold">
                Dia {format(activity.date, "d")}
              </span>
              <span className="text-xs text-zinc-500">
                {format(activity.date, "EEEE", { locale: ptBR })}
              </span>
            </div>
            {activity.activities.length === 0 && (
              <p className="text-sm text-zinc-500">
                Nenhuma atividade cadastrada nessa data.
              </p>
            )}
            {activity.activities?.map((dayActivity) => {
              return (
                <div
                  key={dayActivity.id}
                  className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3"
                >
                  <CircleCheck className="size-5 text-lime-300" />
                  <span className="text-zinc-100 ">{dayActivity.title}</span>
                  <span className="text-zinc-400 text-sm ml-auto">
                    {format(dayActivity.occurs_at, "p", { locale: ptBR })}h
                  </span>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export { Activities }
