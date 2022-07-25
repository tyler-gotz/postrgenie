package controllers

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/tyler-gotz/postrgenie/server/database"
	"github.com/tyler-gotz/postrgenie/server/models"
)

func GetClients(c *fiber.Ctx) error {
	companyId := c.Query("company")

	var clients []models.Client
	database.DB.Where("company_id = ?", companyId).Find(&clients)

	return c.JSON(clients)
}

func AddClient(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Internal Server Error"))
	}

	companyId, err := strconv.Atoi(data["company"])

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Internal Server Error"))
	}

	client := models.Client{
		Name:      data["name"],
		CompanyId: companyId,
	}

	result := database.DB.Create(&client)

	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Internal Server Error"))
	}

	return c.JSON(client)
}

func DeleteClient(c *fiber.Ctx) error {
	company := c.Params("id")

	result := database.DB.Delete(&models.Client{}, company)

	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Internal Server Error"))
	}

	return c.Send([]byte(company))
}

func UpdateClient(c *fiber.Ctx) error {
	clientId := c.Params("id")

	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Internal Server Error"))
	}

	var client models.Client

	result := database.DB.First(&client, clientId)

	if result.Error != nil {
		return c.Status(fiber.StatusBadRequest).Send([]byte("Client Not Found"))
	}

	client.Name = data["name"]

	saveResult := database.DB.Save(&client)

	if saveResult.Error != nil {
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Internal Server Error"))
	}

	return c.JSON(&client)
}
