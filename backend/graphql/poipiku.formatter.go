package graphql

import (
	"github.com/nharu-0630/bluebird/api/poipiku/model"
	"github.com/nharu-0630/bluebird/tools"
)

func FormatIllust(illust model.Illust) PoIllust {
	imageURLs := make([]string, len(*illust.Images))
	for i, image := range *illust.Images {
		imageURLs[i] = image.URL
	}
	return PoIllust{
		ID: illust.ID,
		User: &PoUser{
			ID:          illust.User.ID,
			Name:        illust.User.Name,
			ImageURL:    illust.User.Image.URL,
			ExternalURL: illust.User.ExternalURL,
			Description: illust.User.Description,
			IsFollowing: illust.User.IsFollowing,
			Emojis:      illust.User.Emojis,
			ItemCount:   illust.User.ItemCount,
		},
		Category:    illust.Category,
		Description: illust.Description,
		ImageURLs:   imageURLs,
	}
}

func FormatIllusts(illusts model.Illusts) PoIllusts {
	return PoIllusts{
		User: &PoUser{
			ID:          illusts.User.ID,
			Name:        illusts.User.Name,
			ImageURL:    illusts.User.Image.URL,
			ExternalURL: illusts.User.ExternalURL,
			Description: illusts.User.Description,
			IsFollowing: illusts.User.IsFollowing,
			Emojis:      illusts.User.Emojis,
			ItemCount:   illusts.User.ItemCount,
		},
		PinnedIllusts: tools.FormatItems(illusts.PinnedIllusts, func(illust model.Illust) PoIllust {
			return PoIllust{
				ID:          illust.ID,
				Category:    illust.Category,
				Description: illust.Description,
			}
		}),
		Illusts: tools.FormatItems(illusts.Illusts, func(illust model.Illust) PoIllust {
			return PoIllust{
				ID:          illust.ID,
				Category:    illust.Category,
				Description: illust.Description,
			}
		}),
		HasNext: illusts.HasNext,
	}
}
