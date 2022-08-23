package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/tyler-gotz/postrgenie/server/database"
	"github.com/tyler-gotz/postrgenie/server/models"
)

func GetCampaigns(c *fiber.Ctx) error {
	companyId := c.Query("company")

	var clients []models.Client
	database.DB.Where("company_id = ?", companyId).Find(&clients)

	var clientIds []int

	for i := 0; i < len(clients); i += 1 {
		clientIds = append(clientIds, int(clients[i].ClientId))
	}

	var campaigns []models.Campaign
	database.DB.Where("client_id IN ?", clientIds).Find(&campaigns)

	return c.JSON(campaigns)
}
