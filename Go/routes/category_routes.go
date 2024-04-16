package routes

import (
	"Go/controllers"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func SetupCategoryRoutes(e *echo.Echo, db *gorm.DB) {
	e.POST("/categories", CreateCategoryHandler(db))
	e.GET("/categories", ReadAllCategoriesHandler(db))
	e.GET("/categories/:id", ReadCategoryHandler(db))
	e.PUT("/categories/:id", UpdateCategoryHandler(db))
	e.DELETE("/categories/:id", DeleteCategoryHandler(db))
}

func CreateCategoryHandler(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		return controllers.CreateCategory(c, db)
	}
}

func ReadAllCategoriesHandler(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		return controllers.ReadAllCategories(c, db)
	}
}

func ReadCategoryHandler(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error { return controllers.ReadCategory(c, db) }
}

func UpdateCategoryHandler(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		return controllers.UpdateCategory(c, db)
	}
}

func DeleteCategoryHandler(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		return controllers.DeleteCategory(c, db)
	}
}
