import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getClients } from '../../redux/slices/clientSlice'
import { getMe } from '../../redux/slices/userSlice'
import { getUsers } from '../../redux/slices/usersSlice'
import { AppDispatch } from '../../types/AppDispatch'
import { Company } from '../../types/Company'
import { PrivateRouteType } from '../../types/PrivateRoute'
import { RequestState } from '../../types/RequestState'
import { RootState } from '../../types/RootState'

const PrivateRoute: React.FC<PrivateRouteType> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>()

  const userCompany = useSelector<RootState, Company | null>((state) => state.user.company)
  const currentUserState = useSelector<RootState, RequestState>((state) => state.user.getMe)
  const clientState = useSelector<RootState, RequestState>((state) => state.client.getClients)

  useEffect(() => {
    if (!currentUserState.success) {
      dispatch(getMe())
    }
  }, [currentUserState.success, dispatch])

  useEffect(() => {
    if (currentUserState.success) {
      if (!clientState.success) {
        dispatch(getClients(userCompany?.companyId))
        dispatch(getUsers(userCompany?.companyId))
      }
    }
  }, [clientState.success, currentUserState.success, dispatch, userCompany?.companyId])


  if (currentUserState.loading) {
    return <div />
  }

  if (currentUserState.error !== false) {
    return <Navigate to='/login' replace />
  }

  return children
}

export default PrivateRoute