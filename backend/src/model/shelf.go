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
	Name string `gorm:"unique;not null"`
}

type ShelfTag struct {
	gorm.Model
	Ulid string `gorm:"uniqueIndex;not null"`
	Name string `gorm:"unique;not null"`
}

type ShelfLocation struct {
	gorm.Model
	Ulid string `gorm:"uniqueIndex;not null"`
	Name string `gorm:"unique;not null"`
}

type ShelfItemImage struct {
	gorm.Model
	Index int    `gorm:"not null"`
	Image []byte `gorm:"not null;size:4294967295"`
}
