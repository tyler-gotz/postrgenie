import { Permission } from './Permission'
import { Role } from './Role'

export interface RolePermission {
    roleId: number
    role: Role
    permissionId: number
    permission: Permission
}