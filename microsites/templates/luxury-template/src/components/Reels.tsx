import { useMemo } from 'react'

import { Reveal } from './Reveal'

type DocumentItem = { url: string; type: string }
type MediaItem = { url: string; kind: string }

type ReelsPayload = {
  sectionLabel?: string
  title?: { before?: string; italic?: string; after?: string }
  items: { label: string; url: string }[]
}

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
    <div className="rounded-2xl border border-gray-900/10 bg-white shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-900/5">
        <div className="text-sm font-semibold text-gray-900">{label}</div>
      </div>
      <div className="aspect-9/16 bg-black">
        {isDirectVideo ? (
          <video className="h-full w-full" controls preload="metadata" src={trimmed} />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-black text-white text-sm px-4 text-center">
            <a className="underline" href={trimmed} target="_blank" rel="noreferrer">
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

  const fromCampaign = useMemo(() => {
    const r1 = byKind(media, 'reel_1') || byType(docs, 'reel_1')
    const r2 = byKind(media, 'reel_2') || byType(docs, 'reel_2')
    const r3 = byKind(media, 'reel_3') || byType(docs, 'reel_3')
    return [
      { label: 'Reel 1', url: r1 },
      { label: 'Reel 2', url: r2 },
      { label: 'Reel 3', url: r3 },
    ].filter((i) => i.url.trim().length > 0)
  }, [docs, media])

  const items = fromCampaign.length
    ? fromCampaign
      : []

  if (!items.length) return null

  const sectionLabel = 'REELS'
  const title = { before: 'Short ', italic: 'Reels', after: '' }

  return (
    <section className="bg-white px-6 py-16 min-[961px]:px-12 min-[961px]:py-20" id="reels">
      <Reveal effect="up" delay={0}>
        <div className="mb-3.5 flex items-center gap-3 text-[0.68rem] tracking-[0.2em] text-brown uppercase before:h-px before:w-5 before:bg-brown before:content-['']">
          {sectionLabel}
        </div>
      </Reveal>
      <Reveal effect="left" delay={70}>
        <h2 className="font-display mb-10 text-[clamp(1.8rem,3vw,2.8rem)] leading-tight font-normal text-dark">
          {title.before ?? ''}
          <em className="text-brown italic">{title.italic ?? ''}</em>
          {title.after ?? ''}
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-5 min-[520px]:grid-cols-2 min-[961px]:grid-cols-3">
        {items.map((it) => (
          <ReelTile key={it.label} label={it.label} url={it.url} />
        ))}
      </div>
    </section>
  )
}

