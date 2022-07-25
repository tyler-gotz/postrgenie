package models

import "time"

type CampaignUser struct {
	CampaignId int `json:"campaignId"`
	Campaign   Campaign
	UserId     int `json:"userId"`
	User       User
	CreatedAt  time.Time `json:"-"`
	UpdatedAt  time.Time `json:"-"`
}
