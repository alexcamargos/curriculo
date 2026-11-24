# Alexsander Lopes Camargos — Currículo Web & PDF

Currículo web interativo desenvolvido para apresentação a recrutadores, com download direto em formato PDF (A4, texto selecionável e compatível com sistemas ATS) sincronizado com a versão online.

## Visualização

- **Versão online (principal — GitHub Pages):** [alcamargos.com/curriculo](https://alcamargos.com/curriculo/)
- **Espelho (Netlify):** [alcamargos-resume.netlify.app](https://alcamargos-resume.netlify.app)
- **Portfólio:** [alcamargos.com](https://alcamargos.com/)
- **LinkedIn:** [linkedin.com/in/alexcamargos](https://www.linkedin.com/in/alexcamargos/)

## Funcionalidades

- **Download direto de PDF (PT-BR e EN):** Botão principal na barra superior e na barra lateral para baixar o currículo em PDF A4 (2 páginas, texto selecionável e estruturado para ATS), além de botão de impressão direta (`@media print`) para gerar PDF pelo navegador a qualquer momento.
- **Alternância de idioma (PT / EN):** Troca instantânea de todo o conteúdo e dos links de download do PDF entre Português e Inglês (também acessível via `?lang=pt` ou `?lang=en` para integração direta com `alcamargos.com`).
- **Tema claro e escuro:** Detecção automática de preferência do sistema operacional com alternância manual persistida em `localStorage`, preservando sempre o layout claro de papel na versão impressa/PDF.
- **Contato rápido:** Cópia em um clique para e-mail e telefone, além de links diretos para LinkedIn, portfólio e GitHub.

## Estrutura do Projeto

```text
curriculo/
├── .github/
│   └── workflows/
│       └── deploy-pages.yml                            # Deploy automático de public/ no GitHub Pages
├── docs/
│   └── referencia-sistemas-ats.md                      # Referência técnica sobre parsing e triagem ATS
├── public/                                             # Diretório publicado (GitHub Pages e Netlify)
│   ├── favicon.jpg                                     # Favicon oficial sincronizado com alcamargos.com
│   ├── index.html                                      # Estrutura semântica e conteúdo principal (PT-BR)
│   └── assets/
│       ├── fonts/                                      # Pacote de ícones personalizado (IcoMoon)
│       ├── javascript/
│       │   └── my_scripts.js                           # Tradução PT/EN, tema, scroll-spy e cópia rápida
│       ├── pdf/
│       │   ├── Alexsander-Lopes-Camargos-Curriculo-PT.pdf  # PDF A4 sincronizado (Português)
│       │   └── Alexsander-Lopes-Camargos-Resume-EN.pdf     # PDF A4 sincronizado (Inglês)
│       └── stylesheet/
│           └── main.css                                # Design system editorial web + folha @media print A4
├── LICENSE
├── netlify.toml                                        # Configuração de publicação (publish = "public") e cabeçalhos
└── README.md
```

## Tecnologias e Identidade Visual

- HTML5 semântico com dados estruturados (`application/ld+json`)
- CSS3 alinhado ao sistema visual de [alexcamargos.github.io](https://github.com/alexcamargos/alexcamargos.github.io) (`alcamargos.com`): tipografia **Inter** e **JetBrains Mono** na web, paleta **Slate** (`#020617`, `#0f172a`, `#1e293b`, `#f8fafc`), acentos **Sky/Cyan** (`#0369a1`, `#0284c7`, `#38bdf8`, `#06b6d4`), destaque de impacto em **Emerald** (`#10b981` / `#047857`) e status em **Amber** (`#d97706` / `#fbbf24`), com folha `@media print` dedicada em coluna única linear (2 páginas A4, fontes TrueType nativas sem glifos PUA, URLs visíveis e ordem de fluxo fiel ao DOM para compatibilidade real com sistemas ATS)
- JavaScript vanilla (ES6+), sem dependências de build ou frameworks externos

## Uso Local

Como o projeto não requer etapa de compilação, basta servir a pasta `public/` localmente com qualquer servidor estático ou abrir [public/index.html](public/index.html) no navegador:

```bash
python -m http.server 8080 --directory public
```

Acesse `http://localhost:8080` no navegador.

## Publicação

Apenas o diretório `public/` é publicado em produção, mantendo documentação e arquivos de configuração fora do site:

- **GitHub Pages:** workflow [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml) envia o conteúdo de `public/` para `https://alcamargos.com/curriculo/` (com *Source: GitHub Actions* habilitado nas configurações de Pages do repositório).
- **Netlify:** [netlify.toml](netlify.toml) define `publish = "public"`, cabeçalhos de segurança e política de revalidação de cache para `assets/pdf/*`.

## Como Regenerar os PDFs após Atualizações

Sempre que editar informações em `public/index.html` ou `public/assets/javascript/my_scripts.js`, regenere os arquivos estáticos em `public/assets/pdf/` com o servidor local ativo usando Google Chrome (ou Microsoft Edge) em modo headless:

```powershell
# Português (PT-BR)
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=5000 --print-to-pdf="public\assets\pdf\Alexsander-Lopes-Camargos-Curriculo-PT.pdf" "http://127.0.0.1:8080/index.html?lang=pt&theme=light"

# Inglês (EN)
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=5000 --print-to-pdf="public\assets\pdf\Alexsander-Lopes-Camargos-Resume-EN.pdf" "http://127.0.0.1:8080/index.html?lang=en&theme=light"
```

## Licença

MIT License — Copyright (c) 2021–2026 **Alexsander Lopes Camargos**. Consulte [LICENSE](LICENSE) para detalhes.
