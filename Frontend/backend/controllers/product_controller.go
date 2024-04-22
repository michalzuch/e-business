package controllers

import (
	"backend/models"
	"github.com/labstack/echo/v4"
	"net/http"
	"strconv"
)

var products = []models.Product{
	{ID: 1, Name: "Laptop", Description: "Powerful laptop for work and gaming", Price: 999.99, Stock: 10},
	{ID: 2, Name: "Tablet", Description: "Portable tablet for entertainment and productivity", Price: 399.99, Stock: 15},
	{ID: 3, Name: "Watch", Description: "Elegant timepiece for a classic look", Price: 199.99, Stock: 25},
	{ID: 4, Name: "Running Shoes", Description: "Comfortable shoes for your daily runs", Price: 79.99, Stock: 30},
	{ID: 5, Name: "Sunglasses", Description: "Stylish sunglasses to protect your eyes", Price: 49.99, Stock: 18},
	{ID: 6, Name: "Smartphone", Description: "Latest smartphone with great features", Price: 599.99, Stock: 20},
	{ID: 7, Name: "Cookware Set", Description: "Complete set for your kitchen needs", Price: 129.99, Stock: 22},
	{ID: 8, Name: "Backpack", Description: "Durable backpack for travel and everyday use", Price: 59.99, Stock: 20},
	{ID: 9, Name: "Yoga Mat", Description: "Non-slip mat for your yoga practice", Price: 29.99, Stock: 15},
	{ID: 10, Name: "Headphones", Description: "Noise-cancelling headphones for an immersive experience", Price: 99.99, Stock: 30},
}

func ReadAllProducts(c echo.Context) error {
	return c.JSON(http.StatusOK, products)
}

func ReadProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	for _, p := range products {
		if p.ID == id {
			return c.JSON(http.StatusOK, p)
		}
	}
	return c.JSON(http.StatusNotFound, "Product not found")
}
