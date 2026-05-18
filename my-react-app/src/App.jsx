import { useState } from 'react'
import ElevenLogo from './assets/Eleven.png'
import './App.css'
import Card from './components/CardsInfo'
import ChatBot from './components/ChatBot'
import CardsHooks from './components/CardsHooks'
import HospitalSearch from './components/HospitalSearch'
import DoctorSearch from './components/DoctorSearch'
import DoctorPortal from './components/DoctorPortal'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [showPortal, setShowPortal] = useState(false)

  if (showPortal) return <DoctorPortal onBack={() => setShowPortal(false)} />

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
            <li><a href="#first-info">APOIO</a></li>
            <li><a href="#places">LOCAIS</a></li>
            <li><a href="#doctors">MÉDICOS</a></li>
          </ul>
        </nav>

        <button className="portal-btn" onClick={() => setShowPortal(true)}>
          Portal médico
        </button>
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
        <Card />
      </section>

      <section className="second-page" id="ia">
        <ChatBot />
      </section>

      <section className="third-page" id="hooks">
        <div id='first-info'>
          <h1>O que você precisa saber?</h1>
          <p>Informações claras e confiáveis sobre o câncer de próstata</p>
        </div>
        <CardsHooks />
      </section>

      <section id="places">
        <HospitalSearch />
      </section>

      <section id="doctors">
        <DoctorSearch />
      </section>
    </>
  )
}

export default App