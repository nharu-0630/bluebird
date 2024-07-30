package graphql

import (
	"github.com/nharu-0630/bluebird/api/twitter"
	storage_go "github.com/supabase-community/storage-go"
	"gorm.io/gorm"
)

type Resolver struct {
	DB            *gorm.DB
	Storage       *storage_go.Client
	TwitterClient *twitter.Client
}
