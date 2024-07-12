import { Link2, Plus } from "lucide-react"
import { Button } from "../../components/button"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { TripUrl } from "../../interfaces/interfaces"
import { api } from "../../lib/axios"

interface ImportantLinksProps {
  openCreateLinkModal: () => void
}

const ImportantLinks = ({ openCreateLinkModal }: ImportantLinksProps) => {
  const { tripId } = useParams()

  const { data: tripLinks } = useQuery<TripUrl[]>({
    queryKey: ["fetchLinks", tripId],
    queryFn: () =>
      api.get(`/trips/${tripId}/links`).then((res) => res.data.links),
  })

  return (
    <div className="space-y-6">
      <h2 className="font-bold text-xl">Links Importantes</h2>
      <div className="space-y-5 max-h-36 overflow-scroll scroll-smooth no-scrollbar">
        {tripLinks?.length === 0 && (
          <p className="text-sm text-zinc-400">Nenhum link cadastrado.</p>
        )}
        {tripLinks?.map((link) => {
          return (
            <div
              key={link.id}
              className="flex justify-between items-center gap-4"
            >
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {link.title}
                </span>
                <a
                  href="#"
                  className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
                >
                  {link.url}
                </a>
              </div>
              <Link2 className="size-5 text-zinc-400 shrink-0" />
            </div>
          )
        })}
      </div>

      <Button variant="secondary" size="full" onClick={openCreateLinkModal}>
        <Plus className="size-5 " />
        Cadastrar novo link
      </Button>
    </div>
  )
}

export { ImportantLinks }
