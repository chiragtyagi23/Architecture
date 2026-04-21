/** Join class names; omit falsy entries. For conflicting Tailwind utilities, use separate branches (see FloorPlans tabs). */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}
