import './globals.css'

export const metadata = {
  title: 'Diario Tucumán',
  description: 'Las últimas noticias de Tucumán y el NOA',
}

function Header() {
  const fecha = new Date().toLocaleDateString('es-AR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })
  return (
    <header className="header">
      <div className="header-top">
        <a href="/" className="header-logo">Diario <span>Tucumán</span></a>
        <span className="header-fecha">{fecha}</span>
      </div>
      <nav className="header-nav">
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/categoria/politica">Política</a></li>
          <li><a href="/categoria/policial">Policial</a></li>
          <li><a href="/categoria/economia">Economía</a></li>
          <li><a href="/categoria/deportes">Deportes</a></li>
          <li><a href="/categoria/sociedad">Sociedad</a></li>
          <li><a href="/categoria/cultura">Cultura</a></li>
        </ul>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-logo">Diario <span>Tucumán</span></div>
          <p>El medio digital de referencia del noroeste argentino.</p>
        </div>
        <div>
          <h5>Secciones</h5>
          <ul>
            <li><a href="/categoria/politica">Política</a></li>
            <li><a href="/categoria/policial">Policial</a></li>
            <li><a href="/categoria/economia">Economía</a></li>
            <li><a href="/categoria/deportes">Deportes</a></li>
          </ul>
        </div>
        <div>
          <h5>El diario</h5>
          <ul>
            <li><a href="#">Quiénes somos</a></li>
            <li><a href="#">Contacto</a></li>
            <li><a href="/admin">Admin</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Diario Tucumán</span>
        <span>San Miguel de Tucumán, Argentina</span>
      </div>
    </footer>
  )
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}