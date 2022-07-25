package models

import "time"

type User struct {
	UserId    uint      `gorm:"primaryKey" json:"userId"`
	FirstName string    `json:"firstName"`
	LastName  string    `json:"lastName"`
	Email     string    `json:"email" gorm:"unique"`
	Password  []byte    `json:"-"`
	CompanyId uint      `json:"companyId"`
	Company   Company   `json:"company"`
	RoleId    uint      `json:"roleId"`
	Role      Role      `json:"role"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}
