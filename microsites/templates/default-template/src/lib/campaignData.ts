export function str(v: unknown, fallback = ''): string {
  return typeof v === 'string' ? v.trim() : fallback
}

export type CampaignViewModel = {
  title: string
  address: string
  logo: string
  regNo: string
  email: string
  mobile: string
  startingPrice: string
  priceRange: string
  bhk: string
  possession: string
  floors: string
  bannerImages: string[]
  galleryImages: { src: string; alt: string }[]
  facts: { key: string; value: string }[]
  amenities: { name: string; icons: string[] }[]
  highlights: { title: string; description: string }[]
  benefitStats: { label: string; value: string }[]
  floorRows: { tab: string; configuration: string; carpetArea: string; floorRange: string; price: string }[]
  floorPlanImages: string[]
  videos: { url: string; label: string }[]
  showBanner: boolean
  showGallery: boolean
  showFacts: boolean
  showAmenities: boolean
  showHighlights: boolean
  showStats: boolean
  showFloorPlans: boolean
  showVideos: boolean
  showSummaryChips: boolean
}

function bannerUrls(selected?: unknown): string[] {
  const s = selected as Record<string, unknown> | undefined
  const out: string[] = []
  const cover = str(s?.coverImage)
  if (cover) out.push(cover)

  const rows = Array.isArray(s?.projectImages) ? s.projectImages : []
  const bannerGroup = rows.find((r: { tag?: string }) => String(r?.tag ?? '') === '__banners')
  const groupImgs = Array.isArray((bannerGroup as { images?: { src?: string }[] })?.images)
    ? (bannerGroup as { images: { src?: string }[] }).images
    : []
  for (const img of groupImgs) {
    const src = str(img?.src)
    if (src && !out.includes(src)) out.push(src)
  }

  const banners = Array.isArray(s?.banners) ? s.banners : []
  for (const b of banners) {
    const src = str((b as { imageId?: string })?.imageId)
    if (src && !out.includes(src)) out.push(src)
  }

  const hero = s?.hero as { data?: { backgroundImages?: { src?: string }[] } } | undefined
  const heroImgs = Array.isArray(hero?.data?.backgroundImages) ? hero.data.backgroundImages : []
  for (const img of heroImgs) {
    const src = str(img?.src)
    if (src && !out.includes(src)) out.push(src)
  }

  return out
}

export function galleryImages(selected?: unknown): { src: string; alt: string }[] {
  const s = selected as Record<string, unknown> | undefined
  const rows = Array.isArray(s?.projectImages) ? s.projectImages : []
  const out: { src: string; alt: string }[] = []

  for (const row of rows) {
    const tag = String((row as { tag?: string })?.tag ?? '')
    if (tag.startsWith('__')) continue
    const images = Array.isArray((row as { images?: { src?: string; alt?: string }[] }).images)
      ? (row as { images: { src?: string; alt?: string }[] }).images
      : []
    for (const img of images) {
      const src = str(img?.src)
      if (src) out.push({ src, alt: str(img?.alt, 'Project image') })
    }
  }
  return out
}

function overviewFacts(selected?: unknown): { key: string; value: string }[] {
  const overview = (selected as { overview?: { facts?: { key?: string; value?: string }[] } })?.overview
  const facts = Array.isArray(overview?.facts) ? overview.facts : []
  return facts
    .map((f) => ({ key: str(f?.key), value: str(f?.value) }))
    .filter((f) => f.key && f.value)
}

function factValue(facts: { key: string; value: string }[], key: string): string {
  const match = facts.find((f) => f.key.toLowerCase() === key.toLowerCase())
  return match?.value ?? ''
}

function floorData(selected?: unknown) {
  const sizeFloor = (selected as { sizeFloor?: Record<string, unknown> })?.sizeFloor
  const tabs = Array.isArray(sizeFloor?.tabs) ? sizeFloor.tabs : []
  const panels = sizeFloor?.panels && typeof sizeFloor.panels === 'object' ? sizeFloor.panels : {}

  const rows: CampaignViewModel['floorRows'] = []
  const images: string[] = []

  for (const tab of tabs) {
    const tabId = str((tab as { id?: string })?.id)
    const tabLabel = str((tab as { label?: string })?.label, tabId)
    const panel = panels[tabId as keyof typeof panels] as
      | { rows?: unknown[][]; floorPlanImages?: string[] }
      | undefined
    const panelRows = Array.isArray(panel?.rows) ? panel.rows : []
    for (const r of panelRows) {
      const row = Array.isArray(r) ? r : []
      const configuration = str(row[0])
      const carpetArea = str(row[1])
      const floorRange = str(row[2])
      const price = str(row[3])
      if (configuration || carpetArea || floorRange || price) {
        rows.push({ tab: tabLabel, configuration, carpetArea, floorRange, price })
      }
    }
    const planImgs = Array.isArray(panel?.floorPlanImages) ? panel.floorPlanImages : []
    for (const src of planImgs) {
      const url = str(src)
      if (url && !images.includes(url)) images.push(url)
    }
  }

  return { rows, images }
}

function videoItems(selected?: unknown): { url: string; label: string }[] {
  const media = Array.isArray((selected as { media?: { url?: string; kind?: string }[] })?.media)
    ? (selected as { media: { url?: string; kind?: string }[] }).media
    : []
  const labels: Record<string, string> = {
    video_intro: 'Project intro',
    video_walkthrough: 'Walkthrough',
    video_extra: 'Project video',
    reel_1: 'Reel 1',
    reel_2: 'Reel 2',
    reel_3: 'Reel 3',
  }
  return media
    .map((m) => ({ url: str(m?.url), label: labels[str(m?.kind)] ?? 'Video' }))
    .filter((m) => m.url)
}

function benefitStats(selected?: unknown): { label: string; value: string }[] {
  const benefits = (selected as { benefits?: { stats?: { label?: string; value?: string }[] } })?.benefits
  const stats = Array.isArray(benefits?.stats) ? benefits.stats : []
  return stats
    .map((s) => ({ label: str(s?.label), value: str(s?.value) }))
    .filter((s) => s.label || s.value)
}

function amenityIcons(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw.map((x) => str(x)).filter(Boolean)
  }
  if (typeof raw !== 'string') return []
  const s = raw.trim()
  if (!s) return []
  try {
    const parsed = JSON.parse(s)
    if (Array.isArray(parsed)) return parsed.map((x) => str(x)).filter(Boolean)
    if (typeof parsed === 'string') return [parsed]
    return [s]
  } catch {
    return [s]
  }
}

function amenityItems(selected?: unknown): { name: string; icons: string[] }[] {
  const rows = Array.isArray((selected as { amenities?: { name?: string; icon?: unknown }[] })?.amenities)
    ? (selected as { amenities: { name?: string; icon?: unknown }[] }).amenities
    : []
  return rows
    .map((a) => ({
      name: str(a?.name),
      icons: amenityIcons(a?.icon),
    }))
    .filter((a) => a.name)
}

export function buildCampaignViewModel(selected?: unknown): CampaignViewModel {
  const facts = overviewFacts(selected)
  const banners = bannerUrls(selected)
  const gallery = galleryImages(selected)
  const amenities = amenityItems(selected)
  const highlights = Array.isArray((selected as { highlights?: { title?: string; description?: string }[] })?.highlights)
    ? (selected as { highlights: { title?: string; description?: string }[] }).highlights
        .map((h) => ({ title: str(h?.title), description: str(h?.description) }))
        .filter((h) => h.title || h.description)
    : []
  const stats = benefitStats(selected)
  const { rows: floorRows, images: floorPlanImages } = floorData(selected)
  const videos = videoItems(selected)

  const startingPrice = factValue(facts, 'Starting Price')
  const bhk = factValue(facts, 'BHK Range')
  const possession = factValue(facts, 'Completion Date (CBT)') || factValue(facts, 'Possession')
  const floors = factValue(facts, 'Total Floors')
  const priceRange = factValue(facts, 'Price Range')
  const regNo = str((selected as { regNo?: string })?.regNo) || factValue(facts, 'RERA Registration Number')

  const showSummaryChips = Boolean(bhk || startingPrice || priceRange || possession || floors || regNo)

  return {
    title: str((selected as { title?: string })?.title) || 'Project',
    address: str((selected as { address?: string })?.address),
    logo: str((selected as { logo?: string })?.logo),
    regNo,
    email: factValue(facts, 'Email'),
    mobile: factValue(facts, 'Mobile'),
    startingPrice,
    priceRange,
    bhk,
    possession,
    floors,
    bannerImages: banners,
    galleryImages: gallery,
    facts,
    amenities,
    highlights,
    benefitStats: stats,
    floorRows,
    floorPlanImages,
    videos,
    showBanner: banners.length > 0,
    showGallery: gallery.length > 0,
    showFacts: facts.length > 0,
    showAmenities: amenities.length > 0,
    showHighlights: highlights.length > 0,
    showStats: stats.length > 0,
    showFloorPlans: floorRows.length > 0 || floorPlanImages.length > 0,
    showVideos: videos.length > 0,
    showSummaryChips,
  }
}
