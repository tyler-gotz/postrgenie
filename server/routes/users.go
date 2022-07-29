package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/tyler-gotz/postrgenie/server/controllers"
)

func RegisterUsersRoutes(api fiber.Router) {
	/*
		GET /clients
		GET Clients
	*/
	api.Get("/", controllers.GetUsers)

	/*
		POST /users
		ADD User
	*/
	api.Post("/", controllers.AddUser)

	/*
		DELETE /clients/:id
		DELETE client
	*/
	// api.Delete("/:id", controllers.DeleteClient)

	/*
		PATCH /clients/:id
		UPDATE Client
	*/
	// api.Patch("/:id", controllers.UpdateClient)
}
