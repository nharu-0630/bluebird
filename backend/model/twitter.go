package model

import (
	"time"

	"gorm.io/datatypes"
)

type TwUser struct {
	ID        string                                     `gorm:"primaryKey;not null"`
	CreatedAt time.Time                                  `gorm:"primaryKey;autoCreateTime"`
	Response  datatypes.JSONType[map[string]interface{}] `gorm:"type:jsonb;not null"`
}

type TwTweet struct {
	ID        string                                     `gorm:"primaryKey;not null"`
	CreatedAt time.Time                                  `gorm:"primaryKey;autoCreateTime"`
	Response  datatypes.JSONType[map[string]interface{}] `gorm:"type:jsonb;not null"`
}

type TwQueryCache struct {
	ID        int                                        `gorm:"primaryKey;autoIncrement"`
	QueryName string                                     `gorm:"primaryKey;not null"`
	CreatedAt time.Time                                  `gorm:"primaryKey;autoCreateTime"`
	Args      datatypes.JSONType[map[string]interface{}] `gorm:"type:jsonb;not null"`
	Response  datatypes.JSONType[map[string]interface{}] `gorm:"type:jsonb;not null"`
}
