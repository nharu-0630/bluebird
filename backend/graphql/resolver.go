package graphql

import (
	"github.com/nharu-0630/bluebird/pipe"
	"gorm.io/gorm"
)

type Resolver struct {
	DB        *gorm.DB
	ShStorage *pipe.Storage
	TwPipe    *TwPipe
	PoPipe    *PoPipe
}
