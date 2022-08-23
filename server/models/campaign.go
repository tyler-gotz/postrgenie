package models

import "time"

type Campaign struct {
	CampaignId    uint           `gorm:"primaryKey" json:"campaignId"`
	Name          string         `json:"name"`
	DateAdded     time.Time      `json:"dateAdded"`
	DateCompleted time.Time      `json:"dateCompleted"`
	ClientId      uint           `json:"clientId"`
	Status        string         `json:"status"`
	CampaignUser  []CampaignUser `json:"campaignUsers"`
	CreatedAt     time.Time      `json:"-"`
	UpdatedAt     time.Time      `json:"-"`
}
