package controllers

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

type Product struct {
	ID          int     `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float32 `json:"price"`
	Stock       int     `json:"stock"`
}

var products = []Product{
	{ID: 1, Name: "Laptop", Description: "Powerful laptop for work and gaming", Price: 999.99, Stock: 10},
	{ID: 2, Name: "Smartphone", Description: "Latest smartphone with great features", Price: 599.99, Stock: 20},
	{ID: 3, Name: "Headphones", Description: "Noise-cancelling headphones for an immersive experience", Price: 99.99, Stock: 30},
}

func CreateProduct(c echo.Context) error {
	product := new(Product)
	if err := c.Bind(product); err != nil {
		return err
	}
	product.ID = len(products) + 1
	products = append(products, *product)
	return c.JSON(http.StatusCreated, product)
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

func UpdateProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	for i, p := range products {
		if p.ID == id {
			product := new(Product)
			if err := c.Bind(product); err != nil {
				return err
			}
			product.ID = p.ID
			products[i] = *product
			return c.JSON(http.StatusOK, products[i])
		}
	}
	return c.JSON(http.StatusNotFound, "Product not found")
}

func DeleteProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	for i, p := range products {
		if p.ID == id {
			products = append(products[:i], products[i+1:]...)
			return c.NoContent(http.StatusNoContent)
		}
	}
	return c.JSON(http.StatusNotFound, "Product not found")
}
