package mock

import (
	"github.com/nharu-0630/bluebird/model"
	"github.com/oklog/ulid/v2"
)

func MockShelfCategory() []model.ShelfCategory {
	return []model.ShelfCategory{
		{Ulid: ulid.Make().String(), Name: "同人誌"},
		{Ulid: ulid.Make().String(), Name: "漫画"},
	}
}

func MockShelfTag() []model.ShelfTag {
	return []model.ShelfTag{
		{Ulid: ulid.Make().String(), Name: "１次創作"},
		{Ulid: ulid.Make().String(), Name: "２次創作"},
	}
}

func MockShelfLocation() []model.ShelfLocation {
	return []model.ShelfLocation{
		{Ulid: ulid.Make().String(), Name: "同人誌ボックス"},
		{Ulid: ulid.Make().String(), Name: "本棚"},
	}
}
