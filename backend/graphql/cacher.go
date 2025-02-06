package graphql

import (
	"github.com/nharu-0630/bluebird/api/twitter"
	api_model "github.com/nharu-0630/bluebird/api/twitter/model"
	"github.com/nharu-0630/bluebird/model"
	"github.com/nharu-0630/bluebird/tools"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type CachedTwClient struct {
	DB     *gorm.DB
	Client *twitter.Client
}

func NewCachedClient(db *gorm.DB, client *twitter.Client) *CachedTwClient {
	return &CachedTwClient{
		DB:     db,
		Client: client,
	}
}

func (c *CachedTwClient) Execute(o api_model.Operation, args map[string]interface{}) (map[string]interface{}, error) {
	data, err := c.Client.Execute(o, args)
	if err != nil {
		return nil, err
	}
	queryCache := &model.TwQueryCache{
		QueryName: o.Name,
		Args:      datatypes.NewJSONType(args),
		Response:  datatypes.NewJSONType(data),
	}
	if err := c.DB.Create(&queryCache).Error; err != nil {
		return nil, err
	}
	return data, nil
}

func (c *CachedTwClient) CacheTweet(tweet TwTweet) error {
	response, err := tools.EncodeItem(tweet)
	if err != nil {
		return err
	}
	cachedTweet := &model.TwTweet{
		ID:       *tweet.ID,
		Response: datatypes.NewJSONType(response),
	}
	if err := c.DB.Create(cachedTweet).Error; err != nil {
		return err
	}
	return nil
}

func (c *CachedTwClient) CacheTweets(tweets []*TwTweet) error {
	for _, tweet := range tweets {
		if err := c.CacheTweet(*tweet); err != nil {
			return err
		}
	}
	return nil
}

func (c *CachedTwClient) CacheUser(user TwUser) error {
	response, err := tools.EncodeItem(user)
	if err != nil {
		return err
	}
	cachedUser := &model.TwUser{
		ID:       *user.ID,
		Response: datatypes.NewJSONType(response),
	}
	if err := c.DB.Create(cachedUser).Error; err != nil {
		return err
	}
	return nil
}

func (c *CachedTwClient) CacheUsers(users []*TwUser) error {
	for _, user := range users {
		if err := c.CacheUser(*user); err != nil {
			return err
		}
	}
	return nil
}
