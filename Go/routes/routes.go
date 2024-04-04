package routes

import (
	"Go/controllers"
	"github.com/labstack/echo/v4"
)

func SetupRoutes(e *echo.Echo) {
	e.POST("/products", controllers.CreateProduct)
	e.GET("/products", controllers.ReadAllProducts)
	e.GET("/products/:id", controllers.ReadProduct)
	e.PUT("/products/:id", controllers.UpdateProduct)
	e.DELETE("/products/:id", controllers.DeleteProduct)
}
