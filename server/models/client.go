package models

import "time"

type Client struct {
	ClientId  uint   `gorm:"primaryKey" json:"clientId"`
	Name      string `json:"name"`
	CompanyId int    `json:"companyId"`
	Company   Company
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}
