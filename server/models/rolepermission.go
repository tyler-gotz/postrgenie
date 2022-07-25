package models

import "time"

type RolePermission struct {
	RoleId       uint       `json:"roleId"`
	Role         Role       `json:"role"`
	PermissionId uint       `json:"permissionId"`
	Permission   Permission `json:"permission"`
	CreatedAt    time.Time  `json:"-"`
	UpdatedAt    time.Time  `json:"-"`
}
