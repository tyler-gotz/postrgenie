package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/tyler-gotz/postrgenie/server/controllers"
)

func RegisterRoutes(api fiber.Router) {
	/*
		GET /ping
		Health check of server :)
	*/
	api.Get("/ping", controllers.Ping)

	/*
		GET /me
		GET Current User
	*/
	api.Get("/me", controllers.Me)

	/*
		POST /register
		Register User and Company
	*/
	api.Post("/register", controllers.Register)

	/*
		POST /login
		Login User
	*/
	api.Post("/login", controllers.Login)

	/*
		GET /roles
		GET roles
	*/
	api.Get("/roles", controllers.GetRoles)

	/*
		SET UP CLIENTS ROUTES
	*/
	clientsApi := api.Group("/clients")
	RegisterClientsRoutes(clientsApi)

	/*
		SET UP USERS ROUTES
	*/
	usersApi := api.Group("/users")
	RegisterUsersRoutes(usersApi)
}
