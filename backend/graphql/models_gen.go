// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package graphql

import (
	"time"
)

type BucketFile struct {
	Ulid         string `json:"ulid"`
	Bucket       string `json:"bucket"`
	Key          string `json:"key"`
	Name         string `json:"name"`
	OriginalName string `json:"originalName"`
	SignedURL    string `json:"signedUrl"`
}

type Mutation struct {
}

type PoIllust struct {
	ID          string   `json:"id"`
	User        *PoUser  `json:"user,omitempty"`
	Category    string   `json:"category"`
	Description string   `json:"description"`
	ImageURLs   []string `json:"imageURLs,omitempty"`
}

type PoIllusts struct {
	User          *PoUser     `json:"user"`
	PinnedIllusts []*PoIllust `json:"pinnedIllusts"`
	Illusts       []*PoIllust `json:"illusts"`
	HasNext       bool        `json:"hasNext"`
}

type PoUser struct {
	ID          string   `json:"id"`
	Name        string   `json:"name"`
	ImageURL    string   `json:"imageURL"`
	ExternalURL string   `json:"externalURL"`
	Description string   `json:"description"`
	IsFollowing bool     `json:"isFollowing"`
	Emojis      []string `json:"emojis"`
	ItemCount   int      `json:"itemCount"`
}

type Query struct {
}

type ShelfCategory struct {
	Ulid string `json:"ulid"`
	Name string `json:"name"`
}

type ShelfItem struct {
	Ulid        string         `json:"ulid"`
	Name        string         `json:"name"`
	Category    *ShelfCategory `json:"category"`
	Tags        []*ShelfTag    `json:"tags"`
	Location    *ShelfLocation `json:"location"`
	Description string         `json:"description"`
	Images      []*BucketFile  `json:"images"`
}

type ShelfLocation struct {
	Ulid string `json:"ulid"`
	Name string `json:"name"`
}

type ShelfTag struct {
	Ulid string `json:"ulid"`
	Name string `json:"name"`
}

type TwMedia struct {
	ID          *string `json:"id,omitempty"`
	MediaKey    *string `json:"mediaKey,omitempty"`
	ExpandedURL *string `json:"expandedURL,omitempty"`
	Type        *string `json:"type,omitempty"`
	ThumbURL    *string `json:"thumbURL,omitempty"`
	VideoURL    *string `json:"videoURL,omitempty"`
}

type TwTweet struct {
	ID            *string    `json:"id,omitempty"`
	User          *TwUser    `json:"user,omitempty"`
	FullText      *string    `json:"fullText,omitempty"`
	Media         []*TwMedia `json:"media"`
	CreatedAt     *time.Time `json:"createdAt,omitempty"`
	ReplyCount    *int       `json:"replyCount,omitempty"`
	RetweetCount  *int       `json:"retweetCount,omitempty"`
	QuoteCount    *int       `json:"quoteCount,omitempty"`
	Retweeted     *bool      `json:"retweeted,omitempty"`
	FavoriteCount *int       `json:"favoriteCount,omitempty"`
	Favorited     *bool      `json:"favorited,omitempty"`
	BookmarkCount *int       `json:"bookmarkCount,omitempty"`
	Bookmarked    *bool      `json:"bookmarked,omitempty"`
	Lang          *string    `json:"lang,omitempty"`
}

type TwTweets struct {
	Tweets []*TwTweet `json:"tweets"`
	Cursor *string    `json:"cursor,omitempty"`
}

type TwUser struct {
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
	PinnedTweetIDs       []string   `json:"pinnedTweetIDs"`
	ProfileBannerURL     *string    `json:"profileBannerURL,omitempty"`
	ProfileImageURL      *string    `json:"profileImageURL,omitempty"`
	StatusesCount        *int       `json:"statusesCount,omitempty"`
}

type TwUsers struct {
	Users  []*TwUser `json:"users"`
	Cursor *string   `json:"cursor,omitempty"`
}
