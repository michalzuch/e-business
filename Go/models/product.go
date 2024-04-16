package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Name        string   `json:"name"`
	Description string   `json:"description"`
	Price       float32  `json:"price"`
	Stock       int      `json:"stock"`
	CategoryID  uint     `json:"category"`
	Category    Category `gorm:"foreignKey:CategoryID"`
}
