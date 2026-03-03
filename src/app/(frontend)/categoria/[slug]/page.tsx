export const dynamic = 'force-dynamic'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function CategoriaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'posts',
    where: { category: { equals: slug } },
    limit: 20,
    sort: '-publishedAt',
  })

  if (!docs.length) return notFound()

  return (
    <main>
      <div className="container">
        <div style={{ padding: '2rem 0' }}>
          <p className="section-title">{slug}</p>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: '2rem', marginBottom: '2rem', textTransform: 'capitalize' }}>
            {slug}
          </h1>

          {docs.map((post) => (
            <div key={post.id} className="post-list-item">
              <div className="post-list-img-placeholder" />
              <div>
                <h3><Link href={`/noticia/${post.slug}`}>{post.title}</Link></h3>
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
      </div>
    </main>
  )
}