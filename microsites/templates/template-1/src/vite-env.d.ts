/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NAV_API_URL?: string
  readonly VITE_HERO_API_URL?: string
  readonly VITE_MARQUEE_API_URL?: string
  readonly VITE_OVERVIEW_API_URL?: string
  readonly VITE_GALLERY_API_URL?: string
  readonly VITE_FLOORPLANS_API_URL?: string
  readonly VITE_LOCATION_API_URL?: string
  readonly VITE_AMENITIES_API_URL?: string
  readonly VITE_HIGHLIGHTS_API_URL?: string
  readonly VITE_BENEFITS_API_URL?: string
  readonly VITE_ENQUIRY_API_URL?: string
  readonly VITE_FOOTER_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
