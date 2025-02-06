package graphql

import (
	"github.com/nharu-0630/bluebird/api/twitter"
	api_model "github.com/nharu-0630/bluebird/api/twitter/model"
	"github.com/nharu-0630/bluebird/model"
	"github.com/nharu-0630/bluebird/tools"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type TwPipe struct {
	DB      *gorm.DB
	Clients *twitter.Clients
}

func NewTwPipe(db *gorm.DB, clients *twitter.Clients) *TwPipe {
	return &TwPipe{
		DB:      db,
		Clients: clients,
	}
}

func (t *TwPipe) Execute(o api_model.Operation, args map[string]interface{}) (map[string]interface{}, error) {
	data, err := t.Clients.Execute(o, args)
	if err != nil {
		return nil, err
	}
	queryCache := &model.TwQueryCache{
		QueryName: o.Name,
		Args:      datatypes.NewJSONType(args),
		Response:  datatypes.NewJSONType(data),
	}
	if err := t.DB.Create(&queryCache).Error; err != nil {
		return nil, err
	}
	return data, nil
}

func (t *TwPipe) CacheTweet(tweet TwTweet) error {
	response, err := tools.EncodeItem(tweet)
	if err != nil {
		return err
	}
	cachedTweet := &model.TwTweet{
		ID:       *tweet.ID,
		Response: datatypes.NewJSONType(response),
	}
	if err := t.DB.Create(cachedTweet).Error; err != nil {
		return err
	}
	return nil
}

func (t *TwPipe) CacheTweets(tweets []*TwTweet) error {
	for _, tweet := range tweets {
		if err := t.CacheTweet(*tweet); err != nil {
			return err
		}
	}
	return nil
}

func (t *TwPipe) CacheUser(user TwUser) error {
	response, err := tools.EncodeItem(user)
	if err != nil {
		return err
	}
	cachedUser := &model.TwUser{
		ID:       *user.ID,
		Response: datatypes.NewJSONType(response),
	}
	if err := t.DB.Create(cachedUser).Error; err != nil {
		return err
	}
	return nil
}

func (t *TwPipe) CacheUsers(users []*TwUser) error {
	for _, user := range users {
		if err := t.CacheUser(*user); err != nil {
			return err
		}
	}
	return nil
}
