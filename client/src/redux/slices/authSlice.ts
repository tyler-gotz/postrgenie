import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from '../../types/AuthState'
import { LoginValues } from '../../types/LoginValues'
import { RegisterValues } from '../../types/RegisterValues'
import { SignUp } from '../../types/SignUp'
import { User } from '../../types/User'
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
  },
  verify: {
    loading: false,
    success: false,
    error: false
  },
  user: null,
  signUp: {
    loading: false,
    success: false,
    error: false
  },
  logout: {
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

export const verifyUser = createAsyncThunk<User, string, { rejectValue: string | undefined }>(
  'auth/verify',
  async (claim, { rejectWithValue }) => {
    const response = await fetch(`${serverUrl}/verify?claim=${claim}`, {
      headers: {'Content-Type': 'application/json'}
    })

    if (response.status >= 200 && response.status <= 299) {
      const user = await response.json()
      return user
    } else {
      const errorResponse = await response.text()
      return rejectWithValue(errorResponse)
    }
  }
)

export const signUp = createAsyncThunk<boolean, SignUp, { rejectValue: string | undefined }>(
  'auth/signUp',
  async (values, { rejectWithValue }) => {
    const response = await fetch(`${serverUrl}/signup`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status >= 200 && response.status <= 299) {
      return true
    } else {
      const errorResponse = await response.text()
      return rejectWithValue(errorResponse)
    }
  }
)

export const logout = createAsyncThunk<boolean, void, { rejectValue: string | undefined }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    const response = await fetch(`${serverUrl}/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json'}
    })

    if (response.status >= 200 && response.status <= 299) {
      return true
    } else {
      const errorResponse = await response.text()
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
    }),
    builder.addCase(verifyUser.pending, (state: AuthState) => {
      state.verify = {
        loading: true,
        error: false,
        success: false
      }

      state.user = null
    }),
    builder.addCase(verifyUser.fulfilled, (state: AuthState, { payload } : PayloadAction<User>) => {
      state.verify = {
        ...state.verify,
        loading: false,
        success: true
      }

      state.user = payload
    }),
    builder.addCase(verifyUser.rejected, (state: AuthState, { payload }: PayloadAction<string | undefined>) => {
      state.verify = {
        ...state.verify,
        loading: false,
        error: payload
      }
    }),
    builder.addCase(signUp.pending, (state: AuthState) => {
      state.signUp = {
        loading: true,
        error: false,
        success: false
      }
    }),
    builder.addCase(signUp.fulfilled, (state: AuthState, { payload } : PayloadAction<boolean>) => {
      state.signUp = {
        ...state.signUp,
        loading: false,
        success: payload
      }
    }),
    builder.addCase(signUp.rejected, (state: AuthState, { payload } : PayloadAction<string | undefined>) => {
      state.signUp = {
        ...state.signUp,
        loading: false,
        error: payload
      }
    }),
    builder.addCase(logout.pending, (state: AuthState) => {
      state.logout = {
        loading: true,
        success: false,
        error: false
      }
    }),
    builder.addCase(logout.fulfilled, (state: AuthState) => {
      state.logout = {
        ...state.logout,
        success: true,
        loading: false
      }
    }),
    builder.addCase(logout.rejected, (state: AuthState) => {
      state.logout = {
        ...state.logout,
        error: true,
        loading: false
      }
    })
  }
})

export const { clearAuth } = authSlice.actions

export default authSlice.reducer