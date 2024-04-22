package controllers

import (
	"backend/models"
	"github.com/labstack/echo/v4"
	"net/http"
)

func ProcessPayment(c echo.Context) error {
	type PaymentRequest struct {
		Amount           float32 `json:"amount"`
		Name             string  `json:"name"`
		CreditCardNumber string  `json:"credit_card_number"`
		ExpirationDate   string  `json:"expiration_date"`
		CVC              uint16  `json:"cvc"`
	}

	var paymentReq PaymentRequest
	if err := c.Bind(&paymentReq); err != nil {
		payment := models.Payment{
			Amount:  paymentReq.Amount,
			Success: false,
		}
		return c.JSON(http.StatusBadRequest, payment)
	}

	payment := models.Payment{
		Amount:  paymentReq.Amount,
		Success: true,
	}

	return c.JSON(http.StatusOK, payment)
}
