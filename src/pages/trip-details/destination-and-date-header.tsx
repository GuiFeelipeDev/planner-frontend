import { Calendar, MapPin, Settings2 } from "lucide-react"
import { Button } from "../../components/button"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Trip } from "../../interfaces/interfaces"

interface DestinationAndDateHeaderProps {
  tripData: Trip
}

const DestinationAndDateHeader = ({
  tripData,
}: DestinationAndDateHeaderProps) => {
  const formatedDate = tripData
    ? format(tripData.starts_at, "d' de 'LLL", { locale: ptBR })
        .concat(" até ")
        .concat(format(tripData.ends_at, "d' de 'LLL", { locale: ptBR }))
    : null

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className=" text-zinc-100">{tripData?.destination}</span>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className=" text-zinc-100">{formatedDate}</span>
        </div>
        <div className="w-px h-6 bg-zinc-800" />
        <Button variant="secondary">
          Alterar local e data
          <Settings2 className="size-5 " />
        </Button>
      </div>
    </div>
  )
}

export { DestinationAndDateHeader }
