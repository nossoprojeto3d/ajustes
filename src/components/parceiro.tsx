import { ArrowUpRight } from "@phosphor-icons/react"

import { track } from "@/lib/analytics"
import { cn } from "@/lib/utils"

/* Cupom da Voolt3D (link de afiliado), o mesmo da calculadora.
   O clique vai para o GA como "clique_afiliado" (igual à calculadora), com o
   lugar de onde veio em "local" para comparar os dois apps. */
const VOOLT = {
  url: "https://afiliado.c2cseller.com/voolt3d-nosso-projeto-b0e5828bb12818a1",
  cupom: "NOSSOPROJETO",
}
const LOGO = `${import.meta.env.BASE_URL}voolt3d.webp`

type Local = "fatio_lateral" | "fatio_pos_download"

function clicou(local: Local) {
  track("clique_afiliado", { parceiro: "voolt3d", local })
}

/** Cartão compacto da coluna das etapas (computador). */
export function ParceiroLateral({ className }: { className?: string }) {
  return (
    <a
      href={VOOLT.url}
      target="_blank"
      rel="sponsored noopener"
      onClick={() => clicou("fatio_lateral")}
      aria-label={`Até 8% de desconto em filamentos na Voolt3D com o cupom ${VOOLT.cupom} (abre em outra aba)`}
      className={cn(
        "group grid overflow-hidden rounded-xl border border-hairline bg-card/50 outline-none transition-[border-color,background-color] duration-300 hover:border-primary/50 hover:bg-card focus-visible:ring-[3px] focus-visible:ring-ring/50",
        className
      )}
    >
      {/* faixa branca de ponta a ponta: a logo é roxa e some no fundo escuro */}
      <span className="flex h-11 items-center justify-center bg-white">
        <img src={LOGO} alt="" width={640} height={162} className="h-[22px] w-auto" loading="lazy" decoding="async" />
      </span>
      <span className="grid gap-0.5 p-3 leading-snug">
        <span className="text-[13px] font-medium text-foreground">Até 8% off em filamentos</span>
        <span className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>
            cupom <span className="font-mono font-medium text-primary-ink">{VOOLT.cupom}</span>
          </span>
          <ArrowUpRight
            weight="bold"
            aria-hidden="true"
            className="size-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-ink"
          />
        </span>
      </span>
    </a>
  )
}

/** Faixa que aparece depois de baixar o arquivo: a hora em que a pessoa vai imprimir. */
export function ParceiroFaixa() {
  return (
    <a
      href={VOOLT.url}
      target="_blank"
      rel="sponsored noopener"
      onClick={() => clicou("fatio_pos_download")}
      aria-label={`Vai imprimir? Até 8% de desconto em filamentos na Voolt3D com o cupom ${VOOLT.cupom} (abre em outra aba)`}
      className="group flex items-stretch gap-3 overflow-hidden rounded-xl border border-hairline-strong bg-background/50 pr-3 outline-none transition-[border-color,background-color] duration-300 hover:border-primary/50 hover:bg-primary/[0.04] focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      {/* mesma faixa branca do cartão lateral, aqui encostada na esquerda */}
      <span className="flex w-28 shrink-0 items-center justify-center bg-white">
        <img src={LOGO} alt="" width={640} height={162} className="h-5 w-auto" loading="lazy" decoding="async" />
      </span>
      <span className="min-w-0 flex-1 self-center py-2.5 leading-snug">
        <span className="block text-sm font-medium">Vai imprimir? Até 8% off em filamentos</span>
        <span className="block text-xs text-muted-foreground">
          cupom <span className="font-mono font-medium text-primary-ink">{VOOLT.cupom}</span>
        </span>
      </span>
      <span className="flex shrink-0 items-center self-center gap-1 text-[13px] font-medium text-primary-ink">
        <span className="max-sm:hidden">Comprar</span>
        <ArrowUpRight weight="bold" aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </a>
  )
}
