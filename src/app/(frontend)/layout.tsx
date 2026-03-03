import './globals.css'
import Link from 'next/link'

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
        <Link href="/" className="header-logo">Diario <span>Tucumán</span></Link>
        <span className="header-fecha">{fecha}</span>
      </div>
      <nav className="header-nav">
        <ul>
          <li><Link href="/">Inicio</Link></li>
          <li><Link href="/categoria/politica">Política</Link></li>
          <li><Link href="/categoria/policial">Policial</Link></li>
          <li><Link href="/categoria/economia">Economía</Link></li>
          <li><Link href="/categoria/deportes">Deportes</Link></li>
          <li><Link href="/categoria/sociedad">Sociedad</Link></li>
          <li><Link href="/categoria/cultura">Cultura</Link></li>
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
            <li><Link href="/categoria/politica">Política</Link></li>
            <li><Link href="/categoria/policial">Policial</Link></li>
            <li><Link href="/categoria/economia">Economía</Link></li>
            <li><Link href="/categoria/deportes">Deportes</Link></li>
          </ul>
        </div>
        <div>
          <h5>El diario</h5>
          <ul>
            <li><Link href="#">Quiénes somos</Link></li>
            <li><Link href="#">Contacto</Link></li>
            <li><Link href="/admin">Admin</Link></li>
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