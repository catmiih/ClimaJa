# 📋 Backlog — ClimaJá+

---

## 🟢 Sprint 1 — Definição inicial (TP1)
- Definição do projeto: escolha do tema (aplicativo de clima).  
- Escopo e objetivos: consulta de previsão de 5 dias, mobile-first, dados externos.  
- Gestão ágil: criação inicial do cronograma em sprints.  
- Histórias de usuário iniciais (HU-01, HU-02) documentadas.  

**Status:** Concluído ✅

---

## 🟢 Sprint 2 — Primeira versão do sistema (TP2)
- Implementação da Home (SPA inicial).  
- Integração com WeatherAPI (forecast de 5 dias).  
- Componente `WeatherCard`: data, ícone, temperatura.  
- Layout responsivo (mobile-first).  
- Histórias revisadas: HU-01, HU-02.  

**Status:** Concluído ✅

---

## 🟢 Sprint 3 — Evolução com nova página (TP3)
- Página Detalhes (`/detalhes/:date`): dados astro, vento, umidade, condição.  
- Reorganização dos cards na Home (melhor responsividade).  
- Documentação: `README.md`, `STORIES.md`, `BACKLOG.md`.  
- Reuso inicial de componentes (`WeatherCard` em mais de uma rota).  
- História HS-03 criada e implantada.  
- História HS-CORE implementada (fluxo completo: pesquisa → cards → detalhes).  

**Status:** Concluído ✅

---

## 🟢 Sprint 4 — Mudança de requisito (TP4)
- Menu de navegação (HU-NAV): Header com links e página ativa destacada.  
- Gestos mobile (HU-GESTURES):  
  - Swipe lateral para navegar entre dias.  
  - Pull-to-refresh para recarregar previsão.  
- Reuso explícito de componentes:  
  - Criação do `StatItem` (ícone + label + valor).  
  - Criação do `MetricsRow` (usa `StatItem`) → utilizado na Home e na Detalhes.  
- Backlog revisado (este documento).  
- Histórias revisadas: HU-NAV e HU-GESTURES adicionadas.  
- Testes automatizados (React Testing Library): Implementação dos casos no cenário atual.  

**Status:** Concluído ✅

---

## 🟢 Sprint 5 — Funcionalidades finais (TP5)  
- Autenticação com Firebase (HU-AUTH):  
  - Login e registro com e-mail/senha.  
  - Rotas protegidas (`ProtectedRoute`).  
  - Botão de logout no Header.  
- Consulta automática por geolocalização (HU-04): previsão carregada com base no GPS.  
- Compatibilidade iOS/Android (HU-05): documentação e ajustes de usabilidade.  
- Refinos de UX:  
  - Tela de login/register estilizadas.  
  - Melhor feedback em erros de busca e geolocalização.  
- Backlog e histórias de usuário atualizados para entrega final.  

**Status:** Concluído ✅

---

## 🧾 Resumo visual  
- **TP1:** Planejamento e histórias iniciais.  
- **TP2:** Home + API + responsividade.  
- **TP3:** Página de detalhes + fluxo completo + documentação.  
- **TP4:** Menu, gestos mobile, reuso de componentes, testes.  
- **TP5:** Login Firebase, geolocalização, compatibilidade mobile, refinamentos finais.  