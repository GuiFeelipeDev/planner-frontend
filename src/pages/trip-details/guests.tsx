import { CircleDashed, UserCog } from "lucide-react"
import { Button } from "../../components/button"

const Guests = () => {
  return (
    <div className="space-y-6">
      <h2 className="font-bold text-xl">Convidados</h2>
      <div className="space-y-5  overflow-scroll scroll-smooth no-scrollbar">
        <div className="flex justify-between items-center gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">John Vilela</span>
            <span className="block text-sm text-zinc-400 ">
              john.vilela@gmail.com
            </span>
          </div>
          <CircleDashed className="size-5 text-zinc-400 shrink-0" />
        </div>
        <div className="flex justify-between items-center gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Capipo da Silva
            </span>
            <span className="block text-sm text-zinc-400 ">
              capipo@gmail.com
            </span>
          </div>
          <CircleDashed className="size-5 text-zinc-400 shrink-0" />
        </div>
        <div className="flex justify-between items-center gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Xuxuzinho da Silva
            </span>
            <span className="block text-sm text-zinc-400 ">xuxu@gmail.com</span>
          </div>
          <CircleDashed className="size-5 text-zinc-400 shrink-0" />
        </div>
      </div>

      <Button variant="secondary" size="full">
        <UserCog className="size-5 " />
        Gerenciar convidados
      </Button>
    </div>
  )
}

export { Guests }
