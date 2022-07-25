import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RolePermission } from '../../types/RolePermission'
import { User } from '../../types/User'
import { UserState } from '../../types/UserState'
import { getApiServer } from '../../utils/helpers'

const initialState: UserState = {
  getMe: {
    loading: false,
    success: false,
    error: false
  },
  user: null,
  company: null,
  role: null,
  permissions: []
}

const serverUrl = getApiServer()

export const getMe = createAsyncThunk<any, void, { rejectValue: string | undefined }>(
  'user/me',
  async (_, { rejectWithValue }) => {
    const user = await fetch(`${serverUrl}/me`, {
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    })

    if (user.status >= 200 && user.status <= 299) {
      const content = await user.json()
      return content
    } else {
      const errorResponse = await user.text()
      return rejectWithValue(errorResponse)
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetGetMe: (state) => {
      state.getMe = {
        loading: false,
        success: false,
        error: false
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMe.pending, (state: UserState) => {
      state.getMe = {
        loading: true,
        success: false,
        error: false
      }
      state.user = null
    }),
    builder.addCase(getMe.fulfilled, (state: UserState, { payload }: PayloadAction<any>) => {
      state.getMe = {
        ...state.getMe,
        loading: false,
        success: true
      }
  
      state.user = {
        userId: payload.userId,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email
      }

      state.company = payload.company

      state.role = {
        roleId: payload.role.roleId,
        name: payload.role.name
      }

      state.permissions = payload.role.rolePermissions.map((rp: RolePermission) => rp.permission)

    }),
    builder.addCase(getMe.rejected, (state: UserState, { payload }: PayloadAction<string | undefined>) => {
      state.getMe = {
        ...state.getMe,
        loading: false,
        error: payload
      }
    })
  }
})

export const { resetGetMe } = userSlice.actions

export default userSlice.reducer