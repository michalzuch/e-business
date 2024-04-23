package models

type Payment struct {
	Name             string `json:"name"`
	CreditCardNumber string `json:"credit_card_number"`
	ExpirationDate   string `json:"expiration_date"`
	CVC              uint16 `json:"cvc"`
	Success          bool   `json:"success"`
}
