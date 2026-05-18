import { useState, useRef, useEffect, CSSProperties } from 'react'
const balaoIcon = new URL('../assets/balao-de-fala.png', import.meta.url).href

interface Message {
  id: number
  text: string
  sender: 'bot' | 'user'
  time: string
}

function getTime() {
  const now = new Date()

  return `${now
    .getHours()
    .toString()
    .padStart(2, '0')}:${now
    .getMinutes()
    .toString()
    .padStart(2, '0')}`
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage() {
    const text = input.trim()

    if (!text || loading) return

    const userMsg: Message = {
      id: Date.now(),
      text,
      sender: 'user',
      time: getTime(),
    }

    setMessages((prev) => [...prev, userMsg])

    setInput('')
    setLoading(true)

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system:
            'Você é El, um assistente especialista em câncer de próstata.',
          messages: [{ role: 'user', content: text }],
        }),
      })

      const data = await response.json()

      const reply =
        data.content?.[0]?.text ??
        'Desculpe, não consegui processar sua pergunta.'

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: reply,
          sender: 'bot',
          time: getTime(),
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: 'Erro ao conectar. Tente novamente.',
          sender: 'bot',
          time: getTime(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <section style={styles.section}>
      <div style={styles.sectionInfo}>
        <h1 style={styles.sectionTitle}>TIRE AS SUAS DÚVIDAS</h1>

        <p style={styles.sectionSubtitle}>
          Nosso assistente de IA está aqui para te ajudar
        </p>
      </div>

      <div style={styles.chatWrapper}>
        <div style={styles.chatHeader}>
          <img src={balaoIcon} alt="Ícone de balão de fala" style={styles.avatar} />

          <div>
            <div style={styles.botName}>El</div>

            <div style={styles.botSubtitle}>
              Chatbot – Especialista em câncer de próstata
            </div>
          </div>
        </div>

        <div style={styles.messagesArea}>
          {messages.length === 0 && !loading && (
            <div style={styles.emptyState}>
              <img src={balaoIcon} alt="Ícone de balão de fala" style={styles.emptyIcon} />

              <p style={styles.emptyText}>
                Digite uma pergunta para começar
              </p>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                ...styles.messageRow,
                justifyContent:
                  msg.sender === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  ...styles.bubble,
                  ...(msg.sender === 'user'
                    ? styles.bubbleUser
                    : styles.bubbleBot),
                }}
              >
                <span
                  style={{
                    ...styles.bubbleText,
                    color: msg.sender === 'user' ? '#1a5276' : '#fff',
                  }}
                >
                  {msg.text}
                </span>

                <span
                  style={{
                    ...styles.bubbleTime,
                    color:
                      msg.sender === 'user'
                        ? '#7fb3d3'
                        : 'rgba(255,255,255,0.7)',
                  }}
                >
                  {msg.time}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ ...styles.messageRow, justifyContent: 'flex-start' }}>
              <div style={{ ...styles.bubble, ...styles.bubbleBot }}>
                <span style={{ ...styles.bubbleText, color: '#fff' }}>
                  Digitando...
                </span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div style={styles.inputArea}>
          <input
            style={styles.input}
            type="text"
            placeholder="Digite a sua dúvida..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={loading}
          />

          <button
            style={styles.sendBtn}
            onClick={sendMessage}
            disabled={loading}
          >
            ➤
          </button>
        </div>
      </div>
    </section>
  )
}

const styles: Record<string, CSSProperties> = {
  section: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '32px',
    padding: '140px 20px',
  },

  sectionInfo: {
    textAlign: 'center',
    color: '#fff',
  },

  sectionTitle: {
    fontSize: '50px',
    marginBottom: '15px',
  },

  sectionSubtitle: {
    fontSize: '20px',
  },

  chatWrapper: {
    width: '100%',
    maxWidth: '600px',
    borderRadius: '16px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
  },

  chatHeader: {
    background: '#2e86c1',
    padding: '14px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },

  avatar: {
    width: '28px',
    height: '28px',
    objectFit: 'contain',
  },

  botName: {
    color: '#fff',
    fontWeight: '700',
  },

  botSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: '12px',
  },

  messagesArea: {
    minHeight: '450px',
    maxHeight: '500px',
    overflowY: 'auto',
    padding: '20px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },

  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    marginTop: '100px',
  },

  emptyIcon: {
    width: '48px',
    height: '48px',
    objectFit: 'contain',
  },

  emptyText: {
    color: '#999',
  },

  messageRow: {
    display: 'flex',
  },

  bubble: {
    maxWidth: '75%',
    padding: '10px 14px',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },

  bubbleBot: {
    background: '#2e86c1',
  },

  bubbleUser: {
    background: '#eaf4fb',
  },

  bubbleText: {
    fontSize: '14px',
  },

  bubbleTime: {
    fontSize: '11px',
    alignSelf: 'flex-end',
  },

  inputArea: {
    display: 'flex',
    gap: '10px',
    padding: '14px 16px',
    borderTop: '1px solid #eee',
  },

  input: {
    flex: 1,
    border: '1px solid #aed6f1',
    borderRadius: '30px',
    padding: '10px 18px',
    outline: 'none',
  },

  sendBtn: {
    background: '#2e86c1',
    border: 'none',
    borderRadius: '50%',
    width: '42px',
    height: '42px',
    color: '#fff',
    cursor: 'pointer',
  },
}