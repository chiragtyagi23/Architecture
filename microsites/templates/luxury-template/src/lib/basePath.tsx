import * as React from 'react'
import { createContext, useContext } from 'react'

const BasePathContext = createContext<string>('')

export function TemplateBasePathProvider({
  basePath,
  children,
}: {
  basePath: string
  children: React.ReactNode
}) {
  const normalized = basePath === '/' ? '' : basePath.replace(/\/+$/, '')
  return <BasePathContext value={normalized}>{children}</BasePathContext>
}

export function useTemplateBasePath(): string {
  return useContext(BasePathContext)
}

export function withTemplateBasePath(basePath: string, path: string): string {
  const p = path.trim()
  if (!p) return p
  // Absolute URLs should pass through untouched.
  if (/^https?:\/\//i.test(p)) return p
  // Relative paths should pass through untouched.
  if (!p.startsWith('/')) return p
  return `${basePath || ''}${p}`
}

