package routes

import (
	"backend/controllers"
	"github.com/labstack/echo/v4"
)

func SetupRoutes(e *echo.Echo) {
	e.GET("/products", controllers.ReadAllProducts)
	e.GET("/products/:id", controllers.ReadProduct)
	e.POST("/payments", controllers.ProcessPayment)
}
