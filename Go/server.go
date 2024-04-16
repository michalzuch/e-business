package main

import (
	"Go/models"
	"Go/routes"
	"github.com/labstack/echo/v4"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func main() {
	db, err := gorm.Open(sqlite.Open("data.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect database")
	}

	err = db.AutoMigrate(&models.Category{})
	if err != nil {
		panic("Failed to migrate categories database")
	}

	err = db.AutoMigrate(&models.Product{})
	if err != nil {
		panic("Failed to migrate products database")
	}

	err = db.AutoMigrate(&models.Bag{})
	if err != nil {
		panic("Failed to migrate bags database")
	}

	e := echo.New()
	routes.SetupRoutes(e, db)
	e.Logger.Fatal(e.Start(":1323"))
}
