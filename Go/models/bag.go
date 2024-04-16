package models

import "gorm.io/gorm"

type Bag struct {
	gorm.Model
	Name      string `json:"name"`
	ProductID int    `json:"productID"`
	Amount    int    `json:"amount"`
}
