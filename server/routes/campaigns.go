package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/tyler-gotz/postrgenie/server/controllers"
)

func RegisterCampaignsRoutes(api fiber.Router) {
	/*
		GET /campaigns
		GET ALL Company Campaigns
	*/
	api.Get("/", controllers.GetCampaigns)
}
