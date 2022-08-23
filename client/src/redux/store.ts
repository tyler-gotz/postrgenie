import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import campaignReducer from './slices/campaignSlice'
import clientSlice from './slices/clientSlice'
import userReducer from './slices/userSlice'
import usersReducer from './slices/usersSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    campaign: campaignReducer,
    client: clientSlice,
    user: userReducer,
    users: usersReducer
  },
  devTools: import.meta.env.DEV
})