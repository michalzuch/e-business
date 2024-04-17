package controllers

import (
	"Go/models"
	"Go/scopes"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
	"strconv"
)

func CreateCategory(c echo.Context, db *gorm.DB) error {
	category := new(models.Category)
	if err := c.Bind(category); err != nil {
		return err
	}

	result := db.Create(category)
	if result.Error != nil {
		return result.Error
	}

	return c.JSON(http.StatusCreated, category)
}

func ReadAllCategories(c echo.Context, db *gorm.DB) error {
	var categories []models.Category
	result := db.Scopes(scopes.WithProduct).Find(&categories)
	if result.Error != nil {
		return c.JSON(http.StatusInternalServerError, "Failed to fetch categories")
	}

	return c.JSON(http.StatusOK, categories)
}

func ReadCategory(c echo.Context, db *gorm.DB) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid ID format")
	}

	var category models.Category
	result := db.Scopes(scopes.WithProduct).First(&category, id)
	if result.Error != nil {
		return c.JSON(http.StatusNotFound, "Category not found")
	}

	return c.JSON(http.StatusOK, category)
}

func UpdateCategory(c echo.Context, db *gorm.DB) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid ID format")
	}

	var category models.Category
	result := db.Scopes(scopes.WithProduct).First(&category, id)
	if result.Error != nil {
		return c.JSON(http.StatusNotFound, "Category not found")
	}

	if err := c.Bind(&category); err != nil {
		return err
	}

	result = db.Save(&category)
	if result.Error != nil {
		return c.JSON(http.StatusInternalServerError, "Failed to update category")
	}

	return c.JSON(http.StatusOK, category)
}

func DeleteCategory(c echo.Context, db *gorm.DB) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid ID format")
	}

	result := db.Delete(&models.Category{}, id)
	if result.Error != nil {
		return c.JSON(http.StatusInternalServerError, "Failed to delete category")
	}
	if result.RowsAffected == 0 {
		return c.JSON(http.StatusNotFound, "Category not found")
	}

	return c.NoContent(http.StatusNoContent)
}
