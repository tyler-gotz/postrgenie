package models

import "time"

type Permission struct {
	PermissionId uint      `gorm:"primaryKey" json:"permissionId"`
	Name         string    `json:"name"`
	CreatedAt    time.Time `json:"-"`
	UpdatedAt    time.Time `json:"-"`
}
