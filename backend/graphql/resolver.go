package graphql

import (
	storage_go "github.com/supabase-community/storage-go"
	"gorm.io/gorm"
)

type Resolver struct {
	DB             *gorm.DB
	Storage        *storage_go.Client
	CachedTwClient *CachedTwClient
}
