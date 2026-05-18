import { useState, CSSProperties } from 'react'

const states = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']
const especialidades = ['Urologia', 'Oncologia', 'Radioterapia', 'Clínica Geral', 'Geriatria', 'Cirurgia Oncológica']
const modalidades = ['Presencial', 'Remoto', 'Presencial e Remoto']

interface DoctorPortalProps {
  onBack: () => void
}

export default function DoctorPortal({ onBack }: DoctorPortalProps) {
  const [tab, setTab] = useState<'cadastrar' | 'entrar'>('cadastrar')

  const [registerForm, setRegisterForm] = useState({
    nome: '', crm: '', especialidade: '', modalidade: '',
    estado: '', cidade: '', email: '', senha: '',
  })

  const [loginForm, setLoginForm] = useState({ email: '', senha: '' })
  const [showSenhaLogin, setShowSenhaLogin] = useState(false)
  const [showSenhaRegister, setShowSenhaRegister] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleRegister() {
    const { nome, crm, especialidade, modalidade, estado, cidade, email, senha } = registerForm
    if (!nome || !crm || !especialidade || !modalidade || !estado || !cidade || !email || !senha) {
      alert('Preencha todos os campos.')
      return
    }
    setSubmitted(true)
  }

  function handleLogin() {
    const { email, senha } = loginForm
    if (!email || !senha) {
      alert('Preencha e-mail e senha.')
      return
    }
    alert('Login realizado com sucesso!')
  }

if (submitted) {
    return (
      <section style={styles.section}>
        <div style={styles.successBox}>
          <div style={styles.successIcon}>✅</div>
          <h2 style={styles.successTitle}>Cadastro realizado!</h2>
          <p style={styles.successText}>
            Obrigado, <strong>{registerForm.nome}</strong>! Seu cadastro foi enviado e está em análise.
            Em breve você receberá um e-mail de confirmação em <strong>{registerForm.email}</strong>.
          </p>
          <button style={styles.btnPrimary} onClick={() => setSubmitted(false)}>Novo cadastro</button>
          <button style={{ ...styles.btnPrimary, background: '#fff', color: '#2e86c1', border: '2px solid #2e86c1' }} onClick={onBack}>Voltar ao site</button>
        </div>
      </section>
    )
  }

  return (
    <section style={styles.section}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>MÉDICOS E ESPECIALISTAS</h1>
        <p style={styles.subtitle}>Cadastre-se para se juntar ao time Eleven e ajudar-mos a salvar vidas</p>
      </div>

      <div style={styles.content}>
        {/* Left side */}
        <div style={styles.leftSide}>
          <h2 style={styles.leftTitle}>POR QUE SE CADASTRAR NA PROVIDA?</h2>
          <p style={styles.leftText}>
            Conecte sua prática médica a pacientes que precisam de orientação especializada.
            Ofereça teleconsultas, presenciais ou tire dúvidas na plataforma.
          </p>
          <ul style={styles.benefitsList}>
            {[
              'Perfil profissional completo',
              'Visibilidade para pacientes da sua região',
              'Agendamento facilitado',
              'Contribua com a saúde do homem brasileiro',
              'Gratuito para cadastro básico',
            ].map((b) => (
              <li key={b} style={styles.benefitItem}>
                <span style={styles.checkIcon}>✅</span> {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Right side — form */}
        <div style={styles.formBox}>
          {/* Tabs */}
          <div style={styles.tabs}>
            <button
              style={{ ...styles.tab, ...(tab === 'cadastrar' ? styles.tabActive : styles.tabInactive) }}
              onClick={() => setTab('cadastrar')}
            >
              Cadastrar
            </button>
            <button
              style={{ ...styles.tab, ...(tab === 'entrar' ? styles.tabActive : styles.tabInactive) }}
              onClick={() => setTab('entrar')}
            >
              Entrar
            </button>
          </div>

          {tab === 'cadastrar' ? (
            <div style={styles.form}>
              <h3 style={styles.formTitle}>Cadastro de Médico</h3>

              <Field label="Nome completo">
                <input style={styles.input} type="text" value={registerForm.nome}
                  onChange={(e) => setRegisterForm({ ...registerForm, nome: e.target.value })} />
              </Field>

              <Field label="CRM">
                <input style={styles.input} type="text" placeholder="CRM/SP 123456"
                  value={registerForm.crm}
                  onChange={(e) => setRegisterForm({ ...registerForm, crm: e.target.value })} />
              </Field>

              <Field label="Especialidade">
                <select style={styles.select} value={registerForm.especialidade}
                  onChange={(e) => setRegisterForm({ ...registerForm, especialidade: e.target.value })}>
                  <option value=""></option>
                  {especialidades.map((e) => <option key={e} value={e}>{e}</option>)}
                </select>
              </Field>

              <Field label="Modalidade de atendimento">
                <select style={styles.select} value={registerForm.modalidade}
                  onChange={(e) => setRegisterForm({ ...registerForm, modalidade: e.target.value })}>
                  <option value=""></option>
                  {modalidades.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </Field>

              <Field label="Estado">
                <select style={styles.select} value={registerForm.estado}
                  onChange={(e) => setRegisterForm({ ...registerForm, estado: e.target.value, cidade: '' })}>
                  <option value=""></option>
                  {states.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>

              <Field label="Cidade">
                <input style={styles.input} type="text" placeholder="Sua cidade"
                  value={registerForm.cidade}
                  onChange={(e) => setRegisterForm({ ...registerForm, cidade: e.target.value })} />
              </Field>

              <Field label="E-mail">
                <input style={styles.input} type="email" placeholder="email@clinica.com"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })} />
              </Field>

              <Field label="Senha">
                <div style={styles.passwordWrapper}>
                  <input
                    style={{ ...styles.input, flex: 1 }}
                    type={showSenhaRegister ? 'text' : 'password'}
                    placeholder="Crie uma senha segura"
                    value={registerForm.senha}
                    onChange={(e) => setRegisterForm({ ...registerForm, senha: e.target.value })}
                  />
                  <button type="button" style={styles.eyeBtn} onClick={() => setShowSenhaRegister((prev) => !prev)}>
                    {showSenhaRegister ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </Field>

              <button style={styles.btnSubmit} onClick={handleRegister}>Criar conta</button>
            </div>
          ) : (
            <div style={styles.form}>
              <h3 style={styles.formTitle}>Entrar na plataforma</h3>

              <Field label="E-mail">
                <input style={styles.input} type="email" placeholder="email@clinica.com"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} />
              </Field>

              <Field label="Senha">
                <div style={styles.passwordWrapper}>
                  <input
                    style={{ ...styles.input, flex: 1 }}
                    type={showSenhaLogin ? 'text' : 'password'}
                    placeholder="Sua senha"
                    value={loginForm.senha}
                    onChange={(e) => setLoginForm({ ...loginForm, senha: e.target.value })}
                  />
                  <button type="button" style={styles.eyeBtn} onClick={() => setShowSenhaLogin((prev) => !prev)}>
                    {showSenhaLogin ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </Field>

              <p style={styles.forgotPassword}>Esqueceu sua senha?</p>

              <button style={styles.btnSubmit} onClick={handleLogin}>Entrar</button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{ fontSize: '13px', color: '#444', fontWeight: '500' }}>{label}</label>
      {children}
    </div>
  )
}

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8.2c-1.77 0-3.2 1.43-3.2 3.2s1.43 3.2 3.2 3.2 3.2-1.43 3.2-3.2-1.43-3.2-3.2-3.2z" fill="#2e86c1" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6c4.97 0 9.39 3.16 11 6-1.24 2.54-4.09 4.63-7.5 5.36l1.44 1.44-1.41 1.41-1.42-1.42C13.43 18.96 12.73 19 12 19c-4.97 0-9.39-3.16-11-6 1.24-2.54 4.09-4.63 7.5-5.36L5.06 5.64 6.47 4.23l1.42 1.42C9.57 5.04 10.27 5 11 5c.8 0 1.56.08 2.29.24L14.77 5.5C13.83 5.18 12.92 5 12 5zm7.15 10.33l-1.42-1.42C17.3 14.78 16.21 15 15 15c-3.31 0-6-2.69-6-6 0-1.21.22-2.3.63-3.31L9.68 4.91C8.75 5.48 7.9 6.18 7.16 7.01 5.27 8.99 4 10.92 4 12c1.54 3.5 5.34 6 8 6 1.26 0 2.44-.38 3.44-1.02l1.42 1.42 1.41-1.41z" fill="#2e86c1" />
    </svg>
  )
}

const styles: Record<string, CSSProperties> = {
  section: {
    background: '#eaf4fb',
    minHeight: '100vh',
    padding: '60px 40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '40px',
  },
  header: {
    textAlign: 'center',
  },
  title: {
    fontFamily: "'Bebas Neue', cursive",
    fontSize: '40px',
    fontWeight: 400,
    color: '#2e86c1',
    letterSpacing: '2px',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '15px',
    color: '#555',
  },
  content: {
    display: 'flex',
    gap: '60px',
    alignItems: 'flex-start',
    width: '100%',
    maxWidth: '900px',
    flexWrap: 'wrap',
  },
  leftSide: {
    flex: 1,
    minWidth: '220px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  leftTitle: {
    fontFamily: "'Bebas Neue', cursive",
    fontSize: '22px',
    fontWeight: 400,
    color: '#1a5276',
    letterSpacing: '1px',
  },
  leftText: {
    fontSize: '14px',
    color: '#555',
    lineHeight: '1.7',
    textAlign: 'justify',
  },
  benefitsList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: 0,
  },
  benefitItem: {
    fontSize: '14px',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  checkIcon: {
    fontSize: '16px',
  },
  formBox: {
    flex: 1,
    minWidth: '280px',
    background: '#fff',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  },
  tabs: {
    display: 'flex',
  },
  tab: {
    flex: 1,
    padding: '14px',
    fontSize: '15px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
  },
  tabActive: {
    background: '#2e86c1',
    color: '#fff',
  },
  tabInactive: {
    background: '#eaf4fb',
    color: '#2e86c1',
  },
  form: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1a5276',
    margin: 0,
  },
  input: {
    border: '1px solid #aed6f1',
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '14px',
    color: '#333',
    outline: 'none',
    background: '#f7fbfe',
  },
  passwordWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  eyeBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  select: {
    border: '1px solid #aed6f1',
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '14px',
    color: '#333',
    outline: 'none',
    background: '#f7fbfe',
    cursor: 'pointer',
    width: '100%',
  },
  btnSubmit: {
    background: '#2e86c1',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '14px',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '8px',
  },
  forgotPassword: {
    fontSize: '13px',
    color: '#2e86c1',
    cursor: 'pointer',
    textDecoration: 'underline',
    textAlign: 'right',
  },
  successBox: {
    background: '#fff',
    borderRadius: '16px',
    padding: '48px 40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    maxWidth: '440px',
    textAlign: 'center',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  },
  successIcon: {
    fontSize: '48px',
  },
  successTitle: {
    fontSize: '24px',
    color: '#1a5276',
    fontWeight: '700',
  },
  successText: {
    fontSize: '15px',
    color: '#555',
    lineHeight: '1.7',
  },
  btnPrimary: {
    background: '#2e86c1',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 32px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
  },
}