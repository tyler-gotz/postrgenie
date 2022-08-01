import { RequestState } from './RequestState'
import { User } from './User'

export interface AuthState {
  register: RequestState,
  login: RequestState,
  verify: RequestState,
  user: User | null,
  signUp: RequestState,
  logout: RequestState
}
