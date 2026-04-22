import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type CampaignRow = {
  id: string
  title: string
  address: string | null
  desc: string | null
  logo: string | null
  coverImage?: string | null
  regNo: string | null
  templateKey?: 'luxury-template' | 'affordable-template'
  created_at?: string
  updated_at?: string
}

export type CampaignFull = {
  id: string
  title: string
  templateKey?: 'luxury-template' | 'affordable-template'
} & Record<string, unknown>

function apiBase(): string {
  const raw = process.env.NEXT_PUBLIC_BACKEND_URL
  const trimmed = typeof raw === 'string' ? raw.trim() : ''
  if (trimmed.length === 0) {
    throw new Error('Missing NEXT_PUBLIC_BACKEND_URL (set it in .env or .env.local)')
  }
  return trimmed.replace(/\/+$/, '')
}

export const fetchCampaigns = createAsyncThunk('campaigns/fetchCampaigns', async () => {
  const res = await fetch(`${apiBase()}/api/campaigns`)
  const data = (await res.json()) as { items: CampaignRow[] }
  if (!res.ok) throw new Error('Failed to load campaigns')
  return data.items
})

export const fetchCampaignById = createAsyncThunk('campaigns/fetchCampaignById', async (id: string) => {
  const res = await fetch(`${apiBase()}/api/campaigns/${id}`)
  const data = (await res.json()) as CampaignFull
  if (!res.ok) throw new Error('Failed to load campaign')
  return { id, data }
})

type CampaignsState = {
  items: CampaignRow[]
  loading: boolean
  error: string | null
  selectedId: string | null
  selected: CampaignFull | null
  selectedLoading: boolean
  selectedError: string | null
}

const initialState: CampaignsState = {
  items: [],
  loading: false,
  error: null,
  selectedId: null,
  selected: null,
  selectedLoading: false,
  selectedError: null,
}

const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    selectId(state, action: PayloadAction<string>) {
      state.selectedId = action.payload
    },
    clearSelected(state) {
      state.selectedId = null
      state.selected = null
      state.selectedError = null
      state.selectedLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampaigns.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to load campaigns'
      })
      .addCase(fetchCampaignById.pending, (state) => {
        state.selectedLoading = true
        state.selectedError = null
      })
      .addCase(fetchCampaignById.fulfilled, (state, action) => {
        state.selectedLoading = false
        state.selectedId = action.payload.id
        state.selected = action.payload.data
      })
      .addCase(fetchCampaignById.rejected, (state, action) => {
        state.selectedLoading = false
        state.selectedError = action.error.message ?? 'Failed to load campaign'
      })
  },
})

export const campaignsActions = campaignsSlice.actions
export const campaignsReducer = campaignsSlice.reducer

