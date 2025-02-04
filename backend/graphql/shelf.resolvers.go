package graphql

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.45

import (
	"context"
	"os"
	"strings"

	"github.com/99designs/gqlgen/graphql"
	"github.com/nharu-0630/bluebird/config"
	"github.com/nharu-0630/bluebird/model"
	ulid_v2 "github.com/oklog/ulid/v2"
	storage_go "github.com/supabase-community/storage-go"
)

// CreateShelfItem is the resolver for the createShelfItem field.
func (r *mutationResolver) CreateShelfItem(ctx context.Context, name string, categoryUlid string, tagsUlid []string, locationUlid string, description string) (*ShelfItem, error) {
	tx := r.DB.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()
	var shelfCategory model.ShelfCategory
	if err := tx.Where("ulid = ?", categoryUlid).First(&shelfCategory).Error; err != nil {
		tx.Rollback()
		return nil, err
	}
	var shelfTags []model.ShelfTag
	var parsedShelfTags []*ShelfTag
	if err := tx.Where("ulid IN (?)", tagsUlid).Find(&shelfTags).Error; err != nil {
		tx.Rollback()
		return nil, err
	}
	for _, shelfTag := range shelfTags {
		parsedShelfTags = append(parsedShelfTags, &ShelfTag{Ulid: shelfTag.Ulid, Name: shelfTag.Name})
	}
	var shelfLocation model.ShelfLocation
	if err := tx.Where("ulid = ?", locationUlid).First(&shelfLocation).Error; err != nil {
		tx.Rollback()
		return nil, err
	}
	ulid := config.ShelfItemIDPrefix + ulid_v2.Make().String()
	shelfItem := model.ShelfItem{
		Ulid:         ulid,
		Name:         name,
		CategoryUlid: shelfCategory.Ulid,
		Tags:         shelfTags,
		LocationUlid: shelfLocation.Ulid,
		Description:  description,
	}
	if err := tx.Create(&shelfItem).Error; err != nil {
		tx.Rollback()
		return nil, err
	}
	if err := tx.Model(&shelfItem).Association("Tags").Append(&shelfTags); err != nil {
		tx.Rollback()
		return nil, err
	}
	if err := tx.Commit().Error; err != nil {
		return nil, err
	}
	return &ShelfItem{
		Ulid:        ulid,
		Name:        name,
		Category:    &ShelfCategory{Ulid: categoryUlid, Name: shelfCategory.Name},
		Tags:        parsedShelfTags,
		Location:    &ShelfLocation{Ulid: locationUlid, Name: shelfLocation.Name},
		Description: description,
	}, nil
}

// UpdateShelfItem is the resolver for the updateShelfItem field.
func (r *mutationResolver) UpdateShelfItem(ctx context.Context, ulid string, name *string, categoryUlid *string, tagsUlid []string, locationUlid *string, description *string) (*ShelfItem, error) {
	var shelfItem model.ShelfItem
	tx := r.DB.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()
	if err := tx.Where("ulid = ?", ulid).First(&shelfItem).Error; err != nil {
		tx.Rollback()
		return nil, err
	}
	if name != nil {
		shelfItem.Name = *name
	}
	if categoryUlid != nil {
		var shelfCategory model.ShelfCategory
		if err := tx.Where("ulid = ?", *categoryUlid).First(&shelfCategory).Error; err != nil {
			tx.Rollback()
			return nil, err
		}
		shelfItem.CategoryUlid = shelfCategory.Ulid
	}
	if tagsUlid != nil {
		var shelfTags []model.ShelfTag
		if err := tx.Where("ulid IN (?)", tagsUlid).Find(&shelfTags).Error; err != nil {
			tx.Rollback()
			return nil, err
		}
		if err := tx.Model(&shelfItem).Association("Tags").Replace(&shelfTags); err != nil {
			tx.Rollback()
			return nil, err
		}
	}
	if locationUlid != nil {
		var shelfLocation model.ShelfLocation
		if err := tx.Where("ulid = ?", *locationUlid).First(&shelfLocation).Error; err != nil {
			tx.Rollback()
			return nil, err
		}
		shelfItem.LocationUlid = shelfLocation.Ulid
	}
	if description != nil {
		shelfItem.Description = *description
	}
	if err := tx.Save(&shelfItem).Error; err != nil {
		tx.Rollback()
		return nil, err
	}
	if err := tx.Model(&shelfItem).Preload("Category").Preload("Tags").Preload("Location").Find(&shelfItem).Error; err != nil {
		tx.Rollback()
		return nil, err
	}
	if err := tx.Commit().Error; err != nil {
		return nil, err
	}
	var parsedTags []*ShelfTag
	for _, tag := range shelfItem.Tags {
		parsedTags = append(parsedTags, &ShelfTag{Ulid: tag.Ulid, Name: tag.Name})
	}
	return &ShelfItem{
		Ulid:        ulid,
		Name:        shelfItem.Name,
		Category:    &ShelfCategory{Ulid: shelfItem.Category.Ulid, Name: shelfItem.Category.Name},
		Tags:        parsedTags,
		Location:    &ShelfLocation{Ulid: shelfItem.Location.Ulid, Name: shelfItem.Location.Name},
		Description: shelfItem.Description,
	}, nil
}

// DeleteShelfItem is the resolver for the deleteShelfItem field.
func (r *mutationResolver) DeleteShelfItem(ctx context.Context, ulid string) (bool, error) {
	if err := r.DB.Where("ulid = ?", ulid).Delete(&model.ShelfItem{}).Error; err != nil {
		return false, err
	}
	return true, nil
}

// RestoreShelfItem is the resolver for the restoreShelfItem field.
func (r *mutationResolver) RestoreShelfItem(ctx context.Context, ulid string) (bool, error) {
	if err := r.DB.Unscoped().Where("ulid = ?", ulid).First(&model.ShelfItem{}).Error; err != nil {
		return false, err
	}
	if err := r.DB.Unscoped().Model(&model.ShelfItem{}).Where("ulid = ?", ulid).Update("deleted_at", nil).Error; err != nil {
		return false, err
	}
	return true, nil
}

// ForceDeleteShelfItem is the resolver for the forceDeleteShelfItem field.
func (r *mutationResolver) ForceDeleteShelfItem(ctx context.Context, ulid string) (bool, error) {
	var shelfItem model.ShelfItem
	if err := r.DB.Unscoped().Where("ulid = ?", ulid).First(&shelfItem).Error; err != nil {
		return false, err
	}
	if err := r.DB.Unscoped().Model(&shelfItem).Association("Tags").Unscoped().Clear(); err != nil {
		return false, err
	}
	if err := r.DB.Unscoped().Where("ulid = ?", ulid).Delete(&model.ShelfItem{}).Error; err != nil {
		return false, err
	}
	return true, nil
}

// CreateShelfCategory is the resolver for the createShelfCategory field.
func (r *mutationResolver) CreateShelfCategory(ctx context.Context, name string) (*ShelfCategory, error) {
	ulid := config.ShelfCategoryIDPrefix + ulid_v2.Make().String()
	shelfCategory := model.ShelfCategory{Ulid: ulid, Name: name}
	if err := r.DB.Create(&shelfCategory).Error; err != nil {
		return nil, err
	}
	return &ShelfCategory{Ulid: shelfCategory.Ulid, Name: shelfCategory.Name}, nil
}

// UpdateShelfCategory is the resolver for the updateShelfCategory field.
func (r *mutationResolver) UpdateShelfCategory(ctx context.Context, ulid string, name *string) (*ShelfCategory, error) {
	if err := r.DB.Model(&model.ShelfCategory{}).Where("ulid = ?", ulid).Update("name", name).Error; err != nil {
		return nil, err
	}
	return &ShelfCategory{Ulid: ulid, Name: *name}, nil
}

// DeleteShelfCategory is the resolver for the deleteShelfCategory field.
func (r *mutationResolver) DeleteShelfCategory(ctx context.Context, ulid string) (bool, error) {
	var shelfCategory model.ShelfCategory
	if err := r.DB.Where("ulid = ?", ulid).First(&shelfCategory).Error; err != nil {
		return false, err
	}
	var count int64
	if err := r.DB.Model(&model.ShelfItem{}).Where("category_ulid = ?", shelfCategory.Ulid).Count(&count).Error; err != nil {
		return false, err
	}
	if count > 0 {
		return false, nil
	}
	if err := r.DB.Unscoped().Where("ulid = ?", ulid).Delete(&model.ShelfCategory{}).Error; err != nil {
		return false, err
	}
	return true, nil
}

// CreateShelfTag is the resolver for the createShelfTag field.
func (r *mutationResolver) CreateShelfTag(ctx context.Context, name string) (*ShelfTag, error) {
	ulid := config.ShelfTagIDPrefix + ulid_v2.Make().String()
	shelfTag := model.ShelfTag{Ulid: ulid, Name: name}
	if err := r.DB.Create(&shelfTag).Error; err != nil {
		return nil, err
	}
	return &ShelfTag{Ulid: shelfTag.Ulid, Name: shelfTag.Name}, nil
}

// UpdateShelfTag is the resolver for the updateShelfTag field.
func (r *mutationResolver) UpdateShelfTag(ctx context.Context, ulid string, name *string) (*ShelfTag, error) {
	if err := r.DB.Model(&model.ShelfTag{}).Where("ulid = ?", ulid).Update("name", name).Error; err != nil {
		return nil, err
	}
	return &ShelfTag{Ulid: ulid, Name: *name}, nil
}

// DeleteShelfTag is the resolver for the deleteShelfTag field.
func (r *mutationResolver) DeleteShelfTag(ctx context.Context, ulid string) (bool, error) {
	var shelfTag model.ShelfTag
	if err := r.DB.Where("ulid = ?", ulid).First(&shelfTag).Error; err != nil {
		return false, err
	}
	var count int64
	if err := r.DB.Model(&model.ShelfItem{}).Joins("JOIN shelf_item_tags ON shelf_items.ulid = shelf_item_tags.shelf_item_ulid").Where("shelf_item_tags.shelf_tag_ulid = ?", shelfTag.Ulid).Count(&count).Error; err != nil {
		return false, err
	}
	if count > 0 {
		return false, nil
	}
	if err := r.DB.Unscoped().Where("ulid = ?", ulid).Delete(&model.ShelfTag{}).Error; err != nil {
		return false, err
	}
	return true, nil
}

// CreateShelfLocation is the resolver for the createShelfLocation field.
func (r *mutationResolver) CreateShelfLocation(ctx context.Context, name string) (*ShelfLocation, error) {
	ulid := config.ShelfLocationIDPrefix + ulid_v2.Make().String()
	shelfLocation := model.ShelfLocation{Ulid: ulid, Name: name}
	if err := r.DB.Create(&shelfLocation).Error; err != nil {
		return nil, err
	}
	return &ShelfLocation{Ulid: shelfLocation.Ulid, Name: shelfLocation.Name}, nil
}

// UpdateShelfLocation is the resolver for the updateShelfLocation field.
func (r *mutationResolver) UpdateShelfLocation(ctx context.Context, ulid string, name *string) (*ShelfLocation, error) {
	if err := r.DB.Model(&model.ShelfLocation{}).Where("ulid = ?", ulid).Update("name", name).Error; err != nil {
		return nil, err
	}
	return &ShelfLocation{Ulid: ulid, Name: *name}, nil
}

// DeleteShelfLocation is the resolver for the deleteShelfLocation field.
func (r *mutationResolver) DeleteShelfLocation(ctx context.Context, ulid string) (bool, error) {
	var shelfLocation model.ShelfLocation
	if err := r.DB.Where("ulid = ?", ulid).First(&shelfLocation).Error; err != nil {
		return false, err
	}
	var count int64
	if err := r.DB.Model(&model.ShelfItem{}).Where("location_ulid = ?", shelfLocation.Ulid).Count(&count).Error; err != nil {
		return false, err
	}
	if count > 0 {
		return false, nil
	}
	if err := r.DB.Unscoped().Where("ulid = ?", ulid).Delete(&model.ShelfLocation{}).Error; err != nil {
		return false, err
	}
	return true, nil
}

// AddShelfItemImage is the resolver for the addShelfItemImage field.
func (r *mutationResolver) AddShelfItemImage(ctx context.Context, ulid string, file graphql.Upload) (*BucketFile, error) {
	fileUlid := config.ShelfImageIDPrefix + ulid_v2.Make().String()
	ext := file.Filename[strings.LastIndex(file.Filename, "."):]
	filename := config.ShelfItemKeyName + "/" + ulid + "/" + fileUlid + ext
	_, err := r.Storage.UploadFile(config.ShelfBucketName, filename, file.File, storage_go.FileOptions{
		ContentType: &file.ContentType,
	})
	if err != nil {
		return nil, err
	}
	var shelfItem model.ShelfItem
	if err := r.DB.Where("ulid = ?", ulid).First(&shelfItem).Error; err != nil {
		return nil, err
	}
	newImage := model.BucketFile{
		Ulid:         fileUlid,
		Bucket:       config.ShelfBucketName,
		Key:          config.ShelfItemKeyName,
		Name:         fileUlid + ext,
		OriginalName: file.Filename,
	}
	if err := r.DB.Model(&shelfItem).Association("Images").Append(&newImage); err != nil {
		return nil, err
	}
	return &BucketFile{
		Ulid:      fileUlid,
		Bucket:    config.ShelfBucketName,
		Key:       config.ShelfItemKeyName,
		Name:      file.Filename,
		SignedURL: strings.ReplaceAll(r.Storage.GetPublicUrl(config.ShelfBucketName, filename).SignedURL, os.Getenv("SUPABASE_INTERNAL_URL"), os.Getenv("SUPABASE_EXTERNAL_URL")),
	}, nil
}

// RemoveShelfItemImage is the resolver for the removeShelfItemImage field.
func (r *mutationResolver) RemoveShelfItemImage(ctx context.Context, ulid string, fileUlid string) (bool, error) {
	var shelfItem model.ShelfItem
	if err := r.DB.Where("ulid = ?", ulid).First(&shelfItem).Error; err != nil {
		return false, err
	}
	var image model.BucketFile
	if err := r.DB.Model(&shelfItem).Association("Images").Find(&image, "ulid = ?", fileUlid); err != nil {
		return false, err
	}
	filename := config.ShelfItemKeyName + "/" + ulid + "/" + image.Name
	if _, err := r.Storage.RemoveFile(config.ShelfBucketName, []string{filename}); err != nil {
		return false, err
	}
	if err := r.DB.Model(&shelfItem).Association("Images").Delete(&image); err != nil {
		return false, err
	}
	return true, nil
}

// ShelfItems is the resolver for the shelfItems field.
func (r *queryResolver) ShelfItems(ctx context.Context) ([]*ShelfItem, error) {
	var shelfItems []model.ShelfItem
	if err := r.DB.Preload("Category").Preload("Tags").Preload("Location").Preload("Images").Find(&shelfItems).Error; err != nil {
		return nil, err
	}
	parsedShelfItems := make([]*ShelfItem, len(shelfItems))
	for i, shelfItem := range shelfItems {
		parsedShelfItems[i] = &ShelfItem{
			Ulid:        shelfItem.Ulid,
			Name:        shelfItem.Name,
			Category:    &ShelfCategory{Ulid: shelfItem.Category.Ulid, Name: shelfItem.Category.Name},
			Description: shelfItem.Description,
			Location:    &ShelfLocation{Ulid: shelfItem.Location.Ulid, Name: shelfItem.Location.Name},
		}
		parsedTags := make([]*ShelfTag, len(shelfItem.Tags))
		for j, tag := range shelfItem.Tags {
			parsedTags[j] = &ShelfTag{Ulid: tag.Ulid, Name: tag.Name}
		}
		parsedShelfItems[i].Tags = parsedTags
		parsedFiles := make([]*BucketFile, len(shelfItem.Images))
		for j, image := range shelfItem.Images {
			filename := config.ShelfItemKeyName + "/" + shelfItem.Ulid + "/" + image.Name
			parsedFiles[j] = &BucketFile{
				Ulid:         image.Ulid,
				Bucket:       image.Bucket,
				Key:          image.Key,
				Name:         image.Name,
				OriginalName: image.OriginalName,
				SignedURL:    strings.ReplaceAll(r.Storage.GetPublicUrl(image.Bucket, filename).SignedURL, os.Getenv("SUPABASE_INTERNAL_URL"), os.Getenv("SUPABASE_EXTERNAL_URL")),
			}
		}
		parsedShelfItems[i].Images = parsedFiles
	}
	return parsedShelfItems, nil
}

// ShelfItem is the resolver for the shelfItem field.
func (r *queryResolver) ShelfItem(ctx context.Context, ulid string) (*ShelfItem, error) {
	var shelfItem model.ShelfItem
	if err := r.DB.Where("ulid = ?", ulid).Preload("Category").Preload("Tags").Preload("Location").Preload("Images").First(&shelfItem).Error; err != nil {
		return nil, err
	}
	parsedShelfItem := &ShelfItem{
		Ulid:        shelfItem.Ulid,
		Name:        shelfItem.Name,
		Category:    &ShelfCategory{Ulid: shelfItem.Category.Ulid, Name: shelfItem.Category.Name},
		Description: shelfItem.Description,
		Location:    &ShelfLocation{Ulid: shelfItem.Location.Ulid, Name: shelfItem.Location.Name},
	}
	parsedTags := make([]*ShelfTag, len(shelfItem.Tags))
	for i, tag := range shelfItem.Tags {
		parsedTags[i] = &ShelfTag{Ulid: tag.Ulid, Name: tag.Name}
	}
	parsedShelfItem.Tags = parsedTags
	parsedFiles := make([]*BucketFile, len(shelfItem.Images))
	for i, image := range shelfItem.Images {
		filename := config.ShelfItemKeyName + "/" + shelfItem.Ulid + "/" + image.Name
		parsedFiles[i] = &BucketFile{
			Bucket:    image.Bucket,
			Key:       image.Key,
			Name:      image.Name,
			SignedURL: strings.ReplaceAll(r.Storage.GetPublicUrl(image.Bucket, filename).SignedURL, os.Getenv("SUPABASE_INTERNAL_URL"), os.Getenv("SUPABASE_EXTERNAL_URL")),
		}
	}
	parsedShelfItem.Images = parsedFiles
	return parsedShelfItem, nil
}

// DeletedShelfItems is the resolver for the deletedShelfItems field.
func (r *queryResolver) DeletedShelfItems(ctx context.Context) ([]*ShelfItem, error) {
	shelfItems := []model.ShelfItem{}
	if err := r.DB.Unscoped().Where("deleted_at IS NOT NULL").Preload("Category").Preload("Tags").Preload("Location").Find(&shelfItems).Error; err != nil {
		return nil, err
	}
	parsedShelfItems := make([]*ShelfItem, len(shelfItems))
	for i, shelfItem := range shelfItems {
		parsedShelfItems[i] = &ShelfItem{
			Ulid:        shelfItem.Ulid,
			Name:        shelfItem.Name,
			Category:    &ShelfCategory{Ulid: shelfItem.Category.Ulid, Name: shelfItem.Category.Name},
			Description: shelfItem.Description,
			Location:    &ShelfLocation{Ulid: shelfItem.Location.Ulid, Name: shelfItem.Location.Name},
		}
		parsedTags := make([]*ShelfTag, len(shelfItem.Tags))
		for j, tag := range shelfItem.Tags {
			parsedTags[j] = &ShelfTag{Ulid: tag.Ulid, Name: tag.Name}
		}
		parsedShelfItems[i].Tags = parsedTags
	}
	return parsedShelfItems, nil
}

// DeletedShelfItem is the resolver for the deletedShelfItem field.
func (r *queryResolver) DeletedShelfItem(ctx context.Context, ulid string) (*ShelfItem, error) {
	var shelfItem model.ShelfItem
	if err := r.DB.Unscoped().Where("ulid = ?", ulid).Preload("Category").Preload("Tags").Preload("Location").First(&shelfItem).Error; err != nil {
		return nil, err
	}
	parsedShelfItem := &ShelfItem{
		Ulid:        shelfItem.Ulid,
		Name:        shelfItem.Name,
		Category:    &ShelfCategory{Ulid: shelfItem.Category.Ulid, Name: shelfItem.Category.Name},
		Description: shelfItem.Description,
		Location:    &ShelfLocation{Ulid: shelfItem.Location.Ulid, Name: shelfItem.Location.Name},
	}
	parsedTags := make([]*ShelfTag, len(shelfItem.Tags))
	for i, tag := range shelfItem.Tags {
		parsedTags[i] = &ShelfTag{Ulid: tag.Ulid, Name: tag.Name}
	}
	parsedShelfItem.Tags = parsedTags
	return parsedShelfItem, nil
}

// ShelfCategories is the resolver for the shelfCategories field.
func (r *queryResolver) ShelfCategories(ctx context.Context) ([]*ShelfCategory, error) {
	shelfCategories := []*model.ShelfCategory{}
	if err := r.DB.Find(&shelfCategories).Error; err != nil {
		return nil, err
	}
	var parsedShelfCategories []*ShelfCategory
	for _, shelfCategory := range shelfCategories {
		parsedShelfCategories = append(parsedShelfCategories, &ShelfCategory{Ulid: shelfCategory.Ulid, Name: shelfCategory.Name})
	}
	return parsedShelfCategories, nil
}

// ShelfCategory is the resolver for the shelfCategory field.
func (r *queryResolver) ShelfCategory(ctx context.Context, ulid string) (*ShelfCategory, error) {
	shelfCategory := model.ShelfCategory{}
	if err := r.DB.Where("ulid = ?", ulid).First(&shelfCategory).Error; err != nil {
		return nil, err
	}
	return &ShelfCategory{Ulid: shelfCategory.Ulid, Name: shelfCategory.Name}, nil
}

// ShelfTags is the resolver for the shelfTags field.
func (r *queryResolver) ShelfTags(ctx context.Context) ([]*ShelfTag, error) {
	shelfTags := []model.ShelfTag{}
	if err := r.DB.Find(&shelfTags).Error; err != nil {
		return nil, err
	}
	var parsedShelfTags []*ShelfTag
	for _, shelfTag := range shelfTags {
		parsedShelfTags = append(parsedShelfTags, &ShelfTag{Ulid: shelfTag.Ulid, Name: shelfTag.Name})
	}
	return parsedShelfTags, nil
}

// ShelfTag is the resolver for the shelfTag field.
func (r *queryResolver) ShelfTag(ctx context.Context, ulid string) (*ShelfTag, error) {
	shelfTag := model.ShelfTag{}
	if err := r.DB.Where("ulid = ?", ulid).First(&shelfTag).Error; err != nil {
		return nil, err
	}
	return &ShelfTag{Ulid: shelfTag.Ulid, Name: shelfTag.Name}, nil
}

// ShelfLocations is the resolver for the shelfLocations field.
func (r *queryResolver) ShelfLocations(ctx context.Context) ([]*ShelfLocation, error) {
	shelfLocations := []model.ShelfLocation{}
	if err := r.DB.Find(&shelfLocations).Error; err != nil {
		return nil, err
	}
	var parsedShelfLocations []*ShelfLocation
	for _, shelfLocation := range shelfLocations {
		parsedShelfLocations = append(parsedShelfLocations, &ShelfLocation{Ulid: shelfLocation.Ulid, Name: shelfLocation.Name})
	}
	return parsedShelfLocations, nil
}

// ShelfLocation is the resolver for the shelfLocation field.
func (r *queryResolver) ShelfLocation(ctx context.Context, ulid string) (*ShelfLocation, error) {
	shelfLocation := model.ShelfLocation{}
	if err := r.DB.Where("ulid = ?", ulid).First(&shelfLocation).Error; err != nil {
		return nil, err
	}
	return &ShelfLocation{Ulid: shelfLocation.Ulid, Name: shelfLocation.Name}, nil
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
