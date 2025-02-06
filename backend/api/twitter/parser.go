package twitter

import (
	"errors"
	"strings"

	"github.com/mitchellh/mapstructure"
	"github.com/nharu-0630/bluebird/api/twitter/model"
)

func InstructionsToTweets(res map[string]interface{}) ([]model.Tweet, model.Cursor, error) {
	instructions := res["instructions"].([]interface{})
	var data map[string]interface{}
	for _, instruction := range instructions {
		instructionType := instruction.(map[string]interface{})["type"]
		if instructionType == "TimelineAddEntries" {
			data = instruction.(map[string]interface{})
			break
		}
	}
	if data == nil {
		return nil, model.Cursor{}, errors.New("instruction not found")
	}

	tweets := make([]model.Tweet, 0)
	resCursor := model.Cursor{}
	entries := data["entries"].([]interface{})
	for _, entry := range entries {
		content := entry.(map[string]interface{})["content"]
		entryID := entry.(map[string]interface{})["entryId"].(string)
		entryType := content.(map[string]interface{})["entryType"]
		if entryType == "TimelineTimelineItem" {
			if strings.HasPrefix(entryID, "tweet-") {
				tweetResults := content.(map[string]interface{})["itemContent"].(map[string]interface{})["tweet_results"].(map[string]interface{})
				if tweetResults["result"] == nil {
					continue
				}
				var tweet model.Tweet
				mapstructure.Decode(tweetResults["result"], &tweet)
				tweets = append(tweets, tweet)
			}
			if strings.HasPrefix(entryID, "cursor-top") {
				resCursor.TopCursor = content.(map[string]interface{})["value"].(string)
			} else if strings.HasPrefix(entryID, "cursor-bottom") {
				resCursor.BottomCursor = content.(map[string]interface{})["value"].(string)
			}
		} else if entryType == "TimelineTimelineCursor" {
			if strings.HasPrefix(entryID, "cursor-top") {
				resCursor.TopCursor = content.(map[string]interface{})["value"].(string)
			} else if strings.HasPrefix(entryID, "cursor-bottom") {
				resCursor.BottomCursor = content.(map[string]interface{})["value"].(string)
			}
		}
	}
	resCursor.IsAfterLast = len(tweets) == 0 || resCursor.BottomCursor == ""
	return tweets, resCursor, nil
}

func InstructionsToTweetsWithInjections(res map[string]interface{}) (model.Tweet, []model.Tweet, model.Cursor, error) {
	instructions := res["instructions"].([]interface{})
	var data map[string]interface{}
	for _, instruction := range instructions {
		instructionType := instruction.(map[string]interface{})["type"]
		if instructionType == "TimelineAddEntries" {
			data = instruction.(map[string]interface{})
			break
		}
	}
	if data == nil {
		return model.Tweet{}, nil, model.Cursor{}, errors.New("instruction not found")
	}

	tweets := model.Tweet{}
	conversation := make([]model.Tweet, 0)
	resCursor := model.Cursor{}
	entries := data["entries"].([]interface{})
	for _, entry := range entries {
		content := entry.(map[string]interface{})["content"]
		entryID := entry.(map[string]interface{})["entryId"].(string)
		entryType := content.(map[string]interface{})["entryType"]
		if entryType == "TimelineTimelineItem" || entryType == "TimelineTimelineModule" {
			if strings.HasPrefix(entryID, "tweet-") {
				tweetResults := content.(map[string]interface{})["itemContent"].(map[string]interface{})["tweet_results"].(map[string]interface{})
				if tweetResults["result"] == nil {
					continue
				}
				mapstructure.Decode(tweetResults["result"], &tweets)
			}
			if strings.HasPrefix(entryID, "conversationthread-") {
				items := content.(map[string]interface{})["items"].([]interface{})
				for _, item := range items {
					itemEntryID := item.(map[string]interface{})["entryId"].(string)
					if !strings.Contains(itemEntryID, "tweet-") {
						continue
					}
					tweetResults := item.(map[string]interface{})["item"].(map[string]interface{})["itemContent"].(map[string]interface{})["tweet_results"].(map[string]interface{})
					if tweetResults["result"] == nil {
						continue
					}
					var tweet model.Tweet
					mapstructure.Decode(tweetResults["result"], &tweet)
					conversation = append(conversation, tweet)
				}
			}
			if strings.HasPrefix(entryID, "cursor-top") {
				resCursor.TopCursor = content.(map[string]interface{})["itemContent"].(map[string]interface{})["value"].(string)
			} else if strings.HasPrefix(entryID, "cursor-bottom") {
				resCursor.BottomCursor = content.(map[string]interface{})["itemContent"].(map[string]interface{})["value"].(string)
			}
		}
	}
	resCursor.IsAfterLast = len(conversation) == 0 || resCursor.BottomCursor == ""
	return tweets, conversation, resCursor, nil
}

func InstructionsToUsers(res map[string]interface{}) ([]model.User, model.Cursor, error) {
	instructions := res["instructions"].([]interface{})
	data := instructions[len(instructions)-1].(map[string]interface{})

	users := make([]model.User, 0)
	resCursor := model.Cursor{}
	entries := data["entries"].([]interface{})
	for _, entry := range entries {
		content := entry.(map[string]interface{})["content"]
		entryID := entry.(map[string]interface{})["entryId"].(string)
		if strings.HasPrefix(entryID, "user-") {
			userResults := content.(map[string]interface{})["itemContent"].(map[string]interface{})["user_results"].(map[string]interface{})
			if userResults["result"] == nil {
				continue
			}
			var user model.User
			mapstructure.Decode(userResults["result"], &user)
			users = append(users, user)
		}
		if strings.HasPrefix(entryID, "cursor-top") {
			resCursor.TopCursor = content.(map[string]interface{})["value"].(string)
		} else if strings.HasPrefix(entryID, "cursor-bottom") {
			resCursor.BottomCursor = content.(map[string]interface{})["value"].(string)
		}
	}
	resCursor.IsAfterLast = len(users) == 0 || resCursor.BottomCursor == ""
	return users, resCursor, nil
}
