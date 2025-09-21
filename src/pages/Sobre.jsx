import "./Sobre.css";

export default function Sobre() {
  return (
    <div className="about">
      <h1>Sobre o ClimaJá+</h1>
      <p className="lead">
        Aplicação web <strong>Mobile-First</strong> para consultar o clima e a
        previsão de 5 dias, construída com <strong>React</strong> e integração a
        uma API pública de meteorologia.
      </p>

      <section className="card">
        <h2>Objetivo</h2>
        <p>
          Entregar uma experiência simples e rápida para pesquisar uma cidade,
          ver a previsão resumida por dia e acessar detalhes como nascer/pôr do
          sol, umidade e vento.
        </p>
      </section>

      <section className="grid">
        <div className="card">
          <h3>Tecnologias</h3>
          <ul>
            <li>React</li>
            <li>React Router</li>
            <li>Axios</li>
            <li>React Icons</li>
            <li>CSS Mobile-First</li>
          </ul>
        </div>
        <div className="card">
          <h3>Principais recursos</h3>
          <ul>
            <li>Busca por cidade</li>
            <li>Previsão de 5 dias</li>
            <li>Página de detalhes</li>
            <li>Gestos no mobile (swipe)</li>
            <li>Componentes reutilizáveis</li>
          </ul>
        </div>
      </section>

      <section className="card">
        <h2>Como usar</h2>
        <ol>
          <li>Digite a cidade na busca da Home.</li>
          <li>Deslize (mobile) ou clique nos cards para navegar.</li>
          <li>Abra um dia para ver detalhes completos.</li>
        </ol>
      </section>

      <footer className="muted">
        Projeto acadêmico — Desenvolvido por Emily.
      </footer>
    </div>
  );
}
