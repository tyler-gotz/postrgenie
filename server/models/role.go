package models

import "time"

type Role struct {
	RoleId          uint             `gorm:"primaryKey" json:"roleId"`
	Name            string           `json:"name"`
	RolePermissions []RolePermission `json:"rolePermissions"`
	CreatedAt       time.Time        `json:"-"`
	UpdatedAt       time.Time        `json:"-"`
}
