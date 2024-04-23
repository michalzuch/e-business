package controllers

import (
	"backend/models"
	"github.com/labstack/echo/v4"
	"net/http"
)

func ProcessPayment(c echo.Context) error {
	type PaymentRequest struct {
		Name             string `json:"name"`
		CreditCardNumber string `json:"credit_card_number"`
		ExpirationDate   string `json:"expiration_date"`
		CVC              uint16 `json:"cvc"`
	}

	var paymentReq PaymentRequest

	if err := c.Bind(&paymentReq); err != nil {
		payment := models.Payment{
			Name:             paymentReq.Name,
			CreditCardNumber: paymentReq.CreditCardNumber,
			ExpirationDate:   paymentReq.ExpirationDate,
			CVC:              paymentReq.CVC,
			Success:          false,
		}
		return c.JSON(http.StatusBadRequest, payment)
	}

	payment := models.Payment{
		Name:             paymentReq.Name,
		CreditCardNumber: paymentReq.CreditCardNumber,
		ExpirationDate:   paymentReq.ExpirationDate,
		CVC:              paymentReq.CVC,
		Success:          true,
	}

	return c.JSON(http.StatusOK, payment)
}
