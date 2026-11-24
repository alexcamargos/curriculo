# Referência Técnica de Sistemas ATS: Parsing, Triagem, Ranqueamento e Modelagem de Avaliação

**Versão:** 2.0 (consolidada e validada)  
**Data:** novembro de 2026  
**Finalidade:** base factual única sobre o funcionamento real dos principais Applicant Tracking Systems (ATS) globais e brasileiros, orientada ao desenho de motores de avaliação e prompts de simulação de currículos.  
**Escopo:** substitui e corrige os levantamentos anteriores (`ats-parsing-scoring-research.md` e `ats-platform-research.md`), eliminando contradições internas, informações obsoletas e mitos de SEO.

---

## Sumário

1. [Como o Funil de ATS Funciona na Prática](#1-como-o-funil-de-ats-funciona-na-prática)
2. [Motores de Parsing e Pipeline Técnico](#2-motores-de-parsing-e-pipeline-técnico)
3. [Sistemas ATS Globais](#3-sistemas-ats-globais)
4. [Sistemas ATS Mais Usados no Brasil](#4-sistemas-ats-mais-usados-no-brasil)
5. [Matriz Comparativa Global e Brasil](#5-matriz-comparativa-global-e-brasil)
6. [Regulação, Compliance e o Fim da Rejeição Caixa-Preta](#6-regulação-compliance-e-o-fim-da-rejeição-caixa-preta)
7. [Alinhamento do Motor de Pontuação e Prompts de Simulação](#7-alinhamento-do-motor-de-pontuação-e-prompts-de-simulação)
8. [Fontes e Referências](#8-fontes-e-referências)

---

## 1. Como o Funil de ATS Funciona na Prática

Um erro comum ao modelar triagem de currículos é imaginar um único "robô" que lê o arquivo, gera uma nota de 0 a 100 e elimina automaticamente quem ficar abaixo de uma linha de corte. O famoso número de que "75% dos currículos são rejeitados por ATS" nasceu em um material comercial da Preptel em 2012 (empresa encerrada no ano seguinte), sem estudo ou metodologia publicada.

O que existe de fato, documentado pelo estudo *Hidden Workers* (Harvard Business School e Accenture, 2021), é que 88% dos executivos reconhecem perder profissionais qualificados por filtros rígidos de triagem — como exigência de títulos exatos, lacunas no histórico ou critérios de formulário pouco flexíveis. Quase todas as empresas da Fortune 500 (cerca de 98% a 99%, segundo levantamentos da Jobscan) operam com algum ATS detectável, mas o comportamento desses sistemas varia drasticamente.

Na operação real, a filtragem ocorre em quatro camadas distintas:

1. **Camada 1 — Perguntas eliminatórias de formulário (*knockout questions*):** único mecanismo amplamente usado para descarte automático imediato. Avalia respostas objetivas (autorização legal de trabalho, disponibilidade presencial/híbrida, registro profissional, CNH, pretensão salarial ou anos mínimos declarados).
2. **Camada 2 — Extração estruturada (*parsing*):** conversão do currículo em campos pesquisáveis de banco de dados. Quando o layout impede a leitura correta, o perfil chega incompleto ou embaralhado ao recrutador e deixa de aparecer nas buscas.
3. **Camada 3 — Busca, filtragem e ranqueamento assistivo:** recrutadores pesquisam a base com operadores booleanos e filtros estruturados, ou utilizam módulos de IA que ordenam candidatos por aderência (estrelas, notas A–D, faixas de *match* ou percentual de critérios atendidos). Por risco regulatório, essa camada raramente elimina candidatos de forma autônoma.
4. **Camada 4 — Triagem humana e ordem de revisão:** o fator que mais descarta candidaturas no mundo real. Em vagas de alto volume, recrutadores costumam priorizar indicações internas, candidatos no topo da ordenação ou os primeiros lotes recebidos; assim que fecham uma lista curta suficiente para entrevistas, os demais perfis não chegam a ser abertos.

---

## 2. Motores de Parsing e Pipeline Técnico

O ATS em si nem sempre é o autor do *parser*. Muitos fornecedores embarcam motores terceirizados ou disponibilizam conectores para bibliotecas especializadas, enquanto plataformas mais recentes usam modelos proprietários baseados em transformadores e LLMs.

### 2.1 Principais motores de parsing do mercado

| Motor | Controle corporativo | Idiomas | Campos extraídos | Notas técnicas relevantes |
| --- | --- | --- | --- | --- |
| **Textkernel (inclui Sovren)** | **Bullhorn** (Textkernel comprou a Sovren em dez/2021; Bullhorn comprou a Textkernel em jun/2024) | 29 | 100+ | Referência do setor (2B+ documentos/ano). Motor nativo do SAP SuccessFactors; oferece LLM Parser híbrido com taxonomia própria e motor *Search & Match*. |
| **RChilli** | RChilli (independente) | 40+ | 200+ | Muito usado como extensão/parceiro em SAP SuccessFactors e Oracle Recruiting Cloud. Forte em normalização taxonômica, migração em massa e anonimização de viés. |
| **HireAbility (ALEX)** | HireAbility (independente desde 1999) | 50+ | 100+ | Parser gramatical baseado em NLP e contexto. Saída em HR-XML e JSON; fornece tecnologia para diversos ATS independentes. |
| **Affinda** | Affinda (independente) | 50+ | 100+ | Arquitetura de ML e adaptação de layout para múltiplos formatos, com opção *self-hosted*. |
| **DaXtra** | DaXtra Technologies | Multilíngue | 150+ | Forte presença em agências de recrutamento (*staffing*) e integração profunda com Bullhorn. |

### 2.2 Pipeline técnico de extração

Um *parser* moderno executa sete etapas encadeadas:

1. **Ingestão do documento:** recebe DOCX, PDF, RTF, TXT, HTML ou ODT. Arquivos digitais com camada de texto têm seu texto extraído diretamente da estrutura do arquivo; OCR só entra em cena quando o arquivo é uma imagem ou PDF escaneado — e muitos ATS nativos simplesmente não rodam OCR.
2. **Extração linear de texto:** converte a árvore do documento em fluxo textual. Aqui moram as maiores perdas: duas colunas lidas horizontalmente misturam experiências com habilidades; tabelas embaralham datas e cargos; caixas de texto e gráficos somem do fluxo.
3. **Pré-processamento:** tokenização, normalização de caracteres, remoção de ruído e tratamento de pontuação/datas.
4. **Detecção de seções:** classificadores e heurísticas identificam blocos padrão (*Experiência*, *Formação*, *Habilidades*, *Certificações*). Cabeçalhos criativos reduzem a confiança da segmentação.
5. **Reconhecimento de Entidades Nomeadas (NER):** modelos baseados em transformadores ou LLMs identificam pessoa, contato, empregadores, cargos, períodos, instituições, diplomas e competências.
6. **Normalização taxonômica:** mapeia termos extraídos para conceitos canônicos. Em motores maduros, "Desenvolvedor Backend", "Engenheiro de Software" e "Programador Java" conectam-se a nós relacionados de uma taxonomia de ocupações e competências.
7. **Emissão estruturada:** gera saída em JSON ou HR-XML que preenche o cadastro do candidato no ATS.

```text
contato:       nome, e-mail, telefone, localização, linkedin, portfólio/site
experiência:   [empresa, cargo, localidade, data_inicio, data_fim, descrição]
formação:      [instituição, grau, curso/área, data_conclusão]
habilidades:   [skill_normalizada, contexto_de_uso, tempo_estimado, recência]
certificações: [nome, emissor, validade/data]
idiomas:       [idioma, nível]
metadados:     tempo_total_experiência, nível_gestão, senioridade_estimada
```

### 2.3 Como funciona o matching taxonômico da Textkernel/Sovren

O motor *Search & Match* da Textkernel é o modelo aberto mais bem documentado da indústria e ilustra como o matching estruturado vai além da contagem simples de palavras:

- Avalia **8 categorias configuráveis**: Formação, Cargos (*Job Titles*), Habilidades (*Skills*), Indústrias, Idiomas, Certificações, Tipo Executivo e Nível de Gestão.
- Pontua habilidades após normalização taxonômica, evitando falsos negativos por variação simples de escrita.
- Calcula o **Weighted Score** (0–100), medindo quanto o currículo atende aos requisitos da vaga com pesos ajustáveis por contexto (ex.: peso de localização cai a zero em vagas remotas; cargos recentes pesam mais que experiências antigas).
- Calcula o **Reverse Compatibility Score (RCS)** (0–100), medindo a direção inversa (quanto a vaga atende ao perfil do candidato), útil para sinalizar superqualificação severa.
- Combina ambos no **SovScore**, produzindo uma ordenação bidirecional.

### 2.4 Compatibilidade real de formatos e layouts

| Formato / elemento | Comportamento real nos ATS atuais | Orientação prática |
| --- | --- | --- |
| **PDF com texto selecionável** | Suportado com alta fidelidade pela quase totalidade dos ATS modernos (Workday, Greenhouse, Ashby, Lever, SuccessFactors, Gupy, Pandapé). | Excelente escolha quando gerado a partir de texto real e em coluna única. Teste simples: se o texto pode ser selecionado e copiado em ordem lógica, o *parser* consegue lê-lo. |
| **DOCX simples** | Equivalente ao PDF pesquisável na maioria dos sistemas; levemente mais previsível em *parsers* corporativos legados. | Boa alternativa para portais antigos ou formulários que peçam Word explicitamente. |
| **PDF escaneado / imagem (PNG, JPG)** | Falha silenciosa ou rejeição direta na maioria absoluta dos ATS nativos (Greenhouse, Lever, SuccessFactors nativo, Ashby, ORC sem add-on). | Evitar sempre. |
| **Múltiplas colunas e barras laterais** | Extratores lineares leem da esquerda para a direita atravessando colunas, fundindo frases de seções diferentes. | Usar coluna única linear. |
| **Cabeçalhos e rodapés (*header/footer*)** | Frequentemente ignorados ou extraídos fora de contexto. | Manter nome, telefone, e-mail, cidade e links no corpo principal da página. |
| **Tabelas complexas, caixas de texto e gráficos** | Embaralham cronologia ou tornam invisíveis dados colocados em ícones e barras visuais de proficiência (ex.: "Python: 4/5 bolinhas"). | Substituir por texto puro com marcadores padrão. |

---

## 3. Sistemas ATS Globais

### 3.1 Workday Recruiting (+ HiredScore e Paradox)

- **Posição de mercado:** líder disparado entre grandes corporações, presente em cerca de 39% das empresas da Fortune 500.
- **Parsing e Skills Cloud:** usa *parser* proprietário integrado ao Workday HCM. Extrai contato, histórico profissional, formação e competências para alimentar o perfil estruturado e o **Workday Skills Cloud**, cruzando tanto uma seção dedicada de *Skills* quanto as competências demonstradas nos bullets de experiência. Ao contrário de mitos recorrentes na internet, uma seção isolada de *Skills* é lida normalmente quando escrita em texto linear de coluna única; o que quebra o preenchimento automático são barras laterais, tabelas e gráficos. Como o formulário exige revisão antes do envio, o candidato deve sempre corrigir campos preenchidos de forma incorreta.
- **Ranqueamento e IA:**
  - Sem add-ons, o Workday nativo não gera score automático — candidatos aparecem por ordem de inscrição e são filtrados por busca de recrutadores.
  - **HiredScore AI for Recruiting** (adquirida em 2024): adiciona triagem explicável baseada em ML tradicional (evitando caixa-preta generativa para fins de auditoria), classificando candidatos em faixas **A a D** com justificativa visível sobre os requisitos da vaga. Inclui o recurso *fetch* para redescobrir candidatos antigos no banco de talentos.
  - **Paradox** (aquisição concluída em outubro de 2025 por cerca de US$ 1 bilhão): traz a assistente conversacional "Olivia" para triagem, agendamento e recrutamento de alto volume integrado ao Workday.
- **Filtros eliminatórios:** *knockout questions* configuráveis no formulário podem disparar *auto-disposition* imediata. Notas baixas no HiredScore (como "D") não são vendidas como auto-rejeição autônoma, mas empurram o candidato para o fim da fila de revisão.

### 3.2 SAP SuccessFactors Recruiting (+ SmartRecruiters)

- **Posição de mercado:** segunda maior base na Fortune 500 (~13%), dominante em multinacionais que já operam ERP SAP. Em **setembro de 2025**, a SAP concluiu a aquisição do **SmartRecruiters**, unindo um ATS moderno AI-native ao ecossistema SuccessFactors.
- **Parsing (SuccessFactors nativo):** a documentação oficial da SAP (KBAs 2081576 e 2951470) confirma o uso nativo da **Textkernel** como motor embarcado, limitado a 15 idiomas configurados (incluindo português e inglês). A **RChilli** atua como extensão de parceiro no ecossistema (não como motor nativo), muito usada para migração em massa e enriquecimento taxonômico.
- **Limitações técnicas documentadas do SuccessFactors:**
  - Não realiza *parsing* de PDFs escaneados/imagem.
  - Campos do tipo *picklist* falham no *parsing* automático porque esperam o *option ID* interno em vez do rótulo textual.
  - Currículos enviados via API ou submetidos por agências externas não passam pelo *parser*.
  - O *Mobile Apply* apresenta restrições no preenchimento automático, e campos já preenchidos no perfil anterior não são sobrescritos.
- **IA no SuccessFactors e no SmartRecruiters:**
  - No SuccessFactors (com licença *AI Units*), o assistente **SAP Joule** habilita *AI Skills Matching*, recomendação de vagas e *stack ranking* ordenado por aderência ao framework de competências da empresa.
  - No **SmartRecruiters**, a suíte **Winston AI** combina: **Winston Match** (extrai skills explícitas e implícitas, atribui nota transparente de 1 a 4 estrelas com resumo de pontos fortes, lacunas e skills transferíveis), **Winston Screen** (sugere perguntas objetivas ponderadas a partir da descrição da vaga, em modo *inline* ou pós-candidatura, com avanço automático de aprovados) e **Winston Companion** (operação assistida para recrutadores). Em empresas multinacionais, manter o currículo no mesmo idioma da vaga evita falhas de mapeamento taxonômico.

### 3.3 Oracle Recruiting Cloud (ORC) e Oracle Taleo (Legado)

É essencial separar as duas plataformas da Oracle, frequentemente misturadas em materiais antigos:

- **Oracle Recruiting Cloud (ORC):** plataforma ativa integrada ao Oracle Fusion Cloud HCM. Oferece o recurso **Suggested Candidates** (*Intelligent Matching*), baseado em ML, que avalia semanticamente cada perfil em 0 a 3 estrelas em quatro eixos: *Profile*, *Education*, *Experience* e *Skills*. O *parser* nativo não processa PDFs escaneados, mas o ORC aceita integrações oficiais com **Textkernel** e **RChilli** para OCR e extração avançada.
- **Oracle Taleo Enterprise (Legado):** segue em uso em grandes corporações sem data oficial única de desligamento do núcleo (embora módulos adjacentes como *Taleo Learn* tenham chegado ao fim de ciclo), com migração contínua para o ORC.
  - Extrai texto diretamente de DOCX e PDF pesquisáveis (ao contrário de boatos de blogs de currículo, não converte arquivos digitais via OCR), mas seu *parser* legado é rígido e perde dados facilmente com layouts elaborados ou datas mal posicionadas.
  - Busca nativa essencialmente **literal**: sensível a plurais, variações verbais e siglas ("CPA" não casa automaticamente com "Certified Public Accountant").
  - Sistema de pontuação **ACE** classifica candidatos em *ACE* (atende todos os itens *Required* + parte dos *Asset*), *Minimally Qualified* (só *Required*) e *Other*, além de **Disqualification Questions** que encerram a candidatura automaticamente em caso de resposta desclassificatória.

### 3.4 iCIMS Talent Cloud

- **Posição de mercado:** grande participação no mercado corporativo geral, especialmente nos EUA, operando como nuvem dedicada de recrutamento (*recruiting-first*).
- **Parsing e IA:** a iCIMS adquiriu a **Opening.io** em maio de 2020 (e **não** a HireAbility, empresa que permanece independente), incorporando ciência de dados e matching semântico ao *iCIMS Talent Logic*. O sistema extrai perfil estruturado e infere competências a partir do texto completo do currículo, não só da seção de habilidades.
- **Role Fit e governança:** o algoritmo **Role Fit** usa modelos em *ensemble* treinados sobre histórico de vagas, candidaturas e contratações para gerar pontuação de compatibilidade semântica (superando modelos antigos de contagem literal). A iCIMS submeteu seu ranqueamento a auditorias independentes de viés sob a lei de Nova York (NYC Local Law 144 / AEDT).
- **Filtros eliminatórios:** perguntas de *screening*/*knockout* podem rotear candidatos automaticamente para status de rejeição ou mantê-los em fila para revisão em lote pelo recrutador; o *Role Fit* atua como priorização, não como descarte autônomo.

### 3.5 Greenhouse

- **Posição de mercado:** um dos principais ATS de empresas de tecnologia e *scale-ups* globais.
- **Parsing:** utiliza modelos internos de ML e **LLMs *fine-tuned* modulares** (com suporte da OpenAI sob contrato que proíbe treinamento com dados de clientes) para extrair cargos, empresas, datas, tempo de experiência, skills e setores. Não processa arquivos de imagem (sem OCR).
- **Talent Matching (*Real Talent*):** lançado em 2024–2025 como recurso opcional de IA assistiva. A equipe de contratação calibra critérios objetivos e pesos; o sistema usa representações semânticas (embeddings) para agrupar candidatos em cinco faixas transparentes — *Strong Match*, *Good Match*, *Partial Match*, *Limited Match* e *Needs Manual Review* — destacando correspondências exatas e semânticas no currículo e bloqueando critérios ligados a atributos protegidos. **A IA não rejeita candidatos automaticamente.**
- **Regras de auto-rejeição e scorecards:** diferentemente da ideia popular de que o Greenhouse "não tem auto-rejeição", a plataforma oferece oficialmente **Auto-Reject Rules** para perguntas de formulário do tipo Sim/Não, seleção única e seleção múltipla, capazes de rejeitar e disparar e-mail automaticamente quando um pré-requisito objetivo não é atendido. Nas entrevistas, o diferencial segue sendo o *Structured Hiring* com scorecards humanos independentes em escala de 5 pontos.

### 3.6 Lever (Employ Inc.)

- **Posição de mercado:** forte em empresas de tecnologia e médio porte; pertence à **Employ Inc.** desde 2022 (mesmo grupo de Jobvite e JazzHR).
- **Parsing:** utiliza *parser* proprietário nativo documentado no Lever Help Center, suportando DOCX, PDF, RTF, HTML e ODF, sem suporte a imagens (regra prática da própria documentação: se o texto não é selecionável pelo cursor, não é lido).
- **Busca e IA (*Talent Fit*):** a busca interna suporta *word stemming* (encontra flexões radicais da mesma palavra), mas continua cega a abreviações e siglas não expandidas. Sob a Employ Inc., o Lever deixou de ser uma ferramenta sem pontuação e passou a contar com **Talent Fit**, recurso nativo de IA que pontua aderência de currículos à descrição da vaga com detalhamento de skills, além do fluxo de revisão rápida (*Fast Resume Review*).
- **Filtros eliminatórios:** suporta perguntas de triagem (*knockout*) combinadas a regras de **auto-archive**, capazes de arquivar e enviar negativa automática quando o candidato falha em requisitos obrigatórios do formulário.

### 3.7 Ashby

- **Posição de mercado:** ATS AI-native em rápida expansão no ecossistema global de tecnologia e IA (rodada Série D de US$ 50 milhões em 2025; adotado por empresas como OpenAI, Notion e Shopify), competindo diretamente com Greenhouse e Lever.
- **Parsing:** extração linear de texto em PDF/DOCX (até 16 MB), sensível a layouts multi-coluna e incompatível com arquivos apenas de imagem. Remove dados pessoais identificáveis (PII) ao acionar a camada de avaliação por IA.
- **AI-Assisted Application Review:** em vez de uma nota genérica inexplicável, o recrutador define critérios objetivos da vaga e a IA avalia o currículo item por item em três estados — **Meets** (atende), **Does Not Meet** (não atende) ou **Undecided** (vago/não comprovado) —, apresentando o percentual de critérios atendidos acompanhado de **citações diretas do texto do currículo**. A IA não tem permissão para rejeitar candidatos sozinha.
- **Filtros eliminatórios:** separação estrita entre revisão qualitativa por IA e **Auto-Reject Rules** determinísticas aplicadas instantaneamente sobre perguntas estruturadas do formulário de inscrição.

### 3.8 Demais plataformas globais relevantes

- **BambooHR:** HRIS focado em pequenas e médias empresas. Não possui *resume parsing* nativo no módulo ATS; empresas que precisam de extração ou pontuação acoplam integrações como Parseur, CandidateZip, Breezy HR ou Skima AI.
- **ADP Workforce Now:** foco em folha e RH corporativo; o módulo nativo de recrutamento é básico e muitos clientes integram ATS dedicados.
- **Outros players enterprise:** **Dayforce** (antiga Ceridian Dayforce, renomeada em fev/2024), **Infinite BrassRing** (antiga IBM Kenexa BrassRing, vendida à Infinite Computer Solutions em 2021), **UKG Pro Recruiting**, **Avature** e **Phenom**.
- **Camada AI-Native e Assessments:** **Eightfold.ai** (matching profundo por embeddings e grafos de habilidades adjacentes sobre mais de 1,6 bilhão de perfis, avaliando potencial além de títulos exatos) e **Harver** (que incorporou a **Pymetrics**, focada em jogos cognitivos e comportamentais fora da análise textual do currículo).

---

## 4. Sistemas ATS Mais Usados no Brasil

O mercado brasileiro possui dinâmicas próprias que alteram o peso de cada etapa do funil: altíssimo volume de inscrições por vaga aberta, uso intenso de **testes eliminatórios ou classificatórios logo após o cadastro** (lógica, português, inglês, perfil comportamental e fit cultural), candidaturas rápidas via celular/WhatsApp e forte concentração em plataformas nacionais para empresas locais, convivendo com Workday, SAP SuccessFactors, Greenhouse, Lever e Ashby em multinacionais e empresas de tecnologia.

### 4.1 Gupy (inclui Kenoby)

- **Posição de mercado:** plataforma de maior alcance em processos seletivos no Brasil, consolidada após a aquisição da **Kenoby**. Atende grandes varejistas, bancos, indústrias, serviços e empresas de tecnologia.
- **Parsing e perfil estruturado:** ao subir PDF ou DOCX, a plataforma usa *parsing* com apoio de NLP/LLMs para preencher automaticamente formação, experiências e habilidades no cadastro único da Gupy. Layouts elaborados (como modelos do Canva com duas colunas, caixas de texto e barras de progresso) degradam esse preenchimento; revisar manualmente os campos após o upload é indispensável, pois os filtros operam sobre o cadastro estruturado.
- **IA (evolução da Gaia para Agentes de IA) e Afinidade:** a arquitetura de IA — originalmente batizada de **Gaia** — evoluiu para agentes que cruzam o perfil do candidato com requisitos obrigatórios, desejáveis, histórico e competências da vaga, produzindo uma **ordenação dinâmica por afinidade** para guiar a leitura do recrutador. Diretrizes oficiais da plataforma deixam claro que a IA **ordena, mas não reprova sozinha**.
- **O que realmente elimina na Gupy:**
  - **Perguntas adicionais marcadas como eliminatórias** no cadastro (ex.: disponibilidade presencial, CNH, formação obrigatória, residência na cidade) geram desclassificação automática imediata.
  - **Testes integrados no funil** (lógica, língua portuguesa, idiomas, testes técnicos e fit cultural), frequentemente usados pelas empresas como filtro prático antes de o recrutador abrir os currículos.
  - Baixa posição na lista de afinidade em vagas com milhares de inscritos, fazendo o perfil nunca alcançar o lote avaliado pelo RH.

### 4.2 Pandapé (InfoJobs)

- **Posição de mercado:** ATS desenvolvido pelo **InfoJobs**, com capilaridade elevada em varejo, serviços, indústria e vagas de médio e alto volume no Brasil, integrado de forma nativa às bases do InfoJobs e da Catho.
- **Parsing e filtros:** realiza extração automática de dados de PDF, DOCX ou perfis importados dos portais integrados. Oferece filtros combinados por localização, tempo de experiência, formação, idiomas, palavras-chave e pretensão salarial.
- **IA (Pandapé IA e Pandapé Genoma):** além do matching técnico curricular, incorpora modelos preditivos (*Pandapé Genoma*) que cruzam perfil profissional e compatibilidade cultural/equipe, aprendendo com escolhas anteriores dos recrutadores para priorizar candidatos.
- **Filtros eliminatórios e fluxo mobile:** forte adoção de **perguntas eliminatórias (*kill questions*)** configuradas por vaga para descarte ou sinalização instantânea, além de candidatura simplificada via WhatsApp (*Fast Apply*), testes e vídeo-entrevistas integradas.

### 4.3 Sólides (ATS + Profiler)

- **Posição de mercado:** destaque entre pequenas e médias empresas (PMEs) e *mid-market* brasileiro.
- **Parsing e Matcher:** combina extração automática de currículos (PDF/DOCX) com a metodologia de **Engenharia de Cargos** e o motor **Matcher**, que pondera aderência técnica e comportamental.
- **Diferencial comportamental (Profiler):** grande parte da triagem na Sólides gira em torno do **Profiler** (mapeamento comportamental derivado do modelo DISC e metodologias validadas no Brasil), aplicado já nas etapas iniciais para antecipar aderência ao estilo da função e da liderança. O currículo bem estruturado garante visibilidade técnica, mas não substitui o desempenho no mapeamento comportamental quando ativado pela empresa.

### 4.4 VAGAS for Business

- **Posição de mercado:** plataforma tradicional em grandes corporações brasileiras, muito presente em processos de alto volume, programas de estágio, trainee e bancos de talentos corporativos, conectada ao portal Vagas.com.
- **Mecânica de triagem:** baseia-se fortemente em **cadastro estruturado padronizado**, filtros rígidos por pré-requisitos objetivos (formação, ano de conclusão, localidade, idiomas, ferramentas), **perguntas eliminatórias de formulário**, testes online e triagem por competências. Candidatos que apenas anexam o PDF sem preencher corretamente os campos estruturados do portal ficam invisíveis nos filtros de busca.

### 4.5 Senior HCM (Recrutamento e Seleção)

- **Posição de mercado:** solução de ATS da **Senior Sistemas**, amplamente adotada por médias e grandes empresas brasileiras integradas ao ERP e à folha de pagamento Senior HCM.
- **Parsing, cadastro único e IA:** mantém um identificador único por candidato em toda a jornada (evitando cadastros duplicados até a admissão digital), faz *parsing* de currículos e utiliza um **Matcher com IA** que calcula índice de aderência e ordena os perfis de acordo com os requisitos da vaga. Também incorpora perguntas eliminatórias e automações conversacionais via WhatsApp/chatbots.

### 4.6 Nova geração de ATS brasileiros (InHire, Quickin e Compleo)

- **InHire:** ATS moderno focado em produtividade de times de RH e recrutamento de tecnologia no Brasil; adota agentes de IA capazes de avaliar currículos em linguagem natural contra a régua de critérios definida pelo recrutador.
- **Quickin:** combina gestão de funil com **Match Score** gerado por IA sobre currículos e agentes conversacionais/voz para pré-triagem em escala.
- **Compleo:** voltado a operações de recrutamento estruturado e alto volume no mercado nacional, com foco em personalização de etapas, filtros objetivos e experiência do candidato.

---

## 5. Matriz Comparativa Global e Brasil

| Plataforma | Atuação principal | Motor de parsing | Matching e IA | Auto-rejeição por formulário (*knockout*) | Auto-rejeição autônoma por score de IA |
| --- | --- | --- | --- | --- | --- |
| **Workday Recruiting** | Global / Fortune 500 | Proprietário (+ Skills Cloud) | Busca nativa; **HiredScore** (notas A–D, ML explicável) e **Paradox** (conversacional) | Sim (configurável) | Não (IA apenas prioriza) |
| **SAP SuccessFactors** | Global / Enterprise | **Textkernel** (nativo, 15 idiomas); RChilli como add-on | Busca nativa; **Joule / AI Units** (*stack ranking* e *skills matching*) | Sim (configurável) | Não (priorização assistiva) |
| **SmartRecruiters (SAP)** | Global / Enterprise | Proprietário estruturado | **Winston Match** (1–4 estrelas com resumo) e **Winston Screen** | Sim (perguntas ponderadas e fluxos) | Não (revisão explicável; permite auto-avanço) |
| **Oracle Recruiting Cloud** | Global / Enterprise | Nativo (sem OCR) + add-ons Textkernel/RChilli | **Suggested Candidates** (0–3 estrelas em 4 eixos) | Sim (configurável) | Não |
| **Oracle Taleo (legado)** | Global / Legado | Proprietário legado (sem OCR nativo em digitais) | Busca literal + sistema **ACE** (*Required/Asset/Weight*) | Sim (*Disqualification Questions* imediatas) | Regras determinísticas de pré-triagem |
| **iCIMS** | Global / Enterprise | Proprietário + IA **Opening.io** (*Talent Logic*) | **Role Fit** (ensemble ML semântico, auditado NYC AEDT) | Sim (workflows de *knockout* configuráveis) | Não (IA consultiva) |
| **Greenhouse** | Global / Tech | ML interno + LLMs *fine-tuned* + OpenAI (sem OCR) | **Talent Matching** (faixas explicáveis com embeddings) | Sim (*Auto-Reject Rules* em perguntas fechadas) | Não (proibido por desenho) |
| **Lever (Employ)** | Global / Tech & Mid | Proprietário nativo (sem OCR) | Busca com *stemming* + **Talent Fit** (IA da Employ) | Sim (*knockout* + *auto-archive*) | Não |
| **Ashby** | Global / Tech & IA | Extração linear + anonimização de PII | **AI Application Review** (*Meets / Does Not Meet / Undecided* + citações) | Sim (*Auto-Reject Rules* imediatas) | Não (decisão humana obrigatória) |
| **BambooHR** | Global / SMB | Sem *parser* nativo (via terceiros) | Apenas via integrações externas | Perguntas básicas / manual | Não |
| **Gupy (+ Kenoby)** | Brasil / Grande porte e PME | NLP/LLM para pré-preenchimento de cadastro | Agentes de IA / afinidade (evolução da Gaia) + testes no funil | Sim (perguntas adicionais eliminatórias) | Não (IA apenas ordena) |
| **Pandapé (InfoJobs)** | Brasil / Alto volume | *Parser* nativo + importação InfoJobs/Catho | **Pandapé IA** e **Pandapé Genoma** (técnico + cultural) | Sim (*kill questions*) | Não (IA prioriza; *kill questions* descartam) |
| **Sólides** | Brasil / PME e Mid | *Parser* nativo | **Matcher** (técnico + perfil comportamental **Profiler**) | Sim (filtros e etapas) | Não |
| **VAGAS for Business** | Brasil / Enterprise & Volume | Cadastro estruturado + anexo | Filtros estruturados, testes e triagem por competências | Sim (perguntas eliminatórias) | Não |
| **Senior HCM** | Brasil / Mid & Enterprise | *Parser* nativo com cadastro único | **Matcher com IA** + automação conversacional | Sim (perguntas eliminatórias) | Não |
| **InHire / Quickin** | Brasil / Tech & Moderno | *Parser* nativo | Agentes de triagem em linguagem natural / *Match Score* | Sim (regras de formulário) | Assistivo com revisão humana |

---

## 6. Regulação, Compliance e o Fim da Rejeição Caixa-Preta

Três marcos jurídicos explicam por que os grandes ATS abandonaram pontuações opacas e restringiram descartes automáticos a critérios objetivos de formulário:

- **União Europeia — EU AI Act:** classifica sistemas de IA usados em recrutamento, triagem de candidatos e avaliação profissional como **alto risco**, exigindo governança de dados, documentação técnica, mitigação de viés, explicabilidade dos critérios e supervisão humana efetiva.
- **Estados Unidos — NYC Local Law 144 (AEDT) e *Mobley v. Workday*:** além de auditorias independentes obrigatórias de viés para ferramentas automatizadas em Nova York, a ação coletiva federal *Mobley v. Workday* estabeleceu precedente relevante ao admitir a responsabilização direta do fornecedor de ATS sob a teoria de "agente" por discriminação algorítmica.
- **Brasil — LGPD (Artigo 20) e atuação da ANPD:** o Artigo 20 da Lei Geral de Proteção de Dados garante expressamente ao titular o direito de pedir revisão de decisões tomadas **unicamente** com base em tratamento automatizado que definam seu **perfil profissional**, além do direito a informações claras sobre os critérios adotados (§1º) e do poder de auditoria da ANPD para apurar discriminação caso a empresa invoque segredo comercial (§2º). A tramitação do marco legal de IA no Congresso (PL 2338/2023) segue a mesma linha de enquadrar recrutamento como alto risco.

Para o desenho de qualquer simulador ou avaliador de currículos, a consequência é direta: **transparência por critério** (mostrar exatamente qual requisito foi comprovado, qual ficou ambíguo e qual está ausente) espelha muito melhor os ATS reais de 2025–2026 do que uma nota misteriosa sem justificativa.

---

## 7. Alinhamento do Motor de Pontuação e Prompts de Simulação

Para que o motor de análise ou os prompts de avaliação do projeto reflitam fielmente o mercado atual, a simulação deve abandonar perfis obsoletos baseados em mitos de SEO e operar sobre **três arquétipos técnicos** combinados a uma **arquitetura de avaliação em cinco camadas desacopladas**.

### 7.1 Os três arquétipos reais de ATS

Em vez de criar regras artificiais para cada marca, o avaliador pode operar em um perfil consolidado ou permitir ao usuário escolher o arquétipo mais próximo do seu alvo:

1. **Arquétipo A — Legado Literal e Busca Booleana**  
   *Representa:* Oracle Taleo clássico, buscas booleanas manuais sem sinônimos, formulários rígidos de portais corporativos.  
   *Comportamento simulado:* exige correspondência lexical exata dos termos da vaga, penaliza siglas desacompanhadas do termo por extenso (e vice-versa), valoriza nomenclaturas padrão de cargo e detecta quebras de formatação com maior rigor.

2. **Arquétipo B — Taxonomia e Matching Estruturado**  
   *Representa:* motores Textkernel/Sovren, SAP SuccessFactors, iCIMS, Senior HCM, Pandapé e VAGAS estruturados.  
   *Comportamento simulado:* avalia aderência normalizada por categorias (skills, cargos, formação, certificações, idiomas, indústria), reconhece sinônimos canônicos, aplica peso maior a experiências recentes e inclui checagem bidirecional de senioridade (evitando confundir excesso ou falta drástica de escopo com aderência perfeita).

3. **Arquétipo C — IA Semântica / LLM Assistiva + Revisão Humana**  
   *Representa:* Workday + HiredScore, Greenhouse Talent Matching, Ashby AI Review, SmartRecruiters Winston, Lever Talent Fit, Gupy (Agentes de IA), InHire e Quickin.  
   *Comportamento simulado:* decompõe a descrição da vaga em requisitos discretos e classifica cada um em `Atende`, `Parcial / Indeterminado` ou `Não comprovado`, exigindo **evidência textual citável** dentro das experiências (não bastando listar a palavra no rodapé), acompanhada de avaliação de escaneabilidade para o recrutador humano.

### 7.2 Arquitetura de avaliação em cinco camadas

| Camada | Natureza | O que avalia | Como reportar |
| --- | --- | --- | --- |
| **0. Elegibilidade (*Knockout*)** | Binária (bloqueadora, fora da média) | Requisitos objetivos e inegociáveis da vaga: localidade/modelo presencial, autorização de trabalho, idioma mandatório, registro profissional/CNH, formação mínima ou senioridade mínima. | Alerta explícito `PASSA / RISCO DE ELIMINAÇÃO / FALTAM DADOS` — nunca diluído dentro da nota de aderência. |
| **1. Integridade de *Parsing*** | Diagnóstico técnico | Texto selecionável (não imagem), layout linear de coluna única, cabeçalhos padrão, contatos no corpo principal, datas padronizadas (`MM/AAAA`), ausência de tabelas complexas, caixas de texto ou gráficos escondendo dados. | Lista de falhas reais de extração e grau de legibilidade estrutural. |
| **2. Cobertura de Requisitos e Vocabulário** | Lexical + taxonômica (sem *keyword density*) | Cobertura separada de requisitos obrigatórios (*must-have*) e desejáveis (*nice-to-have*), presença de pares sigla + termo por extenso para competências críticas e detecção de *keyword stuffing* sem contexto. | Percentual de cobertura por prioridade e lista de lacunas terminológicas. |
| **3. Aderência Semântica e Evidência por Critério** | Qualitativa estruturada + recência | Para cada requisito central da vaga: status (`Atende` / `Parcial` / `Não comprovado`), trecho citável do currículo que comprova a competência, recência de uso, senioridade e coerência de trajetória. | Matriz requisito x evidência (padrão Ashby / HiredScore / Greenhouse). |
| **4. Prontidão Humana e Contexto de Funil** | Orientação prática | Clareza na leitura de 10–20 segundos, resultados mensuráveis, alinhamento de título/resumo à vaga, alerta de revisão de cadastro pré-preenchido (Workday, SuccessFactors, Gupy, VAGAS) e aviso sobre etapas externas ao currículo (testes técnicos, lógica e perfil comportamental comuns no Brasil). | Recomendações acionáveis priorizadas por impacto real na conversão. |

### 7.3 Antipadrões explicitamente proibidos no motor de avaliação

- **Não emitir uma nota única opaca de "aprova/reprova":** induz a falsa ideia de corte automático único e esconde se o problema é elegibilidade, formatação ou evidência técnica.
- **Não usar *keyword density* (frequência relativa de palavras):** métrica herdada de SEO antigo; incentiva repetição artificial que prejudica a leitura humana e não representa o funcionamento dos ATS modernos.
- **Não penalizar PDF pesquisável em favor de DOCX:** diferenciar apenas PDF com texto selecionável (adequado) de PDF escaneado/imagem (inadequado).
- **Não simular rejeição automática por score de IA como regra geral:** separar com clareza o descarte automático via *knockout* de formulário da perda de visibilidade por baixa posição no ranqueamento.
- **Não "multar" presença de elementos visuais como se fossem infração:** parsers ignoram gráficos e ícones; o risco real a reportar é **perda de informação crítica** contida dentro desses elementos (como skills ou contatos que somem na extração).

---

## 8. Fontes e Referências

### Documentação oficial de fornecedores e engenharia

- **SAP SuccessFactors:** *Configuring Resume Parsing* e KBAs 2081576 / 2951470 (Textkernel como motor nativo, limitações de *picklist*, idiomas e *Mobile Apply*) — [SAP Help Portal](https://help.sap.com/docs/successfactors-recruiting/setting-up-and-maintaining-sap-successfactors-recruiting/configuring-resume-parsing)
- **SAP + SmartRecruiters:** comunicado oficial da aquisição (concluída em setembro de 2025) e documentação da suíte Winston AI — [SAP News](https://news.sap.com/) | [SmartRecruiters](https://www.smartrecruiters.com/)
- **Textkernel / Bullhorn:** *Search & Match Scoring* (*SovScore*, *Reverse Compatibility Score* e categorias), aquisição da Sovren (dez/2021) e aquisição da Textkernel pela Bullhorn (jun/2024) — [Textkernel Developer Docs](https://developer.textkernel.com/tx-platform/v10/search-match/overview/querying/) | [Bullhorn](https://www.bullhorn.com/)
- **Workday:** *Workday Skills Cloud*, aquisição da HiredScore (2024) e aquisição da Paradox (out/2025) — [Workday](https://www.workday.com/) | [HiredScore Responsible AI](https://www.hiredscore.com/fair-ai-for-hr)
- **Oracle:** *Oracle Recruiting Cloud Suggested Candidates* e documentação do *Taleo Enterprise Candidate Prescreening / Disqualification Questions* — [Oracle Docs](https://docs.oracle.com/en/cloud/saas/taleo-enterprise/21b/otrec/candidate-prescreening.html)
- **Greenhouse:** *Talent Matching FAQ*, *Data Processing FAQ*, *Auto-Reject Rules* e *Scorecard Overview* — [Greenhouse Support](https://support.greenhouse.io/hc/en-us/articles/41131886674075-Talent-Matching-FAQ)
- **Lever (Employ Inc.):** *Understanding Resume Parsing*, *Fast Resume Review*, *Talent Fit* e regras de *auto-archive* — [Lever Help Center](https://help.lever.co/hc/en-us/articles/20087345054749-Understanding-Resume-Parsing)
- **Ashby:** *AI-Assisted Application Review* e regras de avaliação de candidaturas — [Ashby](https://www.ashbyhq.com/)
- **iCIMS:** *Understanding iCIMS Talent Cloud AI* e aquisição da Opening.io (maio de 2020) — [iCIMS](https://www.icims.com/products/ai-recruiting-software/)
- **HireAbility:** documentação institucional e do parser *ALEX* (empresa independente) — [HireAbility](https://www.hireability.com/products/)
- **RChilli:** integrações para SAP SuccessFactors e Oracle Recruiting Cloud — [RChilli](https://www.rchilli.com/our-partners/sap-successfactors)
- **Eightfold.ai:** arquitetura de matching por embeddings e grafos de skills — [Eightfold Engineering Blog](https://eightfold.ai/engineering-blog/ai-powered-talent-matching-the-tech-behind-smarter-and-fairer-hiring/)

### Plataformas brasileiras

- **Gupy:** funcionamento de *parsing*, perguntas eliminatórias, testes, evolução da IA (Gaia / agentes de IA) e incorporação da Kenoby — [Gupy](https://www.gupy.io/)
- **Pandapé (InfoJobs):** *Pandapé IA*, *Pandapé Genoma*, *parsing* e *kill questions* — [Pandapé](https://www.pandape.com/)
- **Sólides:** ATS, *Matcher*, Engenharia de Cargos e mapeamento comportamental *Profiler* — [Sólides](https://solides.com.br/)
- **VAGAS for Business:** plataforma corporativa de recrutamento, filtros estruturados e banco de talentos — [VAGAS](https://www.vagas.com.br/)
- **Senior Sistemas:** Senior HCM Recrutamento e Seleção e *Matcher* com IA — [Senior](https://www.senior.com.br/)
- **InHire e Quickin:** triagem assistida por agentes de IA e *Match Score* — [InHire](https://inhire.com.br/) | [Quickin](https://quickin.io/)

### Pesquisa de mercado, estudos e marcos regulatórios

- **Harvard Business School & Accenture (2021):** *Hidden Workers: Untapped Talent* (origem da estatística de 88% de perda de candidatos qualificados por filtros rígidos)
- **Jobscan:** relatórios anuais de adoção de ATS na Fortune 500 (~98%–99% de adoção geral; Workday ~39%, SAP SuccessFactors ~13%) — [Jobscan Fortune 500 Report](https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems/)
- **Brasil — LGPD (Lei nº 13.709/2018, Artigo 20):** revisão e explicação de decisões automatizadas sobre perfil profissional — [Planalto](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)
- **União Europeia — EU AI Act (Regulamento UE 2024/1689):** classificação de sistemas de recrutamento e triagem como IA de alto risco
- **EUA — NYC Local Law 144 (AEDT) e *Mobley v. Workday, Inc.* (N.D. Cal.):** auditoria obrigatória de viés e responsabilização de fornecedores de ATS
