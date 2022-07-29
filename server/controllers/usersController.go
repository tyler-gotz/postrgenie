package controllers

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/tyler-gotz/postrgenie/server/database"
	"github.com/tyler-gotz/postrgenie/server/models"

	gomail "gopkg.in/gomail.v2"
)

func GetUsers(c *fiber.Ctx) error {
	companyId := c.Query("company")

	var users []models.User

	result := database.DB.Preload("Role").Preload("ClientEmployee.Client").Where("company_id = ?", companyId).Find(&users)

	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Internal Server Error"))
	}

	return c.JSON(users)
}

func GetRoles(c *fiber.Ctx) error {
	var roles []models.Role

	result := database.DB.Find(&roles)

	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Internal Server Error"))
	}

	return c.JSON(&roles)
}

func AddUser(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Internal Server Error"))
	}

	companyId, err := strconv.Atoi(data["company"])

	if err != nil {
		fmt.Println("Could Not Get company")
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Internal Server Error"))
	}

	roleId, roleErr := strconv.Atoi(data["roleId"])

	if roleErr != nil {
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Internal Server Error"))
	}

	user := models.User{
		FirstName: data["firstName"],
		LastName:  data["lastName"],
		Email:     data["email"],
		RoleId:    uint(roleId),
		CompanyId: uint(companyId),
		IsActive:  false,
	}

	result := database.DB.Create(&user)

	if result.Error != nil {
		return c.Status(fiber.StatusConflict).Send([]byte("Duplicate Email Found."))
	}

	clientId, ok := data["clientId"]

	if ok {
		client, clientErr := strconv.Atoi(clientId)
		if clientErr != nil {
			return c.Status(fiber.StatusInternalServerError).Send([]byte("Internal Server Error"))
		}

		clientUser := models.ClientEmployee{
			ClientId: uint(client),
			UserId:   uint(user.UserId),
		}

		database.DB.Create(&clientUser)
	}

	var createdUser models.User

	userResult := database.DB.Preload("Role").Preload("ClientEmployee.Client").Where("user_id = ?", user.UserId).First(&createdUser)

	if userResult.Error != nil {
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Internal Server Error"))
	}

	file_data, err := ioutil.ReadFile("./emails/new_account.html")
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Internal Server Error"))
	}

	msg := gomail.NewMessage()
	msg.SetHeader("From", "postrgenie@google.com")
	msg.SetHeader("To", createdUser.Email)
	msg.SetHeader("Subject", "New PostrGenie Account")
	msg.SetBody("text/html", strings.Replace(string(file_data), "$replace_firstname$", user.FirstName, 1))

	n := gomail.NewDialer("0.0.0.0", 1025, "", "")

	// Send the email
	if err := n.DialAndSend(msg); err != nil {
		panic(err)
	}

	return c.JSON(&createdUser)
}

// func DeleteClient(c *fiber.Ctx) error {
// 	company := c.Params("id")

// 	result := database.DB.Delete(&models.Client{}, company)

// 	if result.Error != nil {
// 		return c.Status(fiber.StatusInternalServerError).Send([]byte("Internal Server Error"))
// 	}

// 	return c.Send([]byte(company))
// }

// func UpdateClient(c *fiber.Ctx) error {
// 	clientId := c.Params("id")

// 	var data map[string]string
// 	if err := c.BodyParser(&data); err != nil {
// 		return c.Status(fiber.StatusInternalServerError).Send([]byte("Internal Server Error"))
// 	}

// 	var client models.Client

// 	result := database.DB.First(&client, clientId)

// 	if result.Error != nil {
// 		return c.Status(fiber.StatusBadRequest).Send([]byte("Client Not Found"))
// 	}

// 	client.Name = data["name"]

// 	saveResult := database.DB.Save(&client)

// 	if saveResult.Error != nil {
// 		return c.Status(fiber.StatusInternalServerError).Send([]byte("Internal Server Error"))
// 	}

// 	return c.JSON(&client)
// }
