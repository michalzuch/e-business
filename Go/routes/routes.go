package routes

import (
	"Go/controllers"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func SetupRoutes(e *echo.Echo, db *gorm.DB) {
	e.POST("/products", CreateProductHandler(db))
	e.GET("/products", ReadAllProductsHandler(db))
	e.GET("/products/:id", ReadProductHandler(db))
	e.PUT("/products/:id", UpdateProductHandler(db))
	e.DELETE("/products/:id", DeleteProductHandler(db))
}

func CreateProductHandler(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		return controllers.CreateProduct(c, db)
	}
}

func ReadAllProductsHandler(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		return controllers.ReadAllProducts(c, db)
	}
}

func ReadProductHandler(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		return controllers.ReadProduct(c, db)
	}
}

func UpdateProductHandler(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		return controllers.UpdateProduct(c, db)
	}
}

func DeleteProductHandler(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		return controllers.DeleteProduct(c, db)
	}
}
