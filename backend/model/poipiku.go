package model

import (
	"time"

	"gorm.io/gorm"
)

type PoIllust struct {
	ID            string `gorm:"primaryKey;not null"`
	UserID        string
	UserCreatedAt time.Time
	User          PoUser
	CreatedAt     time.Time `gorm:"primaryKey;not null"`
	UpdatedAt     time.Time
	DeletedAt     gorm.DeletedAt  `gorm:"index"`
	Category      string          `gorm:"not null"`
	Description   string          `gorm:"not null"`
	Images        []PoIllustImage `gorm:"many2many:po_illust_images;"`
}

type PoUser struct {
	ID                string    `gorm:"primaryKey;not null"`
	CreatedAt         time.Time `gorm:"primaryKey;not null"`
	UpdatedAt         time.Time
	DeletedAt         gorm.DeletedAt `gorm:"index"`
	Name              string         `gorm:"not null"`
	ImageRelativePath string         `gorm:"not null"`
	ImageOriginalName string         `gorm:"not null"`
	ImageSHAKE256     string         `gorm:"not null"`
	ExternalURL       string         `gorm:"not null"`
	Description       string         `gorm:"not null"`
	IsFollowing       bool           `gorm:"not null"`
	ItemCount         int            `gorm:"not null"`
}

type PoIllustImage struct {
	ID              int `gorm:"primaryKey;autoIncrement"`
	IllustID        string
	IllustCreatedAt time.Time
	CreatedAt       time.Time
	UpdatedAt       time.Time
	DeletedAt       gorm.DeletedAt `gorm:"index"`
	RelativePath    string         `gorm:"not null"`
	OriginalName    string         `gorm:"not null"`
	SHAKE256        string         `gorm:"not null"`
}
