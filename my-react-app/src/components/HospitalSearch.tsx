import { useState, CSSProperties } from 'react'

interface Hospital {
  name: string
  address: string
  city: string
  state: string
  type: string
  whatsapp?: string
  phone?: string
  mapsUrl?: string
  siteUrl?: string
}

const hospitalsData: Hospital[] = [
  {
    name: 'Hospital Municipal 123',
    address: 'Rua Exemplo1, 123',
    city: 'São Paulo',
    state: 'SP',
    type: 'Público',
    whatsapp: '5511999999999',
    phone: '1133333333',
    mapsUrl: 'https://maps.google.com',
    siteUrl: 'https://example.com',
  },
  {
    name: 'Hospital das Clínicas',
    address: 'Rua Exemplo2, 123',
    city: 'São Paulo',
    state: 'SP',
    type: 'Público',
    whatsapp: '5511988888888',
    phone: '1122222222',
    mapsUrl: 'https://maps.google.com',
    siteUrl: 'https://hc.fm.usp.br',
  },
  {
    name: 'Instituto do Câncer do Estado de São Paulo',
    address: 'Av. Dr. Arnaldo, 251',
    city: 'São Paulo',
    state: 'SP',
    type: 'Público',
    phone: '1138934000',
    mapsUrl: 'https://maps.google.com',
    siteUrl: 'https://icesp.org.br',
  },
  {
    name: 'Hospital Sírio-Libanês',
    address: 'R. Dona Adma Jafet, 91',
    city: 'São Paulo',
    state: 'SP',
    type: 'Privado',
    phone: '1133944000',
    mapsUrl: 'https://maps.google.com',
    siteUrl: 'https://hospitalsiriolibanes.org.br',
  },
  {
    name: 'Hospital Universitário Walter Cantídio',
    address: 'Rua Capitão Francisco Pedro, 1290',
    city: 'Fortaleza',
    state: 'CE',
    type: 'Público',
    phone: '8533668000',
    mapsUrl: 'https://maps.google.com',
    siteUrl: 'https://huwc.ufc.br',
  },
  {
    name: 'Hospital de Câncer de Barretos',
    address: 'Rua Antenor Duarte Villela, 1331',
    city: 'Barretos',
    state: 'SP',
    type: 'Público',
    phone: '1733216600',
    mapsUrl: 'https://maps.google.com',
    siteUrl: 'https://hcancerbarretos.com.br',
  },
  {
    name: 'Hospital Moinhos de Vento',
    address: 'Rua Ramiro Barcelos, 910',
    city: 'Porto Alegre',
    state: 'RS',
    type: 'Privado',
    phone: '5133143434',
    mapsUrl: 'https://maps.google.com',
    siteUrl: 'https://hmv.org.br',
  },
  {
    name: 'Hospital Erasto Gaertner',
    address: 'R. Dr. Ovande do Amaral, 201',
    city: 'Curitiba',
    state: 'PR',
    type: 'Público',
    phone: '4132513535',
    mapsUrl: 'https://maps.google.com',
    siteUrl: 'https://erastogaertner.com.br',
  },
]

const states = ['', 'SP', 'RJ', 'MG', 'RS', 'PR', 'CE', 'BA', 'PE', 'GO', 'DF']
const citiesByState: Record<string, string[]> = {
  SP: ['São Paulo', 'Barretos', 'Campinas'],
  RJ: ['Rio de Janeiro', 'Niterói'],
  MG: ['Belo Horizonte'],
  RS: ['Porto Alegre'],
  PR: ['Curitiba'],
  CE: ['Fortaleza'],
  BA: ['Salvador'],
  PE: ['Recife'],
  GO: ['Goiânia'],
  DF: ['Brasília'],
}
const types = ['', 'Público', 'Privado']

export default function HospitalSearch() {
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [filtered, setFiltered] = useState<Hospital[]>(hospitalsData)

  function handleFilter() {
    setFiltered(
      hospitalsData.filter((h) => {
        const matchState = !selectedState || h.state === selectedState
        const matchCity = !selectedCity || h.city === selectedCity
        const matchType = !selectedType || h.type === selectedType
        const matchName = !nameFilter || h.name.toLowerCase().includes(nameFilter.toLowerCase())
        return matchState && matchCity && matchType && matchName
      })
    )
  }

  function handleClear() {
    setSelectedState('')
    setSelectedCity('')
    setSelectedType('')
    setNameFilter('')
    setFiltered(hospitalsData)
  }

  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <h1 style={styles.title}>CENTROS DE REFERÊNCIA NO BRASIL</h1>
        <p style={styles.subtitle}>
          Filtre hospitais e clínicas por região para encontrar atendimento perto de você
        </p>
      </div>

      {/* Filter Box */}
      <div style={styles.filterBox}>
        <p style={styles.filterLabel}>FILTRAR HOSPITAIS</p>
        <div style={styles.filterRow}>
          {/* Estado */}
          <div style={styles.filterGroup}>
            <label style={styles.label}>Estado</label>
            <select
              style={styles.select}
              value={selectedState}
              onChange={(e) => { setSelectedState(e.target.value); setSelectedCity('') }}
            >
              <option value=""></option>
              {states.filter(Boolean).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Cidade */}
          <div style={styles.filterGroup}>
            <label style={styles.label}>Cidade</label>
            <select
              style={styles.select}
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              disabled={!selectedState}
            >
              <option value=""></option>
              {(citiesByState[selectedState] || []).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Tipo */}
          <div style={styles.filterGroup}>
            <label style={styles.label}>Tipo</label>
            <select
              style={styles.select}
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {types.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Nome */}
          <div style={{ ...styles.filterGroup, flex: 2 }}>
            <label style={styles.label}>Filtrar por nome</label>
            <input
              style={styles.select}
              type="text"
              placeholder="Ex: Moinhos de v..."
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
            />
          </div>

          <button style={styles.btnFilter} onClick={handleFilter}>Filtrar</button>
          <button style={styles.btnClear} onClick={handleClear}>Limpar</button>
        </div>
      </div>

      {/* Results */}
      <div style={styles.results}>
        <p style={styles.resultCount}>{filtered.length} hospital(s) encontrado(s)</p>

        {filtered.map((h) => (
          <div key={h.name} style={styles.card}>
            <div style={styles.cardLeft}>
              <div style={styles.icon}>➕</div>
              <div>
                <p style={styles.hospitalName}>{h.name.toUpperCase()}</p>
                <p style={styles.hospitalAddress}>{h.address} – {h.city}/{h.state}</p>
                <div style={styles.iconRow}>
                  {h.whatsapp && (
                    <a href={`https://wa.me/${h.whatsapp}`} target="_blank" rel="noreferrer" style={styles.iconLink} title="WhatsApp">
                      <WhatsAppIcon />
                    </a>
                  )}
                  {h.phone && (
                    <a href={`tel:${h.phone}`} style={styles.iconLink} title="Ligar">
                      <PhoneIcon />
                    </a>
                  )}
                  {h.mapsUrl && (
                    <a href={h.mapsUrl} target="_blank" rel="noreferrer" style={styles.iconLink} title="Ver no mapa">
                      <MapIcon />
                    </a>
                  )}
                </div>
              </div>
            </div>
            {h.siteUrl && (
              <a href={h.siteUrl} target="_blank" rel="noreferrer" style={styles.btnSite}>
                Acessar site
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#25D366"/>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.413A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.946 7.946 0 01-4.031-1.094l-.29-.172-2.953.839.838-2.877-.189-.302A7.944 7.944 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" fill="#25D366"/>
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.02l-2.21 2.2z" fill="#333"/>
    </svg>
  )
}

function MapIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#333"/>
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
    gap: '32px',
  },
  header: {
    textAlign: 'center',
  },
  title: {
    fontFamily: "'Bebas Neue', cursive",
    fontSize: '40px',
    fontWeight: 400,
    color: '#1a5276',
    letterSpacing: '2px',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#555',
  },
  filterBox: {
    background: '#fff',
    borderRadius: '16px',
    padding: '28px 32px',
    width: '100%',
    maxWidth: '900px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
  },
  filterLabel: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#555',
    letterSpacing: '0.05em',
    marginBottom: '16px',
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
    minWidth: '100px',
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
  },
  btnFilter: {
    background: '#2e86c1',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 24px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    alignSelf: 'flex-end',
  },
  btnClear: {
    background: '#fff',
    color: '#2e86c1',
    border: '2px solid #2e86c1',
    borderRadius: '8px',
    padding: '8px 20px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    alignSelf: 'flex-end',
  },
  results: {
    width: '100%',
    maxWidth: '900px',
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
  icon: {
    background: '#d0eaf7',
    borderRadius: '12px',
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    color: '#2e86c1',
    flexShrink: 0,
  },
  hospitalName: {
    fontWeight: '700',
    fontSize: '14px',
    color: '#1a5276',
    marginBottom: '4px',
  },
  hospitalAddress: {
    fontSize: '13px',
    color: '#666',
    marginBottom: '8px',
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
}