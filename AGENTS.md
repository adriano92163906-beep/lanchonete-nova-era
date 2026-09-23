# AGENTS.md — Padrões obrigatórios do projeto "Lanchonete Nova Era"

Este arquivo define como qualquer agente de IA (ou humano) deve trabalhar neste
repositório. **Leia este arquivo antes de realizar qualquer tarefa.**

## Contexto do projeto

- Site estático de pedidos online da Lanchonete Nova Era.
- Stack atual: HTML5 + Tailwind CSS (via CDN) + JavaScript vanilla. Sem
  backend, sem build tool, sem framework.
- Estrutura:
  - `index.html` — markup + Tailwind config inline
  - `script.js` — dados de produtos, renderização e lógica do carrinho
  - `images/` — fotos dos produtos e banner
  - `download-images.js` — script Node avulso (não faz parte do runtime do
    site) usado para baixar imagens de produto

## 1. Preservação do projeto existente

- O projeto já existe e funciona: **evoluir, não reconstruir.**
- Antes de qualquer alteração: leia `index.html` e `script.js` inteiros,
  entenda como cada funcionalidade atual opera.
- Preserve layout, cores, tipografia, textos e identidade visual definidos
  (paleta vermelho/dourado/navy da marca Nova Era, fontes Exo 2 / Bree Serif /
  Yellowtail).
- Preserve todas as funcionalidades existentes (busca, filtro de categoria,
  carrinho, checkout mock).
- Não recriar o projeto do zero, não substituir a interface por outra, não
  remover funcionalidades sem autorização explícita do usuário.
- Mudanças devem ser incrementais. Se uma alteração puder modificar
  significativamente aparência ou funcionamento atual, explique antes de
  executá-la e aguarde confirmação.

## 2. Git / GitHub / Issues / Pull Requests

Todo trabalho deve ser rastreável:

1. Cada bug, correção, melhoria, feature, refatoração, performance ou
   segurança vira uma **Issue**.
2. Cada Issue tem sua **branch** própria (`feat/…`, `fix/…`, `chore/…`).
3. Commits organizados e descritivos.
4. Abrir **Pull Request** mencionando a Issue (`Closes #123`, `Fixes #123`,
   `Resolves #123`).
5. O PR deve descrever: problema, solução, arquivos modificados, testes
   realizados, possíveis impactos.
6. Nenhuma tarefa é considerada concluída sem validação (rodar/testar antes de
   fechar).
7. Deploys só a partir do fluxo de Pull Requests.

> Enquanto o repositório remoto não existir, mantenha o mesmo espírito
> localmente: commits pequenos e descritivos, uma "branch" lógica por tarefa,
> e registre o que seria a Issue/PR no changelog ou na mensagem de commit.

## 3. UI/UX — Motion Principles

- Buscar fluidez e profissionalismo sem alterar a identidade visual atual.
- Sempre que uma funcionalidade envolver espera ou estado assíncrono,
  considerar: skeleton loading, lazy loading, loading state, progress state,
  empty state, error state, success state.
- Animações devem ser sutis, rápidas, leves (sem impacto de performance ou
  jank), funcionar em mobile, e respeitar `prefers-reduced-motion`.
- Nunca deixar telas vazias durante carregamentos.
- Não modificar drasticamente a identidade visual atual só para caber uma
  animação.

## 4. Performance

- Preferir carregamento assíncrono e lazy loading de imagens fora da
  above-the-fold.
- Otimizar/comprimir imagens antes de adicioná-las ao repositório.
- Evitar JavaScript e CSS desnecessários; evitar duplicação de código.
- Não otimizar prematuramente — só mexer onde há ganho real e mensurável.

## 5. Qualidade de código

- Usar ferramentas compatíveis com o stack atual (HTML/CSS/JS vanilla — não
  forçar TypeScript nem frameworks que não existem no projeto).
- Antes de adicionar qualquer dependência nova, avaliar se é realmente
  necessária.
- Preferir lint/formatter leves (ex.: Prettier, ESLint) quando fizer sentido
  para o tamanho do projeto.

## 6. Observabilidade

- Antes de integrar Sentry/Datadog/New Relic/OpenTelemetry, confirmar com o
  usuário onde o site será hospedado (site estático sem backend tem opções
  limitadas de coleta).
- Nunca expor tokens, API keys, senhas ou credenciais no frontend.

## 7. Testes

- Antes de considerar uma alteração concluída, quando aplicável: lint,
  formatter, testes unitários/integração/E2E, build.
- Testes E2E (Playwright) devem cobrir o fluxo crítico: busca, filtro de
  categoria, adicionar/remover do carrinho, finalizar pedido.

## 8. Segurança

- Nunca colocar senhas, tokens, API keys ou credenciais no frontend.
- Validar qualquer entrada de usuário antes de usar (ex.: campo de busca).
- Não confiar em dados vindos do frontend caso um backend seja adicionado no
  futuro.

## 9. Regra para agentes de IA

Antes de modificar qualquer coisa:

1. Leia este `AGENTS.md`.
2. Analise a arquitetura existente (`index.html`, `script.js`, `images/`).
3. Identifique o impacto da alteração.
4. Preserve funcionalidades existentes.
5. Faça alterações pequenas e rastreáveis (uma Issue/branch por vez, quando
   git estiver disponível).
6. Teste a alteração no navegador antes de reportar como concluída.
7. Verifique se o site continua abrindo e funcionando (sem console errors).
8. Atualize este documento e o `README`/changelog quando necessário.
9. Relacione a alteração a uma Issue (ou, na ausência de repositório remoto,
   descreva o "porquê" no commit).
10. Utilize Pull Request para integrar ao branch principal, assim que o fluxo
    de git/GitHub estiver disponível.

**Nunca faça uma reescrita completa do projeto sem autorização explícita do
usuário.**

## 10. Regra principal

O projeto existente é a fonte principal de verdade.

**Missão:** Preservar → Melhorar → Testar → Documentar → Integrar → Deploy.

**Nunca:** Apagar → Recriar → Substituir.

Antes de executar mudanças grandes, apresente o plano e aguarde autorização.
