package model

import (
	"time"

	"gorm.io/gorm"
)

type TwitterUser struct {
	ID               string `gorm:"primaryKey;not null"`
	Version          int    `gorm:"primaryKey;not null"`
	CreatedAt        time.Time
	UpdatedAt        time.Time
	DeletedAt        gorm.DeletedAt `gorm:"index"`
	Name             string         `gorm:"not null"`
	ScreenName       string         `gorm:"not null"`
	Description      string         `gorm:"not null"`
	FollowersCount   int            `gorm:"not null"`
	FriendsCount     int            `gorm:"not null"`
	ListedCount      int            `gorm:"not null"`
	FavouritesCount  int            `gorm:"not null"`
	MediaCount       int            `gorm:"not null"`
	StatusesCount    int            `gorm:"not null"`
	ProfileBannerUrl string         `gorm:"not null"`
	ProfileBanner    []byte         `gorm:"not null;size:4294967295"`
	ProfileImageUrl  string         `gorm:"not null"`
	ProfileImage     []byte         `gorm:"not null;size:4294967295"`
	UserCreatedAt    time.Time      `gorm:"not null"`
}

type TwitterTweet struct {
	ID             string `gorm:"primaryKey;not null"`
	Version        int    `gorm:"primaryKey;not null"`
	CreatedAt      time.Time
	UpdatedAt      time.Time
	DeletedAt      gorm.DeletedAt `gorm:"index"`
	UserID         string         `gorm:"not null"`
	UserVersion    int            `gorm:"not null"`
	User           TwitterUser
	FullText       string         `gorm:"not null"`
	TweetCreatedAt time.Time      `gorm:"not null"`
	QuoteCount     int            `gorm:"not null"`
	ReplyCount     int            `gorm:"not null"`
	RetweetCount   int            `gorm:"not null"`
	FavoriteCount  int            `gorm:"not null"`
	BookmarkCount  int            `gorm:"not null"`
	ViewsCount     int            `gorm:"not null"`
	Media          []TwitterMedia `gorm:"foreignKey:TweetID,TweetVersion;references:ID,Version"`
}

type TwitterMedia struct {
	gorm.Model
	TweetID      string `gorm:"not null"`
	TweetVersion int    `gorm:"not null"`
	Tweet        TwitterTweet
	ExpandedUrl  string `gorm:"not null"`
	MediaKey     string `gorm:"not null"`
	MediaUrl     string `gorm:"not null"`
	Type         string `gorm:"not null"`
	VideoUrl     string `gorm:"not null"`
}
