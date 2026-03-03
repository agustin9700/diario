export const dynamic = 'force-dynamic'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'

export default async function Home() {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'posts',
    limit: 20,
    sort: '-publishedAt',
  })

  const featured = docs[0]
  const rest = docs.slice(1, 5)
  const sidebar = docs.slice(5, 10)

  return (
    <main>
      {/* Breaking bar */}
      <div className="breaking-bar">
        <div className="breaking-bar-inner">
          <span className="breaking-label">Última hora</span>
          <span className="breaking-text">
            {featured?.title || 'Bienvenido a Diario Tucumán'}
          </span>
        </div>
      </div>

      <div className="container">
        <div className="home-grid">
          {/* Columna principal */}
          <div>
            <p className="section-title">Principales</p>

            {/* Nota destacada */}
            {featured && (
              <div className="post-featured">
                <div className="post-featured-img-placeholder" />
                <span className="post-category">{featured.category || 'General'}</span>
                <h2>
                  <Link href={`/noticia/${featured.slug}`}>{featured.title}</Link>
                </h2>
                {featured.excerpt && <p className="excerpt">{featured.excerpt}</p>}
                <span className="post-meta">
                  {featured.author && `${featured.author} · `}
                  {featured.publishedAt
                    ? new Date(featured.publishedAt).toLocaleDateString('es-AR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : 'Hoy'}
                </span>
              </div>
            )}

            {/* Lista de noticias */}
            {rest.map((post) => (
              <div key={post.id} className="post-list-item">
                <div className="post-list-img-placeholder" />
                <div>
                  <span className="post-category">{post.category || 'General'}</span>
                  <h3>
                    <Link href={`/noticia/${post.slug}`}>{post.title}</Link>
                  </h3>
                  {post.excerpt && <p className="excerpt">{post.excerpt}</p>}
                  <span className="post-meta">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString('es-AR')
                      : 'Hoy'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="sidebar">
            <p className="section-title">Más noticias</p>
            {sidebar.length > 0 ? (
              sidebar.map((post) => (
                <div key={post.id} className="post-side-item">
                  <span className="post-category">{post.category || 'General'}</span>
                  <h4>
                    <Link href={`/noticia/${post.slug}`}>{post.title}</Link>
                  </h4>
                  <div className="post-meta">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString('es-AR')
                      : 'Hoy'}
                  </div>
                </div>
              ))
            ) : (
              <p style={{ fontSize: '0.85rem', color: '#999' }}>
                Publicá más noticias para verlas acá.
              </p>
            )}
          </aside>
        </div>
      </div>
    </main>
  )
}
