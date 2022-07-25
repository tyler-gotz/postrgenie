package models

import "time"

type CampaignStatus struct {
	CampaignId int `json:"campaignId"`
	Campaign   Campaign
	StatusId   int `json:"statusId"`
	Status     Status
	CreatedAt  time.Time `json:"-"`
	UpdatedAt  time.Time `json:"-"`
}
