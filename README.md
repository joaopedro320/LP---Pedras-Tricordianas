# LP Pedras Tricordiana

Landing page da **Pedras Tricordiana** (Três Corações/MG), cliente QH4 Growth.
Produto: Método Stones High Ticket. Contrato de 15/10/2026 a 15/04/2027.
Contato: Marcílio Francisco (proprietário e decisor).

## Estrutura

```
index.html          LP principal
obrigado.html       Página de obrigado (abre o WhatsApp em 3s)
404.html            Página de erro personalizada
robots.txt
sitemap.xml
site.webmanifest
vercel.json         cleanUrls, cache dos assets e headers de segurança
assets/
  css/style.css
  js/main.js        catálogo, mostruário, formulário, eventos do GTM
  img/              todas as imagens são arquivos locais (não dependem do site antigo)
```

## Como publicar na Vercel

1. Descompacte o zip.
2. Vercel > Add New > Project > arraste a pasta (ou suba num repositório e importe).
3. Framework Preset: **Other**. Sem build command, output = raiz.
4. Em Settings > Domains, aponte o domínio definitivo.

## Pendências antes de publicar

- [ ] **GTM**: trocar `GTM-XXXXXXX` em `index.html` (head e noscript) e em `obrigado.html`. Enquanto estiver com XXXX o GTM não carrega.
- [ ] **Domínio / canonical**: hoje está `https://pedrastricordiana.com.br/` (canonical, Open Graph, JSON-LD, sitemap e robots). Se a LP for para outro domínio ou subdomínio, trocar em todos.
- [ ] **WhatsApp**: (35) 9 9979-8434 (do briefing). Para trocar, edite `WHATSAPP` em `assets/js/main.js`, o link do botão flutuante e do rodapé em `index.html` e `obrigado.html`.
- [ ] **Apps Script** (opcional): cole a URL do Web App em `APPS_SCRIPT_URL` no `main.js`. Com URL: envia os dados, abre a página de obrigado e o WhatsApp com a mensagem padrão. Sem URL: monta a mensagem com todos os campos e manda direto pro WhatsApp (via página de obrigado).
- [ ] **Instagram da QH4** no rodapé: link `https://www.instagram.com/qh4growth/`, confirmar o @ oficial.

## Fonte do conteúdo

- Briefing do cliente (formulário QH4 Briefing + Site v2) e resumo comercial passado pelo Malta.
- Descrições das pedras: textos do site atual pedrastricordiana.com.br/produtos.
- Imagens: baixadas do site atual (slides, texturas, fotos por pedra, jazida, logo) + fotos do Instagram da pasta `02. Imagens`. Tudo salvo em `assets/img` como arquivo local: se o site antigo sair do ar, a LP continua igual. O zip original com as 77 imagens do site ficou em `02. Imagens`.
- Atenção: as fotos de produto do site antigo são pequenas (284 px e 576 px). A LP exibe essas fotos em tamanho próximo do original para não estourar. Quando as filhas do Marcílio mandarem fotos/vídeos novos, vale trocar (mesmos nomes de arquivo em `assets/img`).
- Não foram usados os depoimentos do site atual (nomes genéricos, sem fonte verificável) nem dados não presentes no briefing.
- Cores da marca tiradas do logo/site: #3E342F, #D79753, #F9F3ED, #7A6855, #C5B9AC. Fontes: Archivo condensada (títulos, conversa com o letreiro do logo) + DM Sans (corpo, a mesma do site atual).

## Qualificação de lead (dor principal do cliente)

- Pedido mínimo de **20 m²** aparece no hero, na faixa de fatos, no formulário e no FAQ.
- Formulário só aceita metragem a partir de 20 m² e pergunta perfil (arquiteto, engenheiro, construtora, empreiteiro, cliente final), pedra, cidade da obra e prazo.
- Botão de envio nasce desabilitado e só libera com todos os campos válidos.

## Eventos de rastreamento (dataLayer)

| Evento | Quando |
|---|---|
| `cta_click` | Clique em qualquer CTA (param `local`) |
| `whatsapp_click` | Botão flutuante e link do rodapé (param `local`) |
| `ver_pedra` | Troca de pedra no catálogo (param `pedra`) |
| `generate_lead` | Envio do formulário (params `pedra`, `metragem`, `perfil`) |
| `pagina_obrigado` | Carregamento da página de obrigado |

## Checklist de SEO

- [x] Title e meta description com nicho, pedras e cidade
- [x] Canonical, robots meta
- [x] Open Graph completo + imagem 1200x630 (`assets/img/og-image.jpg`)
- [x] Twitter Card
- [x] JSON-LD `HomeAndConstructionBusiness` + `FAQPage`
- [x] robots.txt, sitemap.xml, site.webmanifest
- [x] width/height em todas as imagens, preload da imagem do hero
- [x] Página de obrigado (noindex) e 404 personalizada
- [x] vercel.json
