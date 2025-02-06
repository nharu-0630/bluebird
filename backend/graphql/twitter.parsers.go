package graphql

import (
	"time"

	"github.com/nharu-0630/bluebird/api/twitter/model"
)

func FormatTweet(tweet *model.Tweet) (*TwitterTweet, error) {
	parsedCreatedAt, _ := time.Parse(time.RubyDate, tweet.Legacy.CreatedAt)
	parsedMedias := make([]*TwitterMedia, len(tweet.Legacy.Entities.Media))
	for j, media := range tweet.Legacy.Entities.Media {
		var videoURL *string
		if media.Type == "animated_gif" || media.Type == "video" {
			bestBitrate := 0
			for _, variant := range media.VideoInfo.Variants {
				if variant.ContentType == "application/x-mpegURL" {
					continue
				}
				if variant.Bitrate > bestBitrate {
					bestBitrate = variant.Bitrate
					videoURL = &variant.URL
				}
			}
		}
		parsedMedias[j] = &TwitterMedia{
			ID:          &media.IDStr,
			MediaKey:    &media.MediaKey,
			ExpandedURL: &media.ExpandedURL,
			Type:        &media.Type,
			ThumbURL:    &media.MediaURLHTTPS,
			VideoURL:    videoURL,
		}
	}
	user, _ := FormatUser(&tweet.Core.UserResults.Result)
	return &TwitterTweet{
		ID:            &tweet.RestID,
		User:          user,
		FullText:      &tweet.Legacy.FullText,
		Media:         parsedMedias,
		CreatedAt:     &parsedCreatedAt,
		ReplyCount:    &tweet.Legacy.ReplyCount,
		RetweetCount:  &tweet.Legacy.RetweetCount,
		QuoteCount:    &tweet.Legacy.QuoteCount,
		Retweeted:     &tweet.Legacy.Retweeted,
		FavoriteCount: &tweet.Legacy.FavoriteCount,
		Favorited:     &tweet.Legacy.Favorited,
		BookmarkCount: &tweet.Legacy.BookmarkCount,
		Bookmarked:    &tweet.Legacy.Bookmarked,
		Lang:          &tweet.Legacy.Lang,
	}, nil
}

func FormatUser(user *model.User) (*TwitterUser, error) {
	parsedBirthday := time.Time{}
	// :TODO: Parse birthday
	parsedCreatedAt, _ := time.Parse(time.RubyDate, user.Legacy.CreatedAt)
	parsedPinnedTweetIDs := make([]*string, len(user.Legacy.PinnedTweetIdsStr))
	for i, id := range user.Legacy.PinnedTweetIdsStr {
		parsedPinnedTweetIDs[i] = &id
	}
	return &TwitterUser{
		ID:                   &user.RestID,
		Name:                 &user.Legacy.Name,
		ScreenName:           &user.Legacy.ScreenName,
		Verified:             &user.Legacy.Verified,
		BlueVerified:         &user.IsBlueVerified,
		Description:          &user.Legacy.Description,
		Location:             &user.Legacy.Location,
		Birthday:             &parsedBirthday,
		CreatedAt:            &parsedCreatedAt,
		FriendsCount:         &user.Legacy.FriendsCount,
		Following:            &user.Legacy.Following,
		FastFollowersCount:   &user.Legacy.FastFollowersCount,
		FollowersCount:       &user.Legacy.FollowersCount,
		NormalFollowersCount: &user.Legacy.NormalFollowersCount,
		FollowedBy:           &user.Legacy.FollowedBy,
		MediaCount:           &user.Legacy.MediaCount,
		FavouritesCount:      &user.Legacy.FavouritesCount,
		ListedCount:          &user.Legacy.ListedCount,
		PinnedTweetIDs:       parsedPinnedTweetIDs,
		ProfileBannerURL:     &user.Legacy.ProfileBannerURL,
		ProfileImageURL:      &user.Legacy.ProfileImageURLHTTPS,
		StatusesCount:        &user.Legacy.StatusesCount,
	}, nil
}
