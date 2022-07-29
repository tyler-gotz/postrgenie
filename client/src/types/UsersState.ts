import { RequestState } from './RequestState'
import { Role } from './Role'
import { User } from './User'

export interface UsersState {
    getUsers: RequestState
    users: User[]
    roles: Role[]
    addUser: RequestState
}