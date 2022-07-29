package controllers

import (
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go/v4"
	"github.com/gofiber/fiber/v2"
	"github.com/tyler-gotz/postrgenie/server/config"
	"github.com/tyler-gotz/postrgenie/server/database"
	"github.com/tyler-gotz/postrgenie/server/models"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Internal Server Error"))
	}

	company := models.Company{
		Name: data["companyName"],
	}

	companyResult := database.DB.Create(&company)

	if companyResult.Error != nil {
		return c.Status(fiber.StatusConflict).Send([]byte("Duplicate Company Found."))
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 16)

	user := models.User{
		FirstName: data["firstName"],
		LastName:  data["lastName"],
		Email:     data["email"],
		Password:  password,
		CompanyId: uint(company.CompanyId),
		RoleId:    1,
		IsActive:  true,
	}

	userResult := database.DB.Create(&user)

	if userResult.Error != nil {
		return c.Status(fiber.StatusConflict).Send([]byte("Duplicate Email Found."))
	}

	return c.JSON(user.UserId)
}

func Login(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	var user models.User

	database.DB.Where("email = ?", data["email"]).First(&user)

	if user.UserId == 0 {
		c.Status(fiber.StatusNotFound)
		return c.Send([]byte("Incorrect email or password"))
	}

	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.Send([]byte("Incorrect email or password"))
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    strconv.Itoa(int(user.UserId)),
		ExpiresAt: jwt.At(time.Now().Add(time.Hour * 24)),
	})

	secret := config.GetEnvVariable("JWT_SECRET")
	token, err := claims.SignedString([]byte(secret))

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.Send([]byte("Incorrect email or password"))
	}

	cookie := fiber.Cookie{
		Name:     "postrgenie_jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "success",
	})
}
