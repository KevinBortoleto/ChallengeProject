import { useState, CSSProperties } from 'react'
import placeholder from '../assets/placeholder.png'
import phone from '../assets/phone.png'
import whatsapp from '../assets/whatsapp.svg'
import ElevenLogo from '../assets/Eleven-removebg-preview (2).png'

interface Doctor {
  name: string
  crm: string
  city: string
  state: string
  especialidade: string
  modalidade: ('Presencial' | 'Remoto')[]
  whatsapp?: string
  phone?: string
  imageUrl?: string
  mapsUrl?: string
  siteUrl?: string
}

const doctorsData: Doctor[] = [
  {
    name: 'Pedro Rocha da Silva',
    crm: 'CRM/SP 654321',
    city: 'São Paulo',
    state: 'SP',
    especialidade: 'Urologia',
    modalidade: ['Presencial', 'Remoto'],
    whatsapp: '5511999999999',
    phone: '1133333333',
    mapsUrl: 'https://maps.google.com',
    siteUrl: 'https://example.com',
  },
  {
    name: 'João Carlos Machado',
    crm: 'CRM/SP 123456',
    city: 'São Paulo',
    state: 'SP',
    especialidade: 'Oncologia',
    modalidade: ['Remoto'],
    whatsapp: '5511988888888',
    phone: '1122222222',
    mapsUrl: 'https://maps.google.com',
    siteUrl: 'https://example.com',
  },
  {
    name: 'Ana Beatriz Ferreira',
    crm: 'CRM/RJ 987654',
    city: 'Rio de Janeiro',
    state: 'RJ',
    especialidade: 'Urologia',
    modalidade: ['Presencial'],
    phone: '2133334444',
    mapsUrl: 'https://maps.google.com',
    siteUrl: 'https://example.com',
  },
  {
    name: 'Carlos Eduardo Mendes',
    crm: 'CRM/MG 456789',
    city: 'Belo Horizonte',
    state: 'MG',
    especialidade: 'Oncologia',
    modalidade: ['Presencial', 'Remoto'],
    whatsapp: '5531977776666',
    phone: '3133335555',
    mapsUrl: 'https://maps.google.com',
    siteUrl: 'https://example.com',
  },
  {
    name: 'Fernanda Lima Costa',
    crm: 'CRM/RS 321654',
    city: 'Porto Alegre',
    state: 'RS',
    especialidade: 'Radioterapia',
    modalidade: ['Presencial'],
    phone: '5133336666',
    mapsUrl: 'https://maps.google.com',
    siteUrl: 'https://example.com',
  },
]

const states = ['SP', 'RJ', 'MG', 'RS', 'PR', 'CE', 'BA']
const citiesByState: Record<string, string[]> = {
  SP: ['São Paulo', 'Campinas', 'Barretos'],
  RJ: ['Rio de Janeiro', 'Niterói'],
  MG: ['Belo Horizonte'],
  RS: ['Porto Alegre'],
  PR: ['Curitiba'],
  CE: ['Fortaleza'],
  BA: ['Salvador'],
}
const especialidades = ['Urologia', 'Oncologia', 'Radioterapia', 'Clínica Geral']
const modalidades = ['Presencial', 'Remoto']

export default function DoctorSearch() {
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedEspecialidade, setSelectedEspecialidade] = useState('')
  const [selectedModalidade, setSelectedModalidade] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [filtered, setFiltered] = useState<Doctor[]>(doctorsData)

  function handleFilter() {
    setFiltered(
      doctorsData.filter((d) => {
        const matchState = !selectedState || d.state === selectedState
        const matchCity = !selectedCity || d.city === selectedCity
        const matchEsp = !selectedEspecialidade || d.especialidade === selectedEspecialidade
        const matchMod = !selectedModalidade || d.modalidade.includes(selectedModalidade as 'Presencial' | 'Remoto')
        const matchName = !nameFilter || d.name.toLowerCase().includes(nameFilter.toLowerCase())
        return matchState && matchCity && matchEsp && matchMod && matchName
      })
    )
  }

  function handleClear() {
    setSelectedState('')
    setSelectedCity('')
    setSelectedEspecialidade('')
    setSelectedModalidade('')
    setNameFilter('')
    setFiltered(doctorsData)
  }

  return (
    <>
      <section style={styles.section}>
        <div style={styles.filterBox}>
          <p style={styles.filterLabel}>ENCONTRAR PROFISSIONAL</p>

          <div style={styles.filterRow}>
            <div style={styles.filterGroup}>
              <label style={styles.label}>Estado</label>
              <select style={styles.select} value={selectedState} onChange={(e) => { setSelectedState(e.target.value); setSelectedCity('') }}>
                <option value=""></option>
                {states.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.label}>Cidade</label>
              <select style={styles.select} value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedState}>
                <option value=""></option>
                {(citiesByState[selectedState] || []).map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.label}>Especialidade</label>
              <select style={styles.select} value={selectedEspecialidade} onChange={(e) => setSelectedEspecialidade(e.target.value)}>
                <option value=""></option>
                {especialidades.map((e) => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.label}>Modalidade</label>
              <select style={styles.select} value={selectedModalidade} onChange={(e) => setSelectedModalidade(e.target.value)}>
                <option value=""></option>
                {modalidades.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div style={{ ...styles.filterGroup, flex: 2 }}>
              <label style={styles.label}>Filtrar por nome</label>
              <input
                style={styles.select}
                type="text"
                placeholder="Buscar médico..."
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
              />
            </div>
          </div>

          <div style={styles.btnRow}>
            <button style={styles.btnFilter} onClick={handleFilter}>Filtrar</button>
            <button style={styles.btnClear} onClick={handleClear}>Limpar</button>
          </div>
        </div>

        <div style={styles.results}>
          <p style={styles.resultCount}>{filtered.length} médico(s) encontrado(s)</p>

          {filtered.map((d) => (
            <div key={d.crm} style={styles.card}>
              <div style={styles.cardLeft}>
                <div style={styles.avatar}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" fill="#2e86c1"/>
                  </svg>
                </div>
                <div>
                  <p style={styles.doctorName}>{d.name.toUpperCase()}</p>
                  <div style={styles.infoRow}>
                    <span style={styles.crm}>{d.crm} – {d.city}/{d.state}</span>
                    {d.modalidade.map((m) => (
                      <span key={m} style={{ ...styles.badge, background: m === 'Presencial' ? '#2e86c1' : '#1abc9c' }}>
                        {m}
                      </span>
                    ))}
                  </div>
                  <div style={styles.iconRow}>
                    {d.whatsapp && (
                      <a href={`https://wa.me/${d.whatsapp}`} target="_blank" rel="noreferrer" style={styles.iconLink} title="WhatsApp">
                        <WhatsAppIcon />
                      </a>
                    )}
                    {d.phone && (
                      <a href={`tel:${d.phone}`} style={styles.iconLink} title="Ligar">
                        <PhoneIcon />
                      </a>
                    )}
                    {d.mapsUrl && (
                      <a href={d.mapsUrl} target="_blank" rel="noreferrer" style={styles.iconLink} title="Ver no mapa">
                        <MapIcon />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              {d.siteUrl && (
                <a href={d.siteUrl} target="_blank" rel="noreferrer" style={styles.btnSite}>
                  Acessar site
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer style={styles.footer}>
        <div style={styles.footerContent}>
            {<img src={ElevenLogo} alt="Eleven" style={{ height: '50px', width: 'auto' }} />}
            <div style={styles.footerLogo}>
                <span style={{ color: '#fff' }}>E</span>
                <span style={{ color: '#2096df' }}>l</span>
                <span style={{ color: '#fff' }}>even</span>
            </div>
        </div>
        <p style={styles.footerText}>
          Portal de apoio ao paciente com câncer de próstata • Informações educativas, não substituem consulta médica.
        </p>
      </footer>
    </>
  )
}

function WhatsAppIcon() {
  return <img src={whatsapp} alt="WhatsApp" style={styles.iconImage} />
}

function PhoneIcon() {
    return <img src={phone} alt="Telefone" style={styles.iconImage} />
}

function MapIcon() {
  return <img src={placeholder} alt="Mapa placeholder" style={styles.iconImage} />
}

const styles: Record<string, CSSProperties> = {
  section: {
    background: '#eaf4fb',
    minHeight: '100vh',
    padding: '60px 40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
  },
  filterBox: {
    background: '#fff',
    borderRadius: '16px',
    padding: '28px 32px',
    width: '100%',
    maxWidth: '960px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  filterLabel: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#1a5276',
    letterSpacing: '0.05em',
    margin: 0,
  },
  filterRow: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '12px',
    flexWrap: 'wrap',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: 1,
    minWidth: '120px',
  },
  label: {
    fontSize: '13px',
    color: '#444',
    fontWeight: '500',
  },
  select: {
    border: '2px solid #5aace0',
    borderRadius: '8px',
    padding: '8px 12px',
    fontSize: '14px',
    color: '#333',
    outline: 'none',
    background: '#fff',
    cursor: 'pointer',
    width: '100%',
  },
  btnRow: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
  },
  btnFilter: {
    background: '#2e86c1',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 40px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  btnClear: {
    background: '#fff',
    color: '#2e86c1',
    border: '2px solid #2e86c1',
    borderRadius: '8px',
    padding: '8px 32px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  results: {
    width: '100%',
    maxWidth: '960px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  resultCount: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '4px',
  },
  card: {
    background: '#fff',
    borderRadius: '14px',
    padding: '20px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  cardLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  avatar: {
    background: '#d0eaf7',
    borderRadius: '12px',
    width: '52px',
    height: '52px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  doctorName: {
    fontWeight: '700',
    fontSize: '14px',
    color: '#1a5276',
    marginBottom: '6px',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
    flexWrap: 'wrap',
  },
  crm: {
    fontSize: '13px',
    color: '#666',
  },
  badge: {
    color: '#fff',
    fontSize: '11px',
    fontWeight: '600',
    padding: '2px 10px',
    borderRadius: '20px',
  },
  iconRow: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  iconLink: {
    display: 'flex',
    alignItems: 'center',
  },
  iconImage: {
    width: '18px',
    height: '22px',
    objectFit: 'contain',
  },
  btnSite: {
    background: '#2e86c1',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  },
  footer: {
    background: '#216999',
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    justifyContent: 'center',
  },
  footerContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    justifyContent: 'center',
  },
  footerLogo: {
    color: '#fff',
    fontSize: '22px',
    fontWeight: '700',
    letterSpacing: '2px',
  },
  footerText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: '13px',
    textAlign: 'center',
    maxWidth: '500px',
  },
}