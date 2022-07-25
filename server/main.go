package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/tyler-gotz/postrgenie/server/database"
	"github.com/tyler-gotz/postrgenie/server/routes"
)

func main() {
	database.Connect()

	app := fiber.New()

	app.Use(cors.New(cors.Config{AllowCredentials: true}))

	api := app.Group("/api")
	routes.RegisterRoutes(api)

	app.Listen(":8000")
}
