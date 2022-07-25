package database

import (
	"errors"
	"fmt"

	"github.com/tyler-gotz/postrgenie/server/config"
	"github.com/tyler-gotz/postrgenie/server/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	dbConnection := config.GetEnvVariable("MYSQL_CONN")

	connection, err := gorm.Open(mysql.Open(dbConnection), &gorm.Config{})

	if err != nil {
		panic("Could Not Connect to DB")
	}

	DB = connection
	fmt.Println("Connected to DB")

	if err = connection.AutoMigrate(&models.Status{}); err == nil && connection.Migrator().HasTable(&models.Status{}) {
		if err := connection.First(&models.Status{}).Error; errors.Is(err, gorm.ErrRecordNotFound) {
			connection.Create(&models.Status{
				Name: "CREATED",
			})
			connection.Create(&models.Status{
				Name: "IN_PROGRESS",
			})
			connection.Create(&models.Status{
				Name: "FINISHED",
			})
			connection.Create(&models.Status{
				Name: "SUBMITTED",
			})
			connection.Create(&models.Status{
				Name: "APPROVED",
			})
			connection.Create(&models.Status{
				Name: "REJECTED",
			})
		}
	}

	if err = connection.AutoMigrate(&models.Role{}); err == nil && connection.Migrator().HasTable(&models.Role{}) {
		if err := connection.First(&models.Role{}).Error; errors.Is(err, gorm.ErrRecordNotFound) {
			connection.Create(&models.Role{
				Name: "ADMIN",
			})
			connection.Create(&models.Role{
				Name: "COMPANY_EMPLOYEE",
			})
			connection.Create(&models.Role{
				Name: "CLIENT_USER",
			})
			connection.Create(&models.Role{
				Name: "CONTRACTOR",
			})
		}
	}

	if err = connection.AutoMigrate(&models.Permission{}); err == nil && connection.Migrator().HasTable(&models.Permission{}) {
		if err := connection.First(&models.Permission{}).Error; errors.Is(err, gorm.ErrRecordNotFound) {
			connection.Create(&models.Permission{
				Name: "WRITE_USERS",
			})
			connection.Create(&models.Permission{
				Name: "WRITE_CLIENT_COMPANIES",
			})
			connection.Create(&models.Permission{
				Name: "WRITE_CAMPAIGNS",
			})
			connection.Create(&models.Permission{
				Name: "UPLOAD_IMAGE",
			})
		}
	}

	connection.AutoMigrate(
		&models.Company{},
		&models.Client{},
		&models.Campaign{},
		&models.CampaignStatus{},
		&models.RolePermission{},
		&models.User{},
		&models.CampaignUser{},
		&models.Image{},
		&models.ImageStatus{},
		&models.ClientEmployee{},
		&models.Note{},
	)
}
