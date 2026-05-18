import { CSSProperties } from 'react'
import care from '../assets/care.png'
import brain from '../assets/brain.png'
import phone from '../assets/phone.png'
import book from '../assets/book.png'

interface CardProps {
  title: string
  description: string
  imageUrl?: string
  button?: string
}

const styles: Record<string, CSSProperties> = {
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '40px',
    padding: '80px 40px',
    maxWidth: '70dvw',
    margin: '0 auto',
  },
  card: {
    background: 'linear-gradient(145deg, #e8f4fb, #d0eaf7)',
    border: '2px solid #5aace0',
    borderRadius: '20px',
    padding: '36px 32px',
    width: '350px',
    boxShadow: '4px 4px 12px rgba(90, 172, 224, 0.2)',
    textAlign: 'justify',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    justifyContent: 'space-between',
  },
  title: {
    color: '#2980b9',
    fontSize: '24px',
    fontWeight: '100',
    letterSpacing: '0.08em',
    textAlign: 'center',
    margin: 0,
    fontFamily: 'Bebas Neue',
    textTransform: 'uppercase',
  },
  description: {
    color: '#333',
    fontSize: '20px',
    lineHeight: '1.8',
    margin: 0,
  },
  image: {
    width: 'auto',
    borderRadius: '12px',
    objectFit: 'cover',
    height: '5dvh',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
  },
  button: {
    marginTop: '8px',
    padding: '10px 20px',
    background: '#2e86c1',
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    fontSize: '15px',
    cursor: 'pointer',
    alignSelf: 'center',
  },
}

const cardData = [
  {
    imageUrl: care,
    title: 'Grupos de apoio',
    description: 'Conecte-se com outros pacientes e familiares que entendem o que você está passando.',
    button: 'Encontrar grupos',
  },
  {
    imageUrl: brain,
    title: 'Apoio Psicológico',
    description: 'Psicólogos especializados em oncologia podem ajudar você e sua família a enfrentar esse momento.',
    button: 'Saiba mais',
  },
  {
    imageUrl: phone,
    title: 'Linha de Apoio INCA',
    description: 'O Instituto Nacional de Câncer oferece atendimento gratuito pelo telefone.',
    button: 'Entrar em contato',
  },
  {
    imageUrl: book,
    title: 'Material Educativo',
    description: 'Cartilhas, vídeos e guias explicativos em linguagem simples sobre diagnóstico e tratamento. (Gratuitos)',
    button: 'Acessar material',
  },
]

export function Card({ title, description, imageUrl, button }: CardProps) {
  return (
    <div style={styles.card}>
      {imageUrl && <img src={imageUrl} alt={title} style={styles.image} />}
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.description}>{description}</p>
      {button && <button style={styles.button}>{button}</button>}
    </div>
  )
}

export default function CardsHooks() {
  return (
    <div style={styles.grid}>
      {cardData.map((card) => (
        <Card
          key={card.title}
          title={card.title}
          description={card.description}
          imageUrl={card.imageUrl}
          button={card.button}
        />
      ))}
    </div>
  )
}