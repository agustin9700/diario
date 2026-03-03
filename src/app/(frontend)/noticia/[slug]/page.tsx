export const dynamic = 'force-dynamic'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { RichText } from '@payloadcms/richtext-lexical/react'

export default async function NoticiaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const post = docs[0]
  if (!post) return notFound()

  const { docs: relacionadas } = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { slug: { not_equals: slug } },
        ...(post.category ? [{ category: { equals: post.category } }] : []),
      ],
    },
    limit: 4,
  })

  return (
    <main>
      <div className="container">
        <div className="article-layout">
          <article>
            <div className="article-header">
              {post.category && (
                <Link href={`/categoria/${post.category.toLowerCase()}`} className="post-category">
                  {post.category}
                </Link>
              )}
              <h1 className="article-title">{post.title}</h1>
              {post.excerpt && <p className="article-excerpt">{post.excerpt}</p>}
              <div className="post-meta">
                {post.author && <span>{post.author} · </span>}
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString('es-AR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : 'Hoy'}
              </div>
            </div>

            <div className="article-cover-placeholder" />

            <div className="article-body">
              {post.content
                ? <RichText data={post.content} />
                : <p style={{ color: '#999', fontStyle: 'italic' }}>Esta noticia no tiene contenido todavía.</p>
              }
            </div>
          </article>

          <aside className="sidebar">
            <p className="section-title">Relacionadas</p>
            {relacionadas.length > 0 ? (
              relacionadas.map((rel) => (
                <div key={rel.id} className="post-side-item">
                  <span className="post-category">{rel.category || 'General'}</span>
                  <h4>
                    <Link href={`/noticia/${rel.slug}`}>{rel.title}</Link>
                  </h4>
                  <div className="post-meta">
                    {rel.publishedAt
                      ? new Date(rel.publishedAt).toLocaleDateString('es-AR')
                      : 'Hoy'}
                  </div>
                </div>
              ))
            ) : (
              <p style={{ fontSize: '0.85rem', color: '#999' }}>No hay noticias relacionadas aún.</p>
            )}
          </aside>
        </div>
      </div>
    </main>
  )
}