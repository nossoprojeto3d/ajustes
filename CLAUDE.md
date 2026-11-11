# Fatiô (antes Ajuste 3MF)

O nome do app é **Fatiô** (com acento, como o Respondê). O repositório é `fatio` (antes `ajustes`) e a pasta local continua `ajuste-3mf`; a chave `ajuste3mf.prefs` do navegador não muda, para não perder as preferências de quem já usa.

App web que deixa a IA configurar projetos do Bambu Studio: lê o `.3mf`, monta um resumo para o Claude, aplica o JSON de resposta e devolve um `-ajustado.3mf`. Tudo no navegador, sem servidor e sem chave de API.
Publicado em https://nossoprojeto3d.com.br/fatio/ (repositório `fatio`; os antigos `/ajustes/` e `/ajuste-3mf/` redirecionam pelo site principal, com `public/ajustes`, `public/ajuste-3mf` e o `404.astro` de lá). O README.md explica o fluxo completo.

## Stack

React 19, Vite 6, TypeScript, Tailwind v4 e shadcn/ui (new-york v4). É o único projeto com build. Animações com Motion (`motion/react`), cena 3D com Three.js (carregada à parte) e ícones do Phosphor.

Visual "oficina técnica", diferente do catálogo de propósito: sempre escuro, grafite quase preto, um único acento laranja-filamento (`--primary`), Geist no texto e Geist Mono nos dados (fontes do `@fontsource-variable`, sem Google Fonts). O logo é o da marca, em versão laranja só neste app.

```bash
npm run dev        # http://localhost:5173
npm test           # lógica do 3MF
npm run typecheck
npm run build
```

Antes de cada commit, rode `npm test` e `npm run typecheck`. A publicação roda os testes e não sobe se falharem.

## Publicação

Todo push na `main` dispara o `.github/workflows/deploy.yml`, que roda os testes e o build e publica no GitHub Pages pelo Actions. A pasta `dist/` não é versionada. O `base: './'` do Vite precisa continuar assim.

## Arquivos

- `src/App.tsx`: duas telas. A home (nome "Fatiô" grande em laranja com a frase "Deixe a IA ajustar seu fatiamento." embaixo, cena 3D, "Começar", "Ver um exemplo" e os 3 passos; ocupa exatamente a altura da tela, sem rolar, do iPhone SE ao desktop) e a ferramenta em `#ferramenta`, que ocupa exatamente a altura da tela (nada de rolar a página): etapas numa coluna à esquerda (linha no topo no celular) e um painel com as ações presas embaixo; se o conteúdo crescer, rola por dentro do painel. Na etapa 1, impressora e filamento lidos do arquivo aparecem numa frase com "Editar"; à vista ficam só uso, prioridade e observações. Evite texto de ajuda na tela. O voltar do navegador e o botão ‹ do cabeçalho levam à home; ler um arquivo (arrastar, exemplo) abre a ferramenta. O mesmo layout serve celular e desktop.
- `src/components/print-scene.tsx`: vaso sendo impresso camada por camada (Three.js). Pausa fora da tela e fica parado com movimento reduzido.
- `src/components/faq.tsx`: dúvidas numa gaveta lateral (botão "Dúvidas" do cabeçalho), cada uma recolhida, e o rodapé. O rodapé existe só na home e não repete o topo (logo, nome e Instagram ficam só no cabeçalho): "Seu arquivo não sai do navegador" e links para Calculadora 3D e Dicas (`clique_externo`). No celular mostra só a frase e some em telas baixas (iPhone SE). A ferramenta não tem rodapé.
- `src/lib/threemf.js`: leitura, validação e gravação do 3MF, **sem dependências** (ZIP próprio). Toda mudança aqui precisa de teste em `tests/threemf.test.mjs`.
- `src/lib/analytics.ts` + `src/components/consent-banner.tsx`: medição com consentimento.
- `src/components/parceiro.tsx`: cupom da Voolt3D (link de afiliado e cupom iguais aos da calculadora). Fica no pé da coluna das etapas (só no computador) e aparece depois de baixar o arquivo (todos). O clique vai ao GA como `clique_afiliado` com `parceiro: voolt3d`, igual à calculadora (o usuário só quer contar os cliques no banner, sem separar por app; o `local` vai junto mas não precisa de dimensão no GA).
- `src/components/ui/`: componentes do shadcn. Só `native-select.tsx`, `sonner.tsx` e `sheet.tsx` (import do `cn` corrigido para `@/lib/utils`; o CLI tentou instalar o pacote `cn` do npm) foram modificados (ícones do Phosphor); não edite os outros, prefira compor por fora.
- `src/index.css`: tokens de cor, fontes, grão do fundo, borda que acende sob o cursor e brilho do título.

## Regras

- O arquivo do usuário nunca sai do navegador. Não adicione chamada a servidor nem envie o 3MF, o nome dele, o resumo ou a resposta para a medição.
- Só entram ajustes da lista de chaves conhecidas, dentro de faixas seguras (~55 chaves). Ao adicionar uma chave, defina a faixa e escreva o teste.
- Toda chave alterada precisa entrar em `different_settings_to_system` (posição 0 para processo, uma por filamento, última para impressora). Sem isso, o Bambu Studio volta a chave para o valor do perfil do sistema ao abrir o projeto. Ao adicionar uma chave de filamento, inclua em `FILAMENT_KEYS` no `threemf.js`.
- O `.env` vai para o repositório de propósito, porque o ID do Analytics é público. Segredo de verdade vai em `.env.local`.
- Componente novo do shadcn: `npx shadcn@latest add <nome>` (o MCP do shadcn está instalado). O `components.json` existe (new-york, Tailwind v4, alias `@`). Depois de adicionar, confira o import do `cn` no arquivo novo.
- Mantenha o projeto fora de pastas sincronizadas (iCloud, Dropbox), porque travam o servidor de desenvolvimento.

## Imagens

O logo, o favicon e o ícone do iPhone ficam em `public/`, numa versão em cor única no laranja da página (`#ff6b2c`), gerada a partir do logo dourado do catálogo. Se o logo mudar, gere de novo: mesma forma, pintada com o laranja. A prévia do link no WhatsApp e nas redes é `public/og.jpg` (1200×630, captura do topo da página com o vaso no meio da impressão). Se o topo mudar, gere de novo. O app não usa fotos: o visual do topo é a cena 3D. Imagens próprias vão em `public/`.

## Roteiro de teste

Usado pelo `/conferir-site` com `npm run dev`, no celular (390px) e no desktop (1366px):

1. O app abre sem erros no console.
2. Enviar um `.3mf` de teste. Se não houver na máquina, pergunte ao usuário qual usar. Impressora, bico, filamentos e objetos são preenchidos.
3. Copiar o resumo: o texto sai com os dados do formulário.
4. Colar um JSON de ajustes, incluindo uma chave fora da faixa: as mudanças aparecem com valor de antes e depois, e a chave fora da faixa aparece como ignorada.
5. Desmarcar um ajuste e baixar o `-ajustado.3mf`. "Ajustar outro arquivo" volta para a etapa 1 sem perder impressora e filamento.
6. A barra de etapas leva e volta entre as etapas liberadas, e a cena 3D do topo anima sem erro no console.
