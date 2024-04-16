package controllers

import (
	"Go/models"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
	"strconv"
)

func CreateProduct(c echo.Context, db *gorm.DB) error {
	product := new(models.Product)
	if err := c.Bind(product); err != nil {
		return err
	}

	result := db.Create(product)
	if result.Error != nil {
		return result.Error
	}

	return c.JSON(http.StatusCreated, product)
}

func ReadAllProducts(c echo.Context, db *gorm.DB) error {
	var products []models.Product
	result := db.Preload("Category").Find(&products)
	if result.Error != nil {
		return c.JSON(http.StatusInternalServerError, "Failed to fetch products")
	}

	return c.JSON(http.StatusOK, products)
}

func ReadProduct(c echo.Context, db *gorm.DB) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid ID format")
	}

	var product models.Product
	result := db.Preload("Category").First(&product, id)
	if result.Error != nil {
		return c.JSON(http.StatusNotFound, "Product not found")
	}

	return c.JSON(http.StatusOK, product)
}

func UpdateProduct(c echo.Context, db *gorm.DB) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid ID format")
	}

	var product models.Product
	result := db.Preload("Category").First(&product, id)
	if result.Error != nil {
		return c.JSON(http.StatusNotFound, "Product not found")
	}

	if err := c.Bind(&product); err != nil {
		return err
	}

	result = db.Save(&product)
	if result.Error != nil {
		return c.JSON(http.StatusInternalServerError, "Failed to update product")
	}

	return c.JSON(http.StatusOK, product)
}

func DeleteProduct(c echo.Context, db *gorm.DB) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid ID format")
	}

	result := db.Delete(&models.Product{}, id)
	if result.Error != nil {
		return c.JSON(http.StatusInternalServerError, "Failed to delete product")
	}
	if result.RowsAffected == 0 {
		return c.JSON(http.StatusNotFound, "Product not found")
	}

	return c.NoContent(http.StatusNoContent)
}
