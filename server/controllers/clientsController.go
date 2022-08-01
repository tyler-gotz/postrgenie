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
		CompanyId: uint(companyId),
	}

	result := database.DB.Create(&client)

	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Internal Server Error"))
	}

	return c.JSON(client)
}

func DeleteClient(c *fiber.Ctx) error {
	company := c.Params("id")

	var client models.Client

	database.DB.Preload("ClientEmployee").Where("client_id = ?", &company).First(&client)

	var employees []int

	for i := 0; i < len(client.ClientEmployee); i++ {
		employees = append(employees, int(client.ClientEmployee[i].UserId))
	}

	database.DB.Delete(&models.ClientEmployee{}, "user_id IN ?", employees)

	database.DB.Delete(&models.User{}, "user_id IN ?", employees)

	database.DB.Delete(&models.Client{}, "client_id = ?", company)

	return c.JSON(&company)
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
