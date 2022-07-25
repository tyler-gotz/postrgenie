package models

import "time"

type Image struct {
	ImageId       uint   `gorm:"primaryKey" json:"imageId"`
	ImageLocation string `json:"imageLocation"`
	UserId        int    `json:"userId"`
	User          User
	CampaignId    int `json:"campaignId"`
	Campaign      Campaign
	CreatedAt     time.Time `json:"-"`
	UpdatedAt     time.Time `json:"-"`
}
