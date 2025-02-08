package graphql

import (
	"bytes"
	"mime"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/nharu-0630/bluebird/api/poipiku"
	api_model "github.com/nharu-0630/bluebird/api/poipiku/model"
	"github.com/nharu-0630/bluebird/config"
	"github.com/nharu-0630/bluebird/model"
	"github.com/nharu-0630/bluebird/tools"
	storage_go "github.com/supabase-community/storage-go"
	"gorm.io/gorm"
)

type PoPipe struct {
	DB      *gorm.DB
	Storage *storage_go.Client
	Client  *poipiku.Client
}

func NewPoPipe(db *gorm.DB, storage *storage_go.Client, client *poipiku.Client) *PoPipe {
	return &PoPipe{
		DB:      db,
		Storage: storage,
		Client:  client,
	}
}

func (p *PoPipe) fetchUser(user api_model.User) (*model.PoUser, error) {
	image, err := p.uploadIllustImage(&user.Image, config.PoipikuUserKeyName, user.ID+"_"+time.Now().Format("20060102150405"))
	if err != nil {
		return nil, err
	}
	poUser := model.PoUser{
		ID:                user.ID,
		Name:              user.Name,
		ImageBucket:       image.Bucket,
		ImageKey:          image.Key,
		ImageName:         image.Name,
		ImageOriginalName: image.OriginalName,
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
		image, err := p.uploadIllustImage(&illustImage, config.PoipikuIllustKeyName, illust.ID+"_"+poIllust.CreatedAt.Format("20060102150405")+"_"+strconv.Itoa(idx))
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
		imageURLs[i] = strings.ReplaceAll(p.Storage.GetPublicUrl(config.PoipikuBucketName, image.Key+"/"+image.Name).SignedURL, os.Getenv("SUPABASE_INTERNAL_URL"), os.Getenv("HOST_NAME")+":"+os.Getenv("HOST_PORT")+"/supabase")
	}
	return &PoIllust{
			ID:          poIllust.ID,
			Category:    poIllust.Category,
			Description: poIllust.Description,
			ImageURLs:   imageURLs},
		nil
}

func (p *PoPipe) uploadIllustImage(illustImage *api_model.IllustImage, key string, name string) (*model.PoIllustImage, error) {
	ext := "." + strings.Split(illustImage.URL, ".")[len(strings.Split(illustImage.URL, "."))-1]
	filename := key + "/" + name + ext
	contentType := mime.TypeByExtension(ext)
	_, err := p.Storage.UploadFile(config.PoipikuBucketName, filename, bytes.NewReader(illustImage.Data), storage_go.FileOptions{
		ContentType: &contentType,
	})
	if err != nil {
		return nil, err
	}
	return &model.PoIllustImage{
		Bucket:       config.PoipikuBucketName,
		Key:          key,
		Name:         name + ext,
		OriginalName: illustImage.URL,
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
			ImageURL:    strings.ReplaceAll(p.Storage.GetPublicUrl(config.PoipikuBucketName, poUser.ImageKey+"/"+poUser.ImageName).SignedURL, os.Getenv("SUPABASE_INTERNAL_URL"), os.Getenv("HOST_NAME")+":"+os.Getenv("HOST_PORT")+"/supabase"),
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
