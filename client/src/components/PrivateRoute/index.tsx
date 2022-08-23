import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getMe } from '../../redux/slices/userSlice'
import { AppDispatch } from '../../types/AppDispatch'
import { PrivateRouteType } from '../../types/PrivateRoute'
import { RequestState } from '../../types/RequestState'
import { RootState } from '../../types/RootState'

const PrivateRoute: React.FC<PrivateRouteType> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>()

  const currentUserState = useSelector<RootState, RequestState>((state) => state.user.getMe)

  useEffect(() => {
    if (!currentUserState.success) {
      dispatch(getMe())
    }
  }, [currentUserState.success, dispatch])

  if (currentUserState.loading) {
    return <div />
  }

  if (currentUserState.error !== false) {
    return <Navigate to='/login' replace />
  }

  return children
}

export default PrivateRoute