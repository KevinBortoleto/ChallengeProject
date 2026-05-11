import { CSSProperties } from 'react'

interface CardProps {
  title: string
  description: string
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
}

const cardData = [
  {
    title: 'O QUE É?',
    description:
      'O câncer de próstata é o tumor maligno mais comum em homens no Brasil. Ele se desenvolve nas células da glândula prostática, geralmente de forma lenta.',
  },
  {
    title: 'SINTOMAS',
    description:
      'Dificuldade para urinar, jato urinário fraco, necessidade frequente de urinar à noite e, em estágios avançados, dor óssea. Muitas vezes é assintomático no início.',
  },
  {
    title: 'DIAGNÓSTICO',
    description:
      'Realizado por exame de toque retal e exame de sangue PSA. A biópsia confirma o diagnóstico. Homens acima de 50 anos devem fazer exames anuais.',
  },
  {
    title: 'TRATAMENTOS',
    description:
      'Incluem cirurgia (prostatectomia), radioterapia, hormonioterapia e, em casos iniciais, vigilância ativa. O tratamento depende do estágio e da saúde do paciente.',
  },
  {
    title: 'PREVENÇÃO',
    description:
      'Alimentação saudável, prática de exercícios físicos e exames regulares a partir dos 50 anos (ou 45 para grupos de risco) são fundamentais para a prevenção.',
  },
  {
    title: 'ESTATÍSTICAS',
    description:
      'É o 2º tipo de câncer mais comum entre homens no Brasil. Quando detectado cedo, a taxa de cura supera 90%. O diagnóstico precoce salva vidas.',
  },
]

export function Card({ title, description }: CardProps) {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.description}>{description}</p>
    </div>
  )
}

export default function CardsInfo() {
  return (
    <div style={styles.grid}>
      {cardData.map((card) => (
        <Card key={card.title} title={card.title} description={card.description} />
      ))}
    </div>
  )
}