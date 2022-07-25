package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/tyler-gotz/postrgenie/server/controllers"
)

func RegisterClientsRoutes(api fiber.Router) {
	/*
		GET /clients
		GET Clients
	*/
	api.Get("/", controllers.GetClients)

	/*
		POST /clients
		ADD Client
	*/
	api.Post("/", controllers.AddClient)

	/*
		DELETE /clients/:id
		DELETE client
	*/
	api.Delete("/:id", controllers.DeleteClient)

	/*
		PATCH /clients/:id
		UPDATE Client
	*/
	api.Patch("/:id", controllers.UpdateClient)
}
