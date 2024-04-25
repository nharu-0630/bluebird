package model

import (
	"gorm.io/gorm"
)

type ShelfItem struct {
	gorm.Model
	Ulid        string        `gorm:"uniqueIndex;not null"`
	Name        string        `gorm:"not null"`
	CategoryID  uint          `gorm:"not null"`
	Category    ShelfCategory `gorm:"foreignKey:CategoryID"`
	Tags        []ShelfTag    `gorm:"many2many:shelf_item_tags;"`
	LocationID  uint          `gorm:"not null"`
	Location    ShelfLocation `gorm:"foreignKey:LocationID"`
	Description string        `gorm:"not null"`
}

type ShelfCategory struct {
	gorm.Model
	Ulid string `gorm:"uniqueIndex;not null"`
	Name string `gorm:"not null,unique"`
}

type ShelfTag struct {
	gorm.Model
	Ulid string `gorm:"uniqueIndex;not null"`
	Name string `gorm:"not null,unique"`
}

type ShelfLocation struct {
	gorm.Model
	Ulid string `gorm:"uniqueIndex;not null"`
	Name string `gorm:"not null,unique"`
}
