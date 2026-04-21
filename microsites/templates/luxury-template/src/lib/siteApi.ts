import { useEffect, useState } from 'react'
import { useTemplateBasePath, withTemplateBasePath } from './basePath'

export function resolveApiUrl(envKey: string, fallbackPath: string): string {
  const v = (import.meta.env as Record<string, string | undefined>)[envKey]
  return typeof v === 'string' && v.trim().length > 0 ? v.trim() : fallbackPath
}

export function useSiteSection<T>(envKey: string, fallbackPath: string) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const basePath = useTemplateBasePath()

  useEffect(() => {
    const controller = new AbortController()
    const url = withTemplateBasePath(basePath, resolveApiUrl(envKey, fallbackPath))

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json() as Promise<T>
      })
      .then(setData)
      .catch((e: unknown) => {
        if (e instanceof Error && e.name === 'AbortError') return
        setError(e instanceof Error ? e.message : 'Failed to load')
      })

    return () => controller.abort()
  }, [envKey, fallbackPath])

  return { data, error }
}

/** Accepts `"overview"` or `"#overview"` (hash from nav.json). */
export function scrollToSection(hashOrId: string) {
  const id = hashOrId.replace(/^#/, '').trim()
  if (!id) return
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
