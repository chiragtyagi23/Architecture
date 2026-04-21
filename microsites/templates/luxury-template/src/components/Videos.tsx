import { useMemo } from 'react'

import { useSiteSection } from '../lib/siteApi'
import { Reveal } from './Reveal'

type DocumentItem = { url: string; type: string }
type MediaItem = { url: string; kind: string }

type VideosPayload = {
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

function isProbablyYouTube(url: string): boolean {
  return /youtube\.com|youtu\.be/i.test(url)
}

function toYouTubeEmbed(url: string): string {
  // Accepts youtu.be/<id> or youtube.com/watch?v=<id> or already embed.
  const u = url.trim()
  if (!u) return ''
  if (/\/embed\//i.test(u)) return u
  const m1 = u.match(/youtu\.be\/([A-Za-z0-9_-]{6,})/i)
  if (m1?.[1]) return `https://www.youtube.com/embed/${m1[1]}`
  const m2 = u.match(/[?&]v=([A-Za-z0-9_-]{6,})/i)
  if (m2?.[1]) return `https://www.youtube.com/embed/${m2[1]}`
  return u
}

function VideoTile({ label, url }: { label: string; url: string }) {
  const trimmed = url.trim()
  if (!trimmed) return null

  const isYT = isProbablyYouTube(trimmed)
  const embed = isYT ? toYouTubeEmbed(trimmed) : ''
  const isMp4 = /\.mp4(\?|#|$)/i.test(trimmed)

  return (
    <div className="rounded-2xl border border-gray-900/10 bg-white shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-900/5">
        <div className="text-sm font-semibold text-gray-900">{label}</div>
      </div>
      <div className="aspect-video bg-black">
        {embed ? (
          <iframe
            title={label}
            src={embed}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : isMp4 ? (
          <video className="h-full w-full" controls preload="metadata" src={trimmed} />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-black text-white text-sm px-4 text-center">
            <a className="underline" href={trimmed} target="_blank" rel="noreferrer">
              Open video
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export function Videos({ selected }: { selected: any }) {
  const docs = useMemo(() => getDocuments(selected), [selected])
  const media = useMemo(() => getMedia(selected), [selected])

  const fromCampaign = useMemo(() => {
    const intro = byKind(media, 'video_intro') || byType(docs, 'video_intro')
    const walkthrough = byKind(media, 'video_walkthrough') || byType(docs, 'video_walkthrough')
    const extra = byKind(media, 'video_extra') || byType(docs, 'video_extra')
    const items = [
      { label: 'Intro', url: intro },
      { label: 'Walkthrough', url: walkthrough },
      { label: 'Extra', url: extra },
    ].filter((i) => i.url.trim().length > 0)
    return items
  }, [docs, media])

  const { data, error } = useSiteSection<VideosPayload>('VITE_VIDEOS_API_URL', '/demo-api/videos.json')

  const items = fromCampaign.length
    ? fromCampaign
    : Array.isArray(data?.items)
      ? data!.items.filter((i) => (i?.url ?? '').trim().length > 0)
      : []

  if (error) {
    return (
      <section className="bg-beige px-6 py-16 min-[961px]:px-12 min-[961px]:py-20" id="videos">
        <div className="bg-red-50 px-6 py-3 text-center text-xs text-red-800">Videos: {error}</div>
      </section>
    )
  }

  if (!items.length) return null

  const sectionLabel = data?.sectionLabel ?? 'VIDEOS'
  const title = data?.title ?? { before: 'Watch the ', italic: 'Project', after: '' }

  return (
    <section className="bg-beige px-6 py-16 min-[961px]:px-12 min-[961px]:py-20" id="videos">
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

      <div className="grid grid-cols-1 gap-5 min-[961px]:grid-cols-3">
        {items.map((it) => (
          <VideoTile key={it.label} label={it.label} url={it.url} />
        ))}
      </div>
    </section>
  )
}

