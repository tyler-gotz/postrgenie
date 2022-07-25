package models

import "time"

type Campaign struct {
	CampaignId    uint      `gorm:"primaryKey" json:"campaignId"`
	Name          string    `json:"name"`
	DateAdded     time.Time `json:"dateAdded"`
	DateCompleted time.Time `json:"dateCompleted"`
	ClientId      int       `json:"clientId"`
	Client        Client
	CreatedAt     time.Time `json:"-"`
	UpdatedAt     time.Time `json:"-"`
}
