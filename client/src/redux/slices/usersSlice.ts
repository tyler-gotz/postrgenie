import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Role } from '../../types/Role'
import { User } from '../../types/User'
import { UsersState } from '../../types/UsersState'
import { UserValues } from '../../types/UserValues'
import { getApiServer } from '../../utils/helpers'

const initialState: UsersState = {
  getUsers: {
    loading: false,
    success: false,
    error: false
  },
  users: [],
  roles: [],
  addUser: {
    loading: false,
    success: false,
    error: false
  }
}

const serverUrl = getApiServer()

export const getUsers = createAsyncThunk<User[], number | undefined, { rejectValue: string | undefined }>(
  'users/all',
  async (companyId, { rejectWithValue }) => {
    const response = await fetch(`${serverUrl}/users?company=${companyId}`, {
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    })

    if (response.status >= 200 && response.status <= 299) {
      const users = await response.json()
      return users
    } else {
      const errorResponse = await response.text()
      return rejectWithValue(errorResponse)
    }
  }
)

export const getRoles = createAsyncThunk<Role[], void, { rejectValue: string | undefined }>(
  'users/roles',
  async (_, { rejectWithValue }) => {
    const response = await fetch(`${serverUrl}/roles`, {
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    })

    if (response.status >= 200 && response.status <= 299) {
      const roles = await response.json()
      return roles
    } else {
      const errorResponse = await response.text()
      return rejectWithValue(errorResponse)
    }
  }
)

export const addUser = createAsyncThunk<User, UserValues, { rejectValue: string | undefined }>(
  'users/add',
  async (values, { rejectWithValue }) => {
    const response = await fetch(`${serverUrl}/users`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
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

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetAddAndUpdate: (state) => {
      state.addUser = {
        loading: false,
        success: false,
        error: false
      }

      // state.updateClient = {
      //   loading: false,
      //   success: false,
      //   error: false
      // }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state: UsersState) => {
      state.getUsers = {
        loading: true,
        success: false,
        error: false
      }
      state.users = []
    }),
    builder.addCase(getUsers.fulfilled, (state: UsersState, { payload }: PayloadAction<User[]>) => {
      state.getUsers = {
        ...state.getUsers,
        loading: false,
        success: true
      }

      state.users = payload
    }),
    builder.addCase(getUsers.rejected, (state: UsersState, { payload }: PayloadAction<string | undefined>) => {
      state.getUsers = {
        ...state.getUsers,
        loading: false,
        error: payload
      }
    }),
    builder.addCase(getRoles.fulfilled, (state: UsersState, { payload }: PayloadAction<Role[]>) => {
      state.roles = payload
    }),
    builder.addCase(addUser.pending, (state: UsersState) => {
      state.addUser = {
        loading: true,
        success: false,
        error: false
      }
    }),
    builder.addCase(addUser.fulfilled, (state: UsersState, { payload }: PayloadAction<User>) => {
      state.addUser = {
        ...state.addUser,
        loading: false,
        success: true
      }

      state.users = [
        payload,
        ...state.users
      ]
    }),
    builder.addCase(addUser.rejected, (state: UsersState, { payload }: PayloadAction<string | undefined>) => {
      state.addUser = {
        ...state.addUser,
        loading: false,
        error: payload
      }
    })
  }
})

export const { resetAddAndUpdate } = usersSlice.actions

export default usersSlice.reducer