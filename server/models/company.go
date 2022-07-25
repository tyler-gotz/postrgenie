package models

import "time"

type Company struct {
	CompanyId uint      `gorm:"primaryKey" json:"companyId"`
	Name      string    `json:"name" gorm:"unique"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}
