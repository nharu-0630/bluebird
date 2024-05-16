package twitter

import (
	"encoding/json"

	"github.com/xyzyxJP/bluebird/src/api/twitter/model"
)

func ParseTweet(data map[string]interface{}) (model.Tweet, error) {
	encodedResult, err := json.Marshal(data)
	if err != nil {
		return model.Tweet{}, err
	}
	var tweet model.Tweet
	err = json.Unmarshal(encodedResult, &tweet)
	if err != nil {
		return model.Tweet{}, err
	}
	return tweet, nil
}

func ParseUser(data map[string]interface{}) (model.User, error) {
	encodedResult, err := json.Marshal(data)
	if err != nil {
		return model.User{}, err
	}
	var user model.User
	err = json.Unmarshal(encodedResult, &user)
	if err != nil {
		return model.User{}, err
	}
	return user, nil
}
