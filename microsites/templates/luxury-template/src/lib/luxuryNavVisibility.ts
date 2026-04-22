/**
 * Pure helpers: keep nav links in sync with sections that return null when there is no real content.
 */

function trimStr(s: unknown): string {
  return typeof s === 'string' ? s.trim() : ''
}

function luxuryOverviewVisible(selected: any): boolean {
  const raw = selected?.overview
  if (!raw) return false
  const titleBefore = trimStr(raw.titleBefore)
  const titleItalic = trimStr(raw.titleItalic)
  const titleAfter = trimStr(raw.titleAfter)
  const hasTitle = Boolean(titleBefore || titleItalic || titleAfter)
  const hasBody = trimStr(raw.body).length > 0
  const facts = Array.isArray(raw.facts)
    ? raw.facts
        .map((f: any) => ({ key: trimStr(f?.key), value: trimStr(f?.value) }))
        .filter((f: any) => f.key && f.value)
    : []
  const hasFacts = facts.some((f: any) => f.key && f.value)
  const certs = Array.isArray(raw.certifications)
    ? raw.certifications
        .map((c: any) => ({ label: trimStr(c?.label), value: trimStr(c?.value) }))
        .filter((c: any) => c.label && c.value)
    : []
  const hasCerts = certs.length > 0
  return hasTitle || hasBody || hasFacts || hasCerts
}

function luxuryGalleryVisible(selected: any): boolean {
  const rawCells = Array.isArray(selected?.projectImages) ? selected.projectImages : null
  if (!rawCells) return false
  const cells = rawCells
    .map((c: any) => ({
      images: Array.isArray(c?.images)
        ? c.images.map((img: any) => ({ src: trimStr(img?.src) })).filter((s: any) => s.src)
        : [],
    }))
    .filter((c: any) => (c.images?.length ?? 0) > 0)
  return cells.length > 0
}

type FloorPlansPayload = {
  title: { before: string; italic: string; after: string }
  blueprintImage: string
  defaultTabId: string
  tabs: { id: string; label: string }[]
  panels: Record<string, any>
}

function hasRealFloorPlansContent(data: FloorPlansPayload): boolean {
  const hasTitle = (data.title.before + data.title.italic + data.title.after).trim().length > 0
  const hasBlueprint = (data.blueprintImage ?? '').trim().length > 0
  const panels = data.panels && typeof data.panels === 'object' ? data.panels : {}
  const panelKeys = Object.keys(panels)
  const hasAnyPanel = panelKeys.length > 0
  const hasAnyImages = panelKeys.some((k) =>
    Array.isArray((panels as any)[k]?.floorPlanImages)
      ? (panels as any)[k].floorPlanImages.some((s: any) => typeof s === 'string' && s.trim().length > 0)
      : false,
  )
  const hasAnyRowContent = panelKeys.some((k) => {
    const rows = Array.isArray((panels as any)[k]?.rows) ? (panels as any)[k].rows : []
    return rows.some((r: any) => Array.isArray(r) && r.some((cell: any) => typeof cell === 'string' && cell.trim().length > 0))
  })
  return hasTitle || hasBlueprint || hasAnyPanel || hasAnyImages || hasAnyRowContent
}

function luxuryResidencesVisible(selected: any): boolean {
  const raw = selected?.sizeFloor
  if (!raw) return false
  const data: FloorPlansPayload = {
    title: {
      before: String(raw.titleBefore ?? ''),
      italic: String(raw.titleItalic ?? ''),
      after: String(raw.titleAfter ?? ''),
    },
    blueprintImage: String(raw.blueprintImage ?? ''),
    defaultTabId: String(raw.defaultTabId ?? ''),
    tabs: Array.isArray(raw.tabs) ? raw.tabs.map((t: any) => ({ id: String(t?.id ?? ''), label: String(t?.label ?? '') })) : [],
    panels: raw.panels ?? {},
  }
  if (!hasRealFloorPlansContent(data)) return false
  let active: string | null = null
  if (data.defaultTabId && data.panels[data.defaultTabId]) active = data.defaultTabId
  else active = data.tabs[0]?.id ?? null
  return Boolean(active && data.panels[active])
}

function luxuryAmenitiesVisible(selected: any): boolean {
  const rawItems = Array.isArray(selected?.amenities) ? selected.amenities : null
  if (!rawItems) return false
  const items = rawItems
    .map((a: any) => ({
      name: String(a?.name ?? ''),
      desc: String(a?.desc ?? ''),
    }))
    .filter((it: any) => it.name.trim().length > 0 || it.desc.trim().length > 0)
  return items.length > 0
}

function luxuryHighlightsVisible(selected: any): boolean {
  const rawItems = Array.isArray(selected?.highlights) ? selected.highlights : null
  if (!rawItems) return false
  const cards = rawItems
    .map((h: any) => ({
      title: String(h?.title ?? ''),
      text: h?.text != null ? String(h.text) : '',
    }))
    .filter((h: any) => h.title.trim().length > 0 || h.text.trim().length > 0)
  return cards.length > 0
}

function luxuryBenefitsVisible(selected: any): boolean {
  const raw = selected?.benefits
  if (!raw) return false
  const titleBefore = String(raw.titleBefore ?? '')
  const titleItalic = String(raw.titleItalic ?? '')
  const titleAfter = String(raw.titleAfter ?? '')
  const hasTitle = (titleBefore + titleItalic + titleAfter).trim().length > 0
  const items = Array.isArray(raw.items)
    ? raw.items.map((it: any) => ({ title: String(it?.title ?? ''), text: String(it?.text ?? '') }))
    : []
  const hasItems = items.some((it: any) => it.title.trim().length > 0 || it.text.trim().length > 0)
  const stats = Array.isArray(raw.stats) ? raw.stats.map((s: any) => ({ value: String(s?.value ?? ''), label: String(s?.label ?? '') })) : []
  const hasStats = stats.some((s: any) => s.value.trim().length > 0 || s.label.trim().length > 0)
  const bg = Array.isArray(raw.backgroundImages)
    ? raw.backgroundImages.map((img: any) => trimStr(img?.src)).filter(Boolean)
    : []
  const hasBg = bg.length > 0
  return hasTitle || hasItems || hasStats || hasBg
}

function luxuryLocationVisible(selected: any): boolean {
  const groups = Array.isArray(selected?.socialInfraGroups) ? selected.socialInfraGroups : []
  return groups.length > 0
}

/** Hash without `#`, e.g. `overview` */
export function luxuryNavSectionVisible(sectionId: string, selected: any): boolean {
  switch (sectionId) {
    case 'overview':
      return luxuryOverviewVisible(selected)
    case 'gallery':
      return luxuryGalleryVisible(selected)
    case 'residences':
      return luxuryResidencesVisible(selected)
    case 'amenities':
      return luxuryAmenitiesVisible(selected)
    case 'highlights':
      return luxuryHighlightsVisible(selected)
    case 'benefits':
      return luxuryBenefitsVisible(selected)
    case 'location':
      return luxuryLocationVisible(selected)
    case 'enquiry':
      return true
    default:
      return true
  }
}

export function luxuryNavLinkHrefVisible(href: string, selected: any): boolean {
  if (!href.startsWith('#')) return true
  return luxuryNavSectionVisible(href.slice(1), selected)
}
