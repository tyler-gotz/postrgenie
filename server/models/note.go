package models

import "time"

type Note struct {
	NoteId    uint      `gorm:"primaryKey" json:"noteId"`
	Text      string    `json:"text"`
	Date      time.Time `json:"date"`
	ImageId   int       `json:"imageId"`
	Image     Image
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}
