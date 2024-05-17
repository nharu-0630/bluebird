// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package graphql

import (
	"time"
)

type Mutation struct {
}

type Query struct {
}

type ShelfCategory struct {
	Ulid string `json:"ulid"`
	Name string `json:"name"`
}

type ShelfFile struct {
	BaseURI string `json:"baseUri"`
	Token   string `json:"token"`
}

type ShelfItem struct {
	Ulid        string         `json:"ulid"`
	Name        string         `json:"name"`
	Category    *ShelfCategory `json:"category"`
	Tags        []*ShelfTag    `json:"tags"`
	Location    *ShelfLocation `json:"location"`
	Description string         `json:"description"`
	Images      []*ShelfFile   `json:"images"`
}

type ShelfLocation struct {
	Ulid string `json:"ulid"`
	Name string `json:"name"`
}

type ShelfTag struct {
	Ulid string `json:"ulid"`
	Name string `json:"name"`
}

type TweetConnection struct {
	Tweets []*TwitterTweet `json:"tweets,omitempty"`
	Cursor *string         `json:"cursor,omitempty"`
}

type TwitterMedia struct {
	ID          *string `json:"id,omitempty"`
	MediaKey    *string `json:"mediaKey,omitempty"`
	ExpandedURL *string `json:"expandedURL,omitempty"`
	Type        *string `json:"type,omitempty"`
	ThumbURL    *string `json:"thumbURL,omitempty"`
	VideoURL    *string `json:"videoURL,omitempty"`
}

type TwitterTweet struct {
	ID            *string         `json:"id,omitempty"`
	User          *TwitterUser    `json:"user,omitempty"`
	FullText      *string         `json:"fullText,omitempty"`
	Media         []*TwitterMedia `json:"media,omitempty"`
	CreatedAt     *time.Time      `json:"createdAt,omitempty"`
	ReplyCount    *int            `json:"replyCount,omitempty"`
	RetweetCount  *int            `json:"retweetCount,omitempty"`
	QuoteCount    *int            `json:"quoteCount,omitempty"`
	Retweeted     *bool           `json:"retweeted,omitempty"`
	FavoriteCount *int            `json:"favoriteCount,omitempty"`
	Favorited     *bool           `json:"favorited,omitempty"`
	BookmarkCount *int            `json:"bookmarkCount,omitempty"`
	Bookmarked    *bool           `json:"bookmarked,omitempty"`
	Lang          *string         `json:"lang,omitempty"`
}

type TwitterUser struct {
	ID                   *string    `json:"id,omitempty"`
	Name                 *string    `json:"name,omitempty"`
	ScreenName           *string    `json:"screenName,omitempty"`
	Verified             *bool      `json:"verified,omitempty"`
	BlueVerified         *bool      `json:"blueVerified,omitempty"`
	Description          *string    `json:"description,omitempty"`
	Location             *string    `json:"location,omitempty"`
	Birthday             *time.Time `json:"birthday,omitempty"`
	CreatedAt            *time.Time `json:"createdAt,omitempty"`
	FriendsCount         *int       `json:"friendsCount,omitempty"`
	Following            *bool      `json:"following,omitempty"`
	FastFollowersCount   *int       `json:"fastFollowersCount,omitempty"`
	FollowersCount       *int       `json:"followersCount,omitempty"`
	NormalFollowersCount *int       `json:"normalFollowersCount,omitempty"`
	FollowedBy           *bool      `json:"followedBy,omitempty"`
	MediaCount           *int       `json:"mediaCount,omitempty"`
	FavouritesCount      *int       `json:"favouritesCount,omitempty"`
	ListedCount          *int       `json:"listedCount,omitempty"`
	PinnedTweetIDs       []*string  `json:"pinnedTweetIDs,omitempty"`
	ProfileBannerURL     *string    `json:"profileBannerURL,omitempty"`
	ProfileImageURL      *string    `json:"profileImageURL,omitempty"`
	StatusesCount        *int       `json:"statusesCount,omitempty"`
}
