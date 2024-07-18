import { CircleCheck, Trash2 } from "lucide-react"
import { useParams } from "react-router-dom"
import { api } from "../../lib/axios"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

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

  const { data: activities } = useQuery<Activity[]>({
    queryKey: ["fetchActivities", tripId],
    queryFn: () =>
      api.get(`/trips/${tripId}/activities`).then((res) => res.data.activities),
  })

  const [activityInCurrentHover, setActivityInCurrentHover] = useState<string>()

  const showDeleteButton = (index: string) => {
    setActivityInCurrentHover(index)
  }

  const hideDeleteButton = () => {
    setActivityInCurrentHover("")
  }

  const queryClient = useQueryClient()

  const deleteActivity = useMutation({
    mutationFn: (activityId: string) => api.delete("/activities/" + activityId),
    mutationKey: ["deleteActivity"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchActivities"] })
    },
  })

  const handleDeleteActivity = (activityId: string) => {
    if (!activityId) return
    deleteActivity.mutate(activityId)
  }

  return (
    <div className="space-y-8 max-h-[87%] min-h-full overflow-scroll scroll-smooth no-scrollbar">
      {activities?.map((activity) => {
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
                  onMouseEnter={() => showDeleteButton(dayActivity.id)}
                  onMouseLeave={hideDeleteButton}
                >
                  <CircleCheck className="size-5 text-lime-300" />
                  <span className="text-zinc-100">{dayActivity.title}</span>
                  <span className="text-zinc-400 text-sm ml-auto">
                    {format(dayActivity.occurs_at, "p", { locale: ptBR })}h
                  </span>
                  {dayActivity.id === activityInCurrentHover && (
                    <button
                      type="button"
                      onClick={() => handleDeleteActivity(dayActivity.id)}
                    >
                      <Trash2 className="size-5 text-red-500" />
                    </button>
                  )}
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
