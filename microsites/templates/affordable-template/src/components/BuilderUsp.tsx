import { useMemo } from 'react'

function builderUspItems(selected: any): { title: string; text: string }[] {
  const raw = Array.isArray(selected?.highlights) ? selected.highlights : []
  return raw
    .map((h: any) => ({
      title: String(h?.title ?? '').trim(),
      text: String(h?.text ?? '').trim(),
    }))
    .filter((h: any) => h.title.length > 0 || h.text.length > 0)
    .slice(0, 5)
}

export function BuilderUsp({ selected }: { selected?: any }) {
  const items = useMemo(() => builderUspItems(selected), [selected])
  if (!items.length) return null

  return (
    <section id="builder">
      <div className="section-container">
        <div className="reveal">
          <div className="section-tag">🏗️ Builder</div>
          <h2 className="section-title">
            Trust &amp; <span style={{ color: 'var(--red)' }}>Credentials</span>
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 reveal">
          {items.map((it, idx) => (
            <div key={`${it.title}-${idx}`} className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
              <div className="text-[14px] font-bold text-gray-900">{it.title || `Point ${idx + 1}`}</div>
              {it.text ? <div className="mt-1 text-[13px] font-medium text-gray-600 leading-relaxed">{it.text}</div> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

