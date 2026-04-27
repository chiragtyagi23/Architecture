import { useMemo } from 'react'

type DocumentItem = { url: string; type: string }
type MediaItem = { url: string; kind: string }

function getDocuments(selected: any): DocumentItem[] {
  const docs = selected && typeof selected === 'object' ? (selected as any).documents : null
  if (!Array.isArray(docs)) return []
  return docs
    .map((d: any) => ({ url: String(d?.url ?? ''), type: String(d?.type ?? '') }))
    .filter((d: DocumentItem) => d.url.trim().length > 0 && d.type.trim().length > 0)
}

function getMedia(selected: any): MediaItem[] {
  const media = selected && typeof selected === 'object' ? (selected as any).media : null
  if (!Array.isArray(media)) return []
  return media
    .map((m: any) => ({ url: String(m?.url ?? ''), kind: String(m?.kind ?? '') }))
    .filter((m: MediaItem) => m.url.trim().length > 0 && m.kind.trim().length > 0)
}

function byType(docs: DocumentItem[], type: string): string {
  return docs.find((d) => d.type === type)?.url ?? ''
}

function byKind(items: MediaItem[], kind: string): string {
  return items.find((m) => m.kind === kind)?.url ?? ''
}

function ReelTile({ label, url }: { label: string; url: string }) {
  const trimmed = url.trim()
  if (!trimmed) return null
  const isDirectVideo = /\.(mp4|webm|ogg|ogv|m4v)(\?|#|$)/i.test(trimmed) || /\/uploads\//i.test(trimmed)

  return (
    <div className="reveal" style={{ borderRadius: 18, overflow: 'hidden', background: '#fff' }}>
      <div style={{ padding: '10px 12px', borderBottom: '1px solid rgba(0,0,0,0.06)', fontWeight: 700 }}>{label}</div>
      <div style={{ aspectRatio: '9/16', background: '#000' as any }}>
        {isDirectVideo ? (
          <video controls preload="metadata" src={trimmed} style={{ width: '100%', height: '100%' }} />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              padding: 12,
              textAlign: 'center',
            }}
          >
            <a href={trimmed} target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'underline' }}>
              Open reel
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export function Reels({ selected }: { selected: any }) {
  const docs = useMemo(() => getDocuments(selected), [selected])
  const media = useMemo(() => getMedia(selected), [selected])
  const items = useMemo(() => {
    const r1 = byKind(media, 'reel_1') || byType(docs, 'reel_1')
    const r2 = byKind(media, 'reel_2') || byType(docs, 'reel_2')
    const r3 = byKind(media, 'reel_3') || byType(docs, 'reel_3')
    return [
      { label: 'Reel 1', url: r1 },
      { label: 'Reel 2', url: r2 },
      { label: 'Reel 3', url: r3 },
    ].filter((i) => i.url.trim().length > 0)
  }, [docs, media])

  if (!items.length) return null

  return (
    <section id="reels">
      <div className="section-container">
        <div className="reveal">
          <div className="section-tag">🎬 Reels</div>
          <h2 className="section-title">
            Short <span style={{ color: 'var(--red)' }}>Reels</span>
          </h2>
        </div>
        <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))' }}>
          {items.map((it) => (
            <ReelTile key={it.label} label={it.label} url={it.url} />
          ))}
        </div>
      </div>
    </section>
  )
}

