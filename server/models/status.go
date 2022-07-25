package models

import "time"

type Status struct {
	StatusId  uint      `gorm:"primaryKey" json:"statusId"`
	Name      string    `json:"name"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}
