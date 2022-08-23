import { createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { Client } from '../../types/Client'
import { ClientState } from '../../types/ClientState'
import { getApiServer } from '../../utils/helpers'

const initialState: ClientState = {
  getClients: {
    loading: false,
    success: false,
    error: false
  },
  clients: [],
  addClient: {
    loading: false,
    success: false,
    error: false
  },
  deleteClient: {
    loading: false,
    success: false,
    error: false
  },
  updateClient: {
    loading: false,
    success: false,
    error: false
  }
}

const serverUrl = getApiServer()

export const getClients = createAsyncThunk<Client[], number | undefined, { rejectValue: string | undefined }>(
  'client/all',
  async (companyId, { rejectWithValue }) => {
    const response = await fetch(`${serverUrl}/clients?company=${companyId}`, {
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    })

    if (response.status >= 200 && response.status <= 299) {
      const clients = await response.json()
      return clients
    } else {
      const errorResponse = await response.text()
      return rejectWithValue(errorResponse)
    }
  }
)

export const addClient = createAsyncThunk<Client, { name: string, company: string }, { rejectValue: string | undefined }>(
  'client/add',
  async (values, { rejectWithValue }) => {
    const response = await fetch(`${serverUrl}/clients`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    })

    if (response.status >= 200 && response.status <= 299) {
      const newClient = await response.json()
      return newClient
    } else {
      const errorResponse = await response.text()
      return rejectWithValue(errorResponse)
    }
  }
)

export const deleteClient = createAsyncThunk<number, number, { rejectValue: string | undefined }>(
  'client/delete',
  async (companyId, { rejectWithValue }) => {
    const response: any = await fetch(`${serverUrl}/clients/${companyId}`, {
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      method: 'DELETE',
    })

    if (response.status >= 200 && response.status <= 299) {
      return companyId
    } else {
      const errorResponse = await response.text()
      return rejectWithValue(errorResponse)
    }
  }
)

export const updateClient = createAsyncThunk<Client, { clientId: number, name: string }, { rejectValue: string | undefined }>(
  'client/update',
  async (values, { rejectWithValue }) => {
    const { clientId, ...rest } = values

    const response = await fetch(`${serverUrl}/clients/${clientId}`, {
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      method: 'PATCH',
      body: JSON.stringify(rest)
    })

    if (response.status >= 200 && response.status <= 299) {
      const updatedClient = await response.json()
      return updatedClient
    } else {
      const errorResponse = await response.text()
      return rejectWithValue(errorResponse)
    }
  }
)

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    resetClientState: (state) => {
      state.addClient = {
        loading: false,
        success: false,
        error: false
      }

      state.updateClient = {
        loading: false,
        success: false,
        error: false
      }

      state.getClients = {
        loading: false,
        error: false,
        success: false
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getClients.pending, (state: ClientState) => {
      state.getClients = {
        loading: true,
        success: false,
        error: false
      }
      state.clients = []
    }),
    builder.addCase(getClients.fulfilled, (state: ClientState, { payload }: PayloadAction<Client[]>) => {
      state.getClients = {
        ...state.getClients,
        loading: false,
        success: true
      }

      state.clients = payload
    }),
    builder.addCase(getClients.rejected, (state: ClientState, { payload }: PayloadAction<string | undefined>) => {
      state.getClients = {
        ...state.getClients,
        loading: false,
        error: payload
      }
    }),
    builder.addCase(addClient.pending, (state: ClientState) => {
      state.addClient = {
        loading: true,
        success: false,
        error: false
      }

      state.deleteClient = {
        loading: false,
        success: false,
        error: false
      }

      state.updateClient = {
        loading: false,
        success: false,
        error: false
      }
    }),
    builder.addCase(addClient.fulfilled, (state: ClientState, { payload }: PayloadAction<Client>) => {
      state.addClient = {
        ...state.addClient,
        success: true,
        loading: false
      }
      state.clients = [
        payload,
        ...state.clients
      ]
    }),
    builder.addCase(addClient.rejected, (state: ClientState, { payload }: PayloadAction<string | undefined>) => {
      state.addClient = {
        ...state.addClient,
        error: payload,
        loading: false
      }
    }),
    builder.addCase(deleteClient.pending, (state: ClientState) => {
      state.deleteClient = {
        loading: true,
        error: false,
        success: false
      }

      state.addClient = {
        loading: false,
        success: false,
        error: false
      }

      state.updateClient = {
        loading: false,
        success: false,
        error: false
      }
    }),
    builder.addCase(deleteClient.fulfilled, (state: ClientState, { payload }: PayloadAction<number>) => {
      state.deleteClient = {
        ...state.deleteClient,
        success: true,
        loading: false
      }
      
      const currentClients = current(state.clients)
      state.clients = currentClients.filter((client) => client.clientId !== payload)
    }),
    builder.addCase(deleteClient.rejected, (state: ClientState, { payload }: PayloadAction<string | undefined>) => {
      state.deleteClient = {
        ...state.deleteClient,
        error: payload,
        loading: false
      }
    }),
    builder.addCase(updateClient.pending, (state: ClientState) => {
      state.updateClient = {
        loading: true,
        error: false,
        success: false
      }

      state.addClient = {
        loading: false,
        error: false,
        success: false
      }

      state.deleteClient = {
        loading: false,
        error: false,
        success: false
      }
    }),
    builder.addCase(updateClient.fulfilled, (state: ClientState, { payload }: PayloadAction<Client>) => {
      state.updateClient = {
        ...state.updateClient,
        loading: false,
        success: true
      }

      const clientIndex = state.clients.findIndex((client) => client.clientId === payload.clientId)

      state.clients = [
        ...state.clients.slice(0, clientIndex),
        payload,
        ...state.clients.slice(clientIndex + 1)
      ]
    }),
    builder.addCase(updateClient.rejected, (state: ClientState, { payload }: PayloadAction<string | undefined>) => {
      state.updateClient = {
        ...state.updateClient,
        loading: false,
        error: payload
      }
    })
  }
})

export const { resetClientState } = clientSlice.actions

export default clientSlice.reducer