import { RequestState } from './RequestState'

export interface AuthState {
  register: RequestState,
  login: RequestState
}
