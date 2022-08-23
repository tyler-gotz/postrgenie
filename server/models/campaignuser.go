package models

import "time"

type CampaignUser struct {
	CampaignId uint `json:"campaignId"`
	UserId     uint `json:"userId"`
	User       User
	CreatedAt  time.Time `json:"-"`
	UpdatedAt  time.Time `json:"-"`
}
