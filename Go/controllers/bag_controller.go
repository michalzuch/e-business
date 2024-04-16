package controllers

import (
	"Go/models"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
	"strconv"
)

func CreateBag(c echo.Context, db *gorm.DB) error {
	bag := new(models.Bag)
	if err := c.Bind(bag); err != nil {
		return err
	}

	result := db.Create(bag)
	if result.Error != nil {
		return result.Error
	}

	return c.JSON(http.StatusCreated, bag)
}

func ReadAllBags(c echo.Context, db *gorm.DB) error {
	var bags []models.Bag
	result := db.Find(&bags)
	if result.Error != nil {
		return c.JSON(http.StatusInternalServerError, "Failed to fetch bags")
	}

	return c.JSON(http.StatusOK, bags)
}

func ReadBag(c echo.Context, db *gorm.DB) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid ID format")
	}

	var bag models.Bag
	result := db.First(&bag, id)
	if result.Error != nil {
		return c.JSON(http.StatusNotFound, "Bag not found")
	}

	return c.JSON(http.StatusOK, bag)
}

func UpdateBag(c echo.Context, db *gorm.DB) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid ID format")
	}

	var bag models.Bag
	result := db.First(&bag, id)
	if result.Error != nil {
		return c.JSON(http.StatusNotFound, "Bag not found")
	}

	if err := c.Bind(&bag); err != nil {
		return err
	}

	result = db.Save(&bag)
	if result.Error != nil {
		return c.JSON(http.StatusInternalServerError, "Failed to update bag")
	}

	return c.JSON(http.StatusOK, bag)
}

func DeleteBag(c echo.Context, db *gorm.DB) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid ID format")
	}

	result := db.Delete(&models.Bag{}, id)
	if result.Error != nil {
		return c.JSON(http.StatusInternalServerError, "Failed to delete bag")
	}
	if result.RowsAffected == 0 {
		return c.JSON(http.StatusNotFound, "Bag not found")
	}

	return c.NoContent(http.StatusNoContent)
}
