import { useState } from 'react'
import ElevenLogo from './assets/Eleven.png'
import './App.css'
import Card from './components/cardsInfo'
import ChatBot from './components/ChatBot'

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="header-container">
        <img src={ElevenLogo} alt="Logo" />

        <button className="menu-hamburger" onClick={() => setIsOpen(!isOpen)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>

        <nav className={isOpen ? "nav-menu open" : "nav-menu"}>
          <ul>
            <li><a href="#info">INFORMAÇÕES</a></li>
            <li><a href="#ia">FALE COM A IA</a></li>
            <li><a href="#care">APOIO</a></li>
            <li><a href="#places">LOCAIS</a></li>
            <li><a href="#doctors">MÉDICOS</a></li>
          </ul>
        </nav>

        <button className="portal-btn">Portal médico</button>
      </header>

      <section className="main">
        <div id='info'>
          <h1>Apoio, informação e <span>cuidado</span> para quem <br />enfrenta o câncer de próstata</h1>
          <p>Um espaço acolhedor para pacientes e familiares tirarem dúvidas, encontrarem recursos e se conectarem com profissionais de saúde.</p>
        </div>
        <div className="buttonsMain">
          <button id='talkEl'>Falar com a El</button>
          <button id='learnMore'>Saiba mais</button>
        </div>
      </section>

      <section className="first-page">
        <div id='first-info'>
          <h1>O que você precisa saber?</h1>
          <p>Informações claras e confiáveis sobre o câncer de próstata</p>
        </div>
        <Card
          title="Título do Card"
          description="Uma descrição breve e informativa sobre o conteúdo."
          image="https://via.placeholder.com/320x180"
          footer="Publicado em maio de 2026"
        />
      </section>
      <section className="second-page" id="ia">
        <ChatBot />
      </section>
      <section className="third-page" id="hooks">
        <Card
          title="Título do Card"
          description="Uma descrição breve e informativa sobre o conteúdo."
          image="https://via.placeholder.com/320x180"
          footer="Publicado em maio de 2026"
        />
      </section>
    </>
  )
}

export default App