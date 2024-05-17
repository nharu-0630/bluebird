package graphql

import (
	"github.com/xyzyxJP/bluebird/src/api/twitter"
	"gorm.io/gorm"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	DB            *gorm.DB
	TwitterClient *twitter.Client
}
