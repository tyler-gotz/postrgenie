package models

import "time"

type Client struct {
	ClientId       uint             `gorm:"primaryKey" json:"clientId"`
	Name           string           `json:"name"`
	CompanyId      uint             `json:"companyId"`
	ClientEmployee []ClientEmployee `json:"clientEmployees"`
	CreatedAt      time.Time        `json:"-"`
	UpdatedAt      time.Time        `json:"-"`
}
