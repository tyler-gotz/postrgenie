import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from '../../types/AuthState'
import { LoginValues } from '../../types/LoginValues'
import { RegisterValues } from '../../types/RegisterValues'
import { getApiServer } from '../../utils/helpers'

const initialState: AuthState = {
  register: {
    loading: false,
    success: false,
    error: false
  },
  login: {
    loading: false,
    success: false,
    error: false
  }
}

const serverUrl = getApiServer()

export const registerUser = createAsyncThunk<boolean, RegisterValues, { rejectValue: string | undefined }>(
  'auth/register',
  async (values, { rejectWithValue }) => {
    const registeredUser = await fetch(`${serverUrl}/register`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (registeredUser.status >= 200 && registeredUser.status <= 299) {
      return true
    } else {
      const errorResponse = await registeredUser.text()
      return rejectWithValue(errorResponse)
    }
  }
)

export const loginUser = createAsyncThunk<boolean, LoginValues, { rejectValue: string | undefined }>(
  'auth/login',
  async (values, { rejectWithValue }) => {
    const loggedInUser = await fetch(`${serverUrl}/login`, {
      method: 'POST',
      body: JSON.stringify(values),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (loggedInUser.status >= 200 && loggedInUser.status <= 299) {
      return true
    } else {
      const errorResponse = await loggedInUser.text()
      return rejectWithValue(errorResponse)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.login = {
        loading: false,
        success: false,
        error: false
      }

      state.register = {
        loading: false,
        success: false,
        error: false
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state: AuthState) => {
      state.register = {
        loading: true,
        success: false,
        error: false,
      }
    }),
    builder.addCase(registerUser.fulfilled, (state: AuthState) => {
      state.register = {
        ...state.register,
        loading: false,
        success: true,
      }
    }),
    builder.addCase(registerUser.rejected, (state: AuthState, { payload } : PayloadAction<string | undefined>) => {
      state.register = {
        ...state.register,
        loading: false,
        error: payload
      }
    }),
    builder.addCase(loginUser.pending, (state: AuthState) => {
      state.login = {
        loading: true,
        success: false,
        error: false
      }
    }),
    builder.addCase(loginUser.fulfilled, (state: AuthState) => {
      state.login = {
        ...state.login,
        loading: false,
        success: true,
      }
    }),
    builder.addCase(loginUser.rejected, (state: AuthState, { payload } : PayloadAction<string | undefined>) => {
      state.login = {
        ...state.login,
        loading: false,
        error: payload
      }
    })
  }
})

export const { clearAuth } = authSlice.actions

export default authSlice.reducer