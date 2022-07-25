package models

import "time"

type ImageStatus struct {
	ImageId   int `json:"imageId"`
	Image     Image
	StatusId  int `json:"statusId"`
	Status    Status
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}
