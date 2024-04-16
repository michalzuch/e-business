package routes

import (
	"Go/controllers"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func SetupBagRoutes(e *echo.Echo, db *gorm.DB) {
	e.POST("/bags", CreateBagHandler(db))
	e.GET("/bags", ReadAllBagsHandler(db))
	e.GET("/bags/:id", ReadBagHandler(db))
	e.PUT("/bags/:id", UpdateBagHandler(db))
	e.DELETE("/bags/:id", DeleteBagHandler(db))
}

func CreateBagHandler(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error { return controllers.CreateBag(c, db) }
}

func ReadAllBagsHandler(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error { return controllers.ReadAllBags(c, db) }
}

func ReadBagHandler(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error { return controllers.ReadBag(c, db) }
}

func UpdateBagHandler(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error { return controllers.UpdateBag(c, db) }
}

func DeleteBagHandler(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error { return controllers.DeleteBag(c, db) }
}
