import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CampaignState } from '../../types/CampaignState'
import { User } from '../../types/User'
import { getApiServer } from '../../utils/helpers'

const initialState: CampaignState = {
  getCampaigns: {
    loading: false,
    success: false,
    error: false
  },
  getContractors: {
    loading: false,
    success: false,
    error: false
  },
  contractors: []
}

const serverUrl = getApiServer()

export const getContractors = createAsyncThunk<User[], { company: number, role: number }, { rejectValue: string | undefined }>(
  'campaign/contractors',
  async (params, { rejectWithValue }) => {
    const response = await fetch(`${serverUrl}/users?company=${params.company}&role=${params.role}`, {
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    })

    if (response.status >= 200 && response.status <= 299) {
      const contractors = await response.json()
      return contractors
    } else {
      const errorResponse = await response.text()
      return rejectWithValue(errorResponse)
    }
  }
)

export const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
        
  }
})

// export const { } = campaignSlice.actions

export default campaignSlice.reducer