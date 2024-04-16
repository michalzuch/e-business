package routes

import (
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func SetupRoutes(e *echo.Echo, db *gorm.DB) {
	SetupProductRoutes(e, db)
	SetupBagRoutes(e, db)
}
