import { ArrowUpRight, ShieldCheck } from "@phosphor-icons/react"

import { track } from "@/lib/analytics"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

const QA: [string, string][] = [
  [
    "Por que pedir ao Claude em vez de usar regras prontas?",
    "O ajuste certo depende da peça, da impressora e do filamento. O Claude lê os dados do seu projeto e sugere valores para esse caso, em vez de aplicar uma tabela fixa. Quando as boas práticas de impressão mudam, as sugestões mudam junto, sem precisar atualizar o app.",
  ],
  ["Tem custo ou precisa de chave de API?", "O app não cobra nada e não usa chave de API. As sugestões vêm da conversa que você abre no Claude e cola de volta aqui."],
  [
    "Meu arquivo vai para algum servidor?",
    "Não. O 3MF é lido e regravado dentro do navegador. Só o texto do resumo sai daqui, e apenas quando você o copia e cola no Claude.",
  ],
  [
    "O que o app consegue alterar?",
    "Cerca de 55 configurações do Bambu Studio: qualidade e camadas, paredes e preenchimento, suportes e brim, velocidades e temperaturas, ventoinha e torre de limpeza do multicolor. Valores fora de limites seguros e chaves desconhecidas são ignorados e aparecem na lista.",
  ],
  [
    "Por que fatiar de novo no Bambu Studio?",
    "O app muda as configurações do projeto, mas não gera o G-code. Abra o arquivo ajustado, confira no preview e fatie para valer as alterações.",
  ],
  [
    "O 3MF não abriu ou faltou configuração.",
    "O app só aceita projetos salvos pelo Bambu Studio (Arquivo, Salvar projeto como), porque é lá que ficam as configurações. Um 3MF exportado só com a malha não serve.",
  ],
]

/** Dúvidas numa gaveta lateral, aberta pelo botão "Dúvidas" do cabeçalho; cada pergunta abre ao clicar. */
export function Duvidas({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full gap-0 overflow-y-auto border-hairline-strong bg-background sm:max-w-md">
        <SheetHeader className="px-5 pt-6 pb-2 sm:px-6">
          <SheetTitle className="text-2xl font-semibold tracking-[-0.03em]">Dúvidas comuns</SheetTitle>
          <SheetDescription className="sr-only">Por que usar o Claude, o que o app altera, privacidade e custo.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-5 px-5 pb-8 sm:px-6">
          <Accordion
            type="single"
            collapsible
            onValueChange={(v) => v && track("duvida_aberta", { pergunta: Number(v) + 1 })}
          >
            {QA.map(([q, a], i) => (
              <AccordionItem key={q} value={String(i)} className="border-hairline">
                <AccordionTrigger className="py-4 text-[15px] font-medium hover:no-underline">{q}</AccordionTrigger>
                <AccordionContent className="text-[15px] leading-relaxed text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="flex items-start gap-2.5 rounded-xl border border-hairline-strong bg-card/60 p-4 text-sm text-muted-foreground">
            <ShieldCheck weight="duotone" className="mt-0.5 size-5 shrink-0 text-primary-ink" />
            Tudo roda no seu navegador. O arquivo, o nome dele e a resposta do Claude não são enviados para lugar nenhum.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}

/** Rodapé da home: só o que o topo não tem (privacidade e os outros apps). */
const OUTROS_APPS = [
  { nome: "Calculadora 3D", href: "https://nossoprojeto3d.com.br/calculadora/", destino: "calculadora" },
  { nome: "Dicas", href: "https://nossoprojeto3d.com.br/dicas/", destino: "dicas" },
]

export function Footer() {
  return (
    <footer className="border-t border-hairline max-sm:[@media(max-height:719px)]:hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-6 px-4 py-4 text-[13px] text-muted-foreground sm:justify-between sm:px-6 lg:py-5">
        <p className="flex items-center gap-2">
          <ShieldCheck weight="duotone" className="size-[18px] shrink-0 text-primary-ink" />
          Seu arquivo não sai do navegador
        </p>
        <nav aria-label="Outros apps da Nosso Projeto 3D" className="flex items-center gap-5 max-sm:hidden">
          {OUTROS_APPS.map((a) => (
            <a
              key={a.destino}
              href={a.href}
              target="_blank"
              rel="noopener"
              onClick={() => track("clique_externo", { destino: a.destino, local: "fatio_rodape" })}
              className="group flex items-center gap-1 rounded-md transition-colors outline-none hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              {a.nome}
              <ArrowUpRight weight="bold" aria-hidden="true" className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
