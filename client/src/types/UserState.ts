import { Company } from './Company'
import { Permission } from './Permission'
import { RequestState } from './RequestState'
import { Role } from './Role'
import { User } from './User'

export interface UserState {
    getMe: RequestState,
    user: User | null,
    company: Company | null,
    role: Role | null,
    permissions: Permission[]
}