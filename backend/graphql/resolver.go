package graphql

import (
	"github.com/nharu-0630/bluebird/api/poipiku"
	storage_go "github.com/supabase-community/storage-go"
	"gorm.io/gorm"
)

type Resolver struct {
	DB       *gorm.DB
	Storage  *storage_go.Client
	TwPipe   *TwPipe
	PoClient *poipiku.Client
}
