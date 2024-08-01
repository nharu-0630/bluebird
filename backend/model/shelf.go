package model

import (
	"time"

	"gorm.io/gorm"
)

type ShelfItem struct {
	Ulid         string `gorm:"primaryKey;not null"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
	DeletedAt    gorm.DeletedAt `gorm:"index"`
	Name         string         `gorm:"not null"`
	CategoryUlid string         `gorm:"not null"`
	Category     ShelfCategory  `gorm:"foreignKey:CategoryUlid"`
	Tags         []ShelfTag     `gorm:"many2many:shelf_item_tags;"`
	LocationUlid string         `gorm:"not null"`
	Location     ShelfLocation  `gorm:"foreignKey:LocationUlid"`
	Description  string         `gorm:"not null"`
	Images       []BucketFile   `gorm:"many2many:shelf_item_images;"`
}

type ShelfCategory struct {
	Ulid      string `gorm:"primaryKey;not null"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
	Name      string         `gorm:"unique;not null"`
}

type ShelfTag struct {
	Ulid      string `gorm:"primaryKey;not null"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
	Name      string         `gorm:"unique;not null"`
}

type ShelfLocation struct {
	Ulid      string `gorm:"primaryKey;not null"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
	Name      string         `gorm:"unique;not null"`
}

type BucketFile struct {
	Ulid         string `gorm:"primaryKey;not null"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
	DeletedAt    gorm.DeletedAt `gorm:"index"`
	Bucket       string         `gorm:"not null"`
	Key          string         `gorm:"not null"`
	Name         string         `gorm:"not null"`
	OriginalName string         `gorm:"not null"`
}
