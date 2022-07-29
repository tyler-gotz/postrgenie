import { ClientEmployee } from './ClientEmployee'
import { Role } from './Role'

export interface User {
    userId: number
    firstName: string
    lastName: string
    email: string
    isActive?: boolean
    role?: Role
    clientEmployee?: ClientEmployee
}