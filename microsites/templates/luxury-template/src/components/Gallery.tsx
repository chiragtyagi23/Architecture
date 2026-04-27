import { cn } from '../lib/cn'
import { ImageSlider, type ImageSlide } from './ImageSlider'
import { KeyframeCardReveal, keyframeRevealEffectAt } from './KeyframeCardReveal'
import { Reveal } from './Reveal'
import { useSelectedCampaign } from '../lib/selectedCampaign'

type TitleParts = { before: string; italic: string; after: string }

type GalleryCell = {
  imageSrc?: string
  imageAlt?: string
  images?: ImageSlide[]
  background?: string
  art?: string
  artSize?: string
  artOpacity?: number
  tag: string
  feature?: boolean
  wideBottom?: boolean
  imageFit?: 'cover' | 'contain'
}

type GalleryPayload = {
  sectionLabel: string
  title: TitleParts
  cells: GalleryCell[]
}

function slidesForCell(cell: GalleryCell): ImageSlide[] {
  if (cell.images?.length) return cell.images
  if (cell.imageSrc) return [{ src: cell.imageSrc, alt: cell.imageAlt }]
  return []
}

export function Gallery() {
  const selected = useSelectedCampaign()
  const externalRaw = Array.isArray(selected?.extenalimage) ? selected.extenalimage : null
  const internalRaw = Array.isArray(selected?.Internalimages) ? selected.Internalimages : null
  const fallbackRaw = Array.isArray(selected?.projectImages)
    ? selected.projectImages.filter((c: any) => !String(c?.tag ?? '').startsWith('__'))
    : null

  const mapCells = (rows: any[]) =>
    rows
      .map((c: any) => ({
        tag: String(c?.tag ?? ''),
        feature: Boolean(c?.feature),
        wideBottom: Boolean(c?.wideBottom),
        images: Array.isArray(c?.images)
          ? c.images.map((img: any) => ({ src: String(img?.src ?? ''), alt: String(img?.alt ?? '') })).filter((s: any) => s.src)
          : [],
      }))
      .filter((c: any) => (c.images?.length ?? 0) > 0)

  const externalCells = externalRaw && externalRaw.length ? mapCells(externalRaw) : []
  const internalCells = internalRaw && internalRaw.length ? mapCells(internalRaw) : []
  const fallbackCells = fallbackRaw ? mapCells(fallbackRaw) : []

  const data: { sectionLabel: string; title: TitleParts } | null =
    externalCells.length || internalCells.length || fallbackCells.length
    ? {
        sectionLabel: 'Gallery',
        title: { before: 'Explore the ', italic: 'Gallery', after: '' },
      }
    : null
  const error: string | null = null

  if (error) {
    return (
      <section className="bg-beige px-6 py-16 min-[961px]:px-12 min-[961px]:py-20" id="gallery">
        <div className="bg-red-50 px-6 py-3 text-center text-xs text-red-800">Gallery: {error}</div>
      </section>
    )
  }

  if (!data) return null
  const hasSplit = externalCells.length > 0 || internalCells.length > 0
  const cellsToRender = hasSplit ? [] : fallbackCells
  if (!hasSplit && !cellsToRender.length) return null

  return (
    <section className="bg-beige px-6 py-16 min-[961px]:px-12 min-[961px]:py-20" id="gallery">
      <Reveal effect="up" delay={0}>
        <div className="mb-3.5 flex items-center gap-3 text-[0.68rem] tracking-[0.2em] text-brown uppercase before:h-px before:w-5 before:bg-brown before:content-['']">
          {data.sectionLabel}
        </div>
      </Reveal>
      <Reveal effect="left" delay={70}>
        <h2 className="font-display mb-4 text-[clamp(1.8rem,3vw,2.8rem)] leading-tight font-normal text-dark">
          {data.title.before}
          <em className="text-brown italic">{data.title.italic}</em>
          {data.title.after}
        </h2>
      </Reveal>

      {hasSplit ? (
        <div className="mt-10 flex flex-col gap-10">
          {externalCells.length ? (
            <div>
              <div className="mb-4 text-[0.68rem] tracking-[0.2em] text-brown uppercase">External images</div>
              <GalleryGrid cells={externalCells} />
            </div>
          ) : null}
          {internalCells.length ? (
            <div>
              <div className="mb-4 text-[0.68rem] tracking-[0.2em] text-brown uppercase">Internal images</div>
              <GalleryGrid cells={internalCells} />
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-12">
          <GalleryGrid cells={cellsToRender} />
        </div>
      )}
    </section>
  )
}

function GalleryGrid({ cells }: { cells: GalleryCell[] }) {
  const n = cells.length
  const isFour = n === 4
  const isOne = n === 1
  const isTwo = n === 2
  const isThree = n === 3
  return (
    <div
      className={cn(
        'grid',
        // For 1–3 groups, use clean responsive grids (no empty space).
        isOne
          ? 'grid-cols-1 gap-3'
          : isTwo
            ? 'grid-cols-1 gap-3 min-[961px]:grid-cols-2'
            : isThree
              ? 'grid-cols-1 gap-3 min-[961px]:grid-cols-3'
              : isFour
                ? 'max-[960px]:grid-cols-1 max-[960px]:gap-3 min-[961px]:grid-cols-[1.05fr_1fr] min-[961px]:grid-rows-[minmax(220px,28vh)_minmax(220px,28vh)_minmax(320px,40vh)] min-[961px]:gap-2.5'
                : 'max-[960px]:grid-cols-2 max-[960px]:gap-px max-[960px]:auto-rows-[minmax(min(52vw,220px),auto)] min-[961px]:grid-cols-[1.6fr_1fr_1fr] min-[961px]:grid-rows-[260px_200px] min-[961px]:gap-px',
      )}
    >
      {cells.map((cell, i) => {
          const slides = slidesForCell(cell)
          const hasImage = slides.length > 0
          const placement = isFour
            ? i === 0
              ? 'min-[961px]:col-start-1 min-[961px]:row-start-1 min-[961px]:row-span-2 min-[961px]:rounded-lg min-[961px]:shadow-[0_10px_40px_rgba(46,46,46,0.08)]'
              : i === 1
                ? 'min-[961px]:col-start-2 min-[961px]:row-start-1 min-[961px]:rounded-lg min-[961px]:shadow-[0_10px_40px_rgba(46,46,46,0.08)]'
                : i === 2
                  ? 'min-[961px]:col-start-2 min-[961px]:row-start-2 min-[961px]:rounded-lg min-[961px]:shadow-[0_10px_40px_rgba(46,46,46,0.08)]'
                  : 'min-[961px]:col-span-2 min-[961px]:row-start-3 min-[961px]:rounded-lg min-[961px]:shadow-[0_10px_40px_rgba(46,46,46,0.08)]'
            : cn(cell.feature && 'min-[961px]:row-span-2')

          return (
            <KeyframeCardReveal
              key={`${cell.tag}-${i}`}
              effect={keyframeRevealEffectAt(i)}
              delay={100 + i * 75}
              className={cn(
                'relative flex min-h-0 min-w-0 items-center justify-center overflow-hidden bg-beige [&_.slider-dots]:bottom-11',
                placement,
                // Ensure nice heights when we don't use the mosaic layout.
                isOne && 'min-h-[min(86vh,720px)]',
                (isTwo || isThree) && 'min-h-[min(60vh,520px)]',
                /* Mobile: every tile needs min-height — ImageSlider is absolute and does not stretch the row. */
                isFour &&
                  (i === 0 ? 'max-[960px]:min-h-[min(68vw,300px)]' : 'max-[960px]:min-h-[min(52vw,240px)]'),
                !isFour && !isOne && !isTwo && !isThree && 'max-[960px]:min-h-[min(52vw,220px)]',
                cell.imageFit === 'contain' && 'bg-beige',
              )}
              style={
                hasImage
                  ? undefined
                  : { background: cell.background ?? 'var(--color-beige)' }
              }
            >
              {hasImage ? (
                <ImageSlider
                  slides={slides}
                  fit={cell.imageFit === 'contain' ? 'contain' : 'cover'}
                  showArrows={slides.length > 1}
                  showDots={slides.length > 1}
                  ariaLabel={cell.tag}
                  className={cn(cell.imageFit === 'contain' && 'bg-beige')}
                />
              ) : (
                <div
                  className="pointer-events-none font-display text-[rgba(139,115,85,0.13)] select-none"
                  style={{
                    fontSize: cell.artSize ?? '6rem',
                    opacity: cell.artOpacity ?? 0.15,
                  }}
                >
                  {cell.art}
                </div>
              )}
              <div className="pointer-events-none absolute bottom-3 left-3 z-3 max-w-[calc(100%-1.5rem)] rounded-sm bg-dark/88 px-3 py-1.5 text-[0.62rem] leading-snug tracking-widest text-sand uppercase">
                {cell.tag}
              </div>
            </KeyframeCardReveal>
          )
        })}
    </div>
  )
}
