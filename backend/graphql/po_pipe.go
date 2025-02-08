package graphql

import (
	"encoding/hex"
	"path/filepath"
	"strconv"
	"time"

	"github.com/nharu-0630/bluebird/api/poipiku"
	api_model "github.com/nharu-0630/bluebird/api/poipiku/model"
	"github.com/nharu-0630/bluebird/config"
	"github.com/nharu-0630/bluebird/model"
	"github.com/nharu-0630/bluebird/pipe"
	"github.com/nharu-0630/bluebird/tools"
	"golang.org/x/crypto/sha3"
	"gorm.io/gorm"
)

type PoPipe struct {
	DB      *gorm.DB
	Storage *pipe.Storage
	Client  *poipiku.Client
}

func NewPoPipe(db *gorm.DB, storage *pipe.Storage, client *poipiku.Client) *PoPipe {
	return &PoPipe{
		DB:      db,
		Storage: storage,
		Client:  client,
	}
}

func (p *PoPipe) fetchUser(user api_model.User) (*model.PoUser, error) {
	relativePath := config.PoipikuUserKeyName + "/" + user.ID + "_" + time.Now().Format("20060102150405") + filepath.Ext(user.Image.URL)
	image, err := p.uploadIllustImage(relativePath, &user.Image)
	if err != nil {
		return nil, err
	}
	poUser := model.PoUser{
		ID:                user.ID,
		Name:              user.Name,
		ImageRelativePath: image.RelativePath,
		ImageOriginalName: image.OriginalName,
		ImageSHAKE256:     image.SHAKE256,
		ExternalURL:       user.ExternalURL,
		Description:       user.Description,
		IsFollowing:       user.IsFollowing,
		ItemCount:         user.ItemCount,
	}
	if err := p.DB.Create(&poUser).Error; err != nil {
		return nil, err
	}
	return &poUser, nil
}

func (p *PoPipe) fetchIllust(illust api_model.Illust, poUser model.PoUser) (*model.PoIllust, error) {
	poIllust := model.PoIllust{
		ID:            illust.ID,
		UserID:        poUser.ID,
		UserCreatedAt: poUser.CreatedAt,
		Category:      illust.Category,
		Description:   illust.Description,
	}
	tx := p.DB.Begin()
	if err := tx.Create(&poIllust).Error; err != nil {
		tx.Rollback()
		return nil, err
	}
	poIllust.Images = make([]model.PoIllustImage, len(*illust.Images))
	for idx, illustImage := range *illust.Images {
		relativePath := config.PoipikuIllustKeyName + "/" + illust.ID + "_" + poIllust.CreatedAt.Format("20060102150405") + "_" + strconv.Itoa(idx) + filepath.Ext(illustImage.URL)
		image, err := p.uploadIllustImage(relativePath, &illustImage)
		if err != nil {
			return nil, err
		}
		image.IllustID = poIllust.ID
		image.IllustCreatedAt = poIllust.CreatedAt
		poIllust.Images[idx] = *image
	}
	if err := tx.Create(&poIllust.Images).Error; err != nil {
		tx.Rollback()
		return nil, err
	}
	if err := tx.Commit().Error; err != nil {
		return nil, err
	}
	return &poIllust, nil
}

func (p *PoPipe) FetchIllust(userID string, illustID string, password string) (*PoIllust, error) {
	illust, err := p.Client.FetchIllust(userID, illustID, password)
	if err != nil {
		return nil, err
	}
	poUser, err := p.fetchUser(*illust.User)
	if err != nil {
		return nil, err
	}
	poIllust, err := p.fetchIllust(*illust, *poUser)
	if err != nil {
		return nil, err
	}
	imageURLs := make([]string, len(poIllust.Images))
	for i, image := range poIllust.Images {
		imageURLs[i] = p.Storage.GetPublicUrl(image.RelativePath)
	}
	return &PoIllust{
			ID:          poIllust.ID,
			Category:    poIllust.Category,
			Description: poIllust.Description,
			ImageURLs:   imageURLs},
		nil
}

func (p *PoPipe) uploadIllustImage(relativePath string, illustImage *api_model.IllustImage) (*model.PoIllustImage, error) {
	_, err := p.Storage.UploadBytes(relativePath, illustImage.Data)
	if err != nil {
		return nil, err
	}
	shake256 := sha3.Sum256(illustImage.Data)
	return &model.PoIllustImage{
		RelativePath: relativePath,
		OriginalName: illustImage.URL,
		SHAKE256:     hex.EncodeToString(shake256[:]),
	}, nil
}

func (p *PoPipe) FetchIllusts(userID string, pageIdx int) (*PoIllusts, error) {
	illusts, err := p.Client.FetchIllusts(userID, pageIdx)
	if err != nil {
		return nil, err
	}
	poUser, err := p.fetchUser(illusts.User)
	if err != nil {
		return nil, err
	}
	return &PoIllusts{
		User: &PoUser{
			ID:          poUser.ID,
			Name:        poUser.Name,
			ImageURL:    p.Storage.GetPublicUrl(poUser.ImageRelativePath),
			ExternalURL: poUser.ExternalURL,
			Description: poUser.Description,
			IsFollowing: poUser.IsFollowing,
			ItemCount:   poUser.ItemCount,
		},
		PinnedIllusts: tools.FormatItems(illusts.PinnedIllusts, func(illust api_model.Illust) PoIllust {
			return PoIllust{
				ID:          illust.ID,
				Category:    illust.Category,
				Description: illust.Description,
			}
		}),
		Illusts: tools.FormatItems(illusts.Illusts, func(illust api_model.Illust) PoIllust {
			return PoIllust{
				ID:          illust.ID,
				Category:    illust.Category,
				Description: illust.Description,
			}
		}),
		HasNext: illusts.HasNext,
	}, nil
}
