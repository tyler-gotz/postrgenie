package models

import "time"

type ClientEmployee struct {
	ClientId  int `json:"clientId"`
	Client    Client
	UserId    int `json:"userId"`
	User      User
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}
