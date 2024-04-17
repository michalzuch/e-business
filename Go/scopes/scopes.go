package scopes

import "gorm.io/gorm"

func WithProduct(db *gorm.DB) *gorm.DB {
	return db.Preload("Products")
}

func WithCategory(db *gorm.DB) *gorm.DB {
	return db.Preload("Category")
}

func WithPriceGreaterThan(price int) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where("price > ?", price)
	}
}

func WithPriceLessThan(price int) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where("price < ?", price)
	}
}
