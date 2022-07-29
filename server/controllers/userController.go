package controllers

import (
	"github.com/dgrijalva/jwt-go/v4"
	"github.com/gofiber/fiber/v2"
	"github.com/tyler-gotz/postrgenie/server/config"
	"github.com/tyler-gotz/postrgenie/server/database"
	"github.com/tyler-gotz/postrgenie/server/models"
)

func Me(c *fiber.Ctx) error {
	cookie := c.Cookies("postrgenie_jwt")

	secret := config.GetEnvVariable("JWT_SECRET")

	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})

	if err != nil {
		return c.Status(fiber.StatusUnauthorized).Send([]byte("UnAuthorized"))
	}

	claims := token.Claims.(*jwt.StandardClaims)

	var user models.User

	result := database.DB.Preload("Company").Preload("Role.RolePermissions.Permission").Where("user_id = ?", claims.Issuer).First(&user)

	if result.Error != nil {
		return c.Status(fiber.StatusUnauthorized).Send([]byte("UnAuthorized"))
	}

	return c.JSON(user)
}
