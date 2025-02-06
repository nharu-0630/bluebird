package graphql

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.45

import (
	"context"

	"github.com/mitchellh/mapstructure"
	"github.com/nharu-0630/bluebird/api/twitter"
	"github.com/nharu-0630/bluebird/api/twitter/model"
	"github.com/nharu-0630/bluebird/api/twitter/operation"
	"github.com/nharu-0630/bluebird/tools"
)

// TwTweetByID is the resolver for the twTweetByID field.
func (r *queryResolver) TwTweetByID(ctx context.Context, tweetID string) (*TwTweet, error) {
	data, err := r.TwitterClient.Execute(operation.TweetByID, map[string]interface{}{"tweetId": tweetID})
	if err != nil {
		return nil, err
	}
	var tweet model.Tweet
	mapstructure.Decode(data, &tweet)
	return FormatTweet(&tweet)
}

// TwUserByScreenName is the resolver for the twUserByScreenName field.
func (r *queryResolver) TwUserByScreenName(ctx context.Context, screenName string) (*TwUser, error) {
	data, err := r.TwitterClient.Execute(operation.UserByScreenName, map[string]interface{}{"screen_name": screenName})
	if err != nil {
		return nil, err
	}
	var user model.User
	mapstructure.Decode(data, &user)
	return FormatUser(&user)
}

// TwLikes is the resolver for the twLikes field.
func (r *queryResolver) TwLikes(ctx context.Context, userID string, cursor *string) (*TwTweets, error) {
	if cursor == nil {
		cursor = new(string)
	}
	data, err := r.TwitterClient.Execute(operation.Likes, map[string]interface{}{"userId": userID, "cursor": *cursor})
	if err != nil {
		return nil, err
	}
	tweets, resCursor, err := twitter.InstructionsToTweets(data)
	if err != nil {
		return nil, err
	}
	formattedTweets, err := tools.FormatItems(tweets, FormatTweet)
	if err != nil {
		return nil, err
	}
	return &TwTweets{
		Tweets: formattedTweets,
		Cursor: &resCursor.BottomCursor,
	}, nil
}

// TwUserTweets is the resolver for the twUserTweets field.
func (r *queryResolver) TwUserTweets(ctx context.Context, userID string, cursor *string) (*TwTweets, error) {
	if cursor == nil {
		cursor = new(string)
	}
	data, err := r.TwitterClient.Execute(operation.UserTweets, map[string]interface{}{"userId": userID, "cursor": *cursor})
	if err != nil {
		return nil, err
	}
	tweets, resCursor, err := twitter.InstructionsToTweets(data)
	if err != nil {
		return nil, err
	}
	formattedTweets, err := tools.FormatItems(tweets, FormatTweet)
	if err != nil {
		return nil, err
	}
	return &TwTweets{
		Tweets: formattedTweets,
		Cursor: &resCursor.BottomCursor,
	}, nil
}

// TwBookmarks is the resolver for the twBookmarks field.
func (r *queryResolver) TwBookmarks(ctx context.Context, cursor *string) (*TwTweets, error) {
	if cursor == nil {
		cursor = new(string)
	}
	data, err := r.TwitterClient.Execute(operation.Bookmarks, map[string]interface{}{"cursor": *cursor})
	if err != nil {
		return nil, err
	}
	tweets, resCursor, err := twitter.InstructionsToTweets(data)
	if err != nil {
		return nil, err
	}
	formattedTweets, err := tools.FormatItems(tweets, FormatTweet)
	if err != nil {
		return nil, err
	}
	return &TwTweets{
		Tweets: formattedTweets,
		Cursor: &resCursor.BottomCursor,
	}, nil
}

// TwFollowers is the resolver for the twFollowers field.
func (r *queryResolver) TwFollowers(ctx context.Context, userID string, cursor *string) (*TwUsers, error) {
	if cursor == nil {
		cursor = new(string)
	}
	data, err := r.TwitterClient.Execute(operation.Followers, map[string]interface{}{"userId": userID, "cursor": *cursor})
	if err != nil {
		return nil, err
	}
	users, resCursor, err := twitter.InstructionsToUsers(data)
	if err != nil {
		return nil, err
	}
	formattedUsers, err := tools.FormatItems(users, FormatUser)
	if err != nil {
		return nil, err
	}
	return &TwUsers{
		Users:  formattedUsers,
		Cursor: &resCursor.BottomCursor,
	}, nil
}

// TwFollowing is the resolver for the twFollowing field.
func (r *queryResolver) TwFollowing(ctx context.Context, userID string, cursor *string) (*TwUsers, error) {
	if cursor == nil {
		cursor = new(string)
	}
	data, err := r.TwitterClient.Execute(operation.Following, map[string]interface{}{"userId": userID, "cursor": *cursor})
	if err != nil {
		return nil, err
	}
	users, resCursor, err := twitter.InstructionsToUsers(data)
	if err != nil {
		return nil, err
	}
	formattedUsers, err := tools.FormatItems(users, FormatUser)
	if err != nil {
		return nil, err
	}
	return &TwUsers{
		Users:  formattedUsers,
		Cursor: &resCursor.BottomCursor,
	}, nil
}

// TwTweetDetail is the resolver for the twTweetDetail field.
func (r *queryResolver) TwTweetDetail(ctx context.Context, tweetID string, cursor *string) (*TwTweets, error) {
	if cursor == nil {
		cursor = new(string)
	}
	data, err := r.TwitterClient.Execute(operation.TweetDetail, map[string]interface{}{"tweetId": tweetID, "cursor": *cursor})
	if err != nil {
		return nil, err
	}
	tweets, resCursor, err := twitter.InstructionsToTweets(data)
	if err != nil {
		return nil, err
	}
	formattedTweets, err := tools.FormatItems(tweets, FormatTweet)
	if err != nil {
		return nil, err
	}
	return &TwTweets{
		Tweets: formattedTweets,
		Cursor: &resCursor.BottomCursor,
	}, nil
}
