import { useSiteSection } from '../lib/siteApi'
import { cn } from '../lib/cn'
import { ImageSlider, type ImageSlide } from './ImageSlider'
import { KeyframeCardReveal, keyframeRevealEffectAt } from './KeyframeCardReveal'
import { Reveal } from './Reveal'

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
  const { data, error } = useSiteSection<GalleryPayload>('VITE_GALLERY_API_URL', '/demo-api/gallery.json')

  if (error) {
    return (
      <section className="bg-beige px-6 py-16 min-[961px]:px-12 min-[961px]:py-20" id="gallery">
        <div className="bg-red-50 px-6 py-3 text-center text-xs text-red-800">Gallery: {error}</div>
      </section>
    )
  }

  if (!data) {
    return (
      <section className="min-h-[400px] bg-beige px-6 py-16 min-[961px]:px-12" id="gallery" aria-busy="true" />
    )
  }

  const isFour = data.cells.length === 4

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

      <div
        className={cn(
          'mt-12 grid',
          isFour
            ? 'max-[960px]:grid-cols-1 max-[960px]:gap-3 min-[961px]:grid-cols-[1.05fr_1fr] min-[961px]:grid-rows-[minmax(200px,28vh)_minmax(200px,28vh)_minmax(300px,40vh)] min-[961px]:gap-2.5'
            : 'max-[960px]:grid-cols-2 max-[960px]:gap-px max-[960px]:[grid-auto-rows:minmax(min(52vw,220px),auto)] min-[961px]:grid-cols-[1.6fr_1fr_1fr] min-[961px]:grid-rows-[260px_200px] min-[961px]:gap-px',
        )}
      >
        {data.cells.map((cell, i) => {
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
                /* Mobile: every tile needs min-height — ImageSlider is absolute and does not stretch the row. */
                isFour &&
                  (i === 0
                    ? 'max-[960px]:min-h-[min(68vw,300px)]'
                    : 'max-[960px]:min-h-[min(52vw,240px)]'),
                !isFour && 'max-[960px]:min-h-[min(52vw,220px)]',
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
              <div className="pointer-events-none absolute bottom-3 left-3 z-[3] max-w-[calc(100%-1.5rem)] rounded-sm bg-dark/88 px-3 py-1.5 text-[0.62rem] leading-snug tracking-[0.1em] text-sand uppercase">
                {cell.tag}
              </div>
            </KeyframeCardReveal>
          )
        })}
      </div>
    </section>
  )
}
