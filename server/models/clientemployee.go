package models

import "time"

type ClientEmployee struct {
	ClientId  uint      `json:"clientId"`
	Client    Client    `json:"client"`
	UserId    uint      `json:"userId"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}
