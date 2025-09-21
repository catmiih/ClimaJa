# 🌦️ ClimaJá+

Aplicação web **Mobile-First** para consulta de clima e previsão de 5 dias, desenvolvida com **React + Vite** e integração a uma API pública de meteorologia.

Foco em **responsividade**, **acessibilidade** e **componentes reutilizáveis**.

---

## ✨ Destaques

- 📱 **Mobile-First**: lista no mobile e cards em linha no desktop.
- 📅 **Previsão estendida**: data em PT-BR, ícone e temperatura média.
- 🌅 **Página de detalhes**: nascer/pôr do sol, umidade, vento e condição climática.
- 🔍 **Busca por cidade** com atualização reativa dos componentes.
- 🛠️ Arquitetura simples e escalável: serviços para API, componentes desacoplados e estilos modulares.

---

## 🧰 Tecnologias

- **React** (Vite)
- **React Router**
- **Axios**
- **React Icons**
- **CSS** com abordagem **Mobile-First**

---

## 🌐 API Utilizada

O projeto **ClimaJá+** utiliza a [WeatherAPI](https://www.weatherapi.com/), uma API pública de dados meteorológicos que fornece informações em tempo real e previsões futuras.

### 📌 Principais recursos utilizados
- **Previsão de 5 dias**: temperaturas médias, condições climáticas e ícones.
- **Dados astronômicos (astro)**: horários de nascer e pôr do sol.
- **Localização**: nome da cidade e região pesquisada.
- **Alertas climáticos**: Alertas de chuvas, ventos ou outros eventos quando disponíveis.

### 📄 Formato de resposta
A API retorna um objeto JSON com:
- `location` → informações da cidade/região.
- `current` → dados do clima atual.
- `forecast.forecastday[]` → lista de dias com previsão, temperatura, condição e dados astronômicos.
- `alerts` → lista de alertas (quando disponíveis).

### 🔗 Endpoint principal
```http
GET https://api.weatherapi.com/v1/forecast.json

---

## ▶️ Como rodar localmente

```bash
# 1) Instale as dependências
npm install

# 2) Configure as variáveis de ambiente (ver seção abaixo)

# 3) Rode em modo desenvolvimento
npm run dev

# 4) Build de produção (opcional)
npm run build
npm run preview
