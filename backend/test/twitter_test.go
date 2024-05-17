package test

import (
	"fmt"
	"log"
	"os"
	"regexp"
	"testing"

	"github.com/joho/godotenv"
	"github.com/xyzyxJP/bluebird/src/api/twitter"
)

const PROJECT_DIR = "bluebird"

func LoadEnv() {
	re := regexp.MustCompile(`^(.*` + PROJECT_DIR + `)`)
	cwd, _ := os.Getwd()
	rootPath := re.Find([]byte(cwd))
	err := godotenv.Load(string(rootPath) + `/.env`)
	if err != nil {
		log.Fatal("Error loading .env file")
		os.Exit(-1)
	}
}

func TestTweetResultByRestId(t *testing.T) {
	client := twitter.NewTwitterClient(twitter.TwitterClientConfig{
		IsGuestTokenEnabled: true,
	})
	tweet, err := client.TweetResultByRestId("1762646776916635958")
	if err != nil {
		t.Error(err)
	} else {
		fmt.Println(tweet)
	}
}

func TestUserByRestId(t *testing.T) {
	client := twitter.NewTwitterClient(twitter.TwitterClientConfig{
		IsGuestTokenEnabled: true,
	})
	user, err := client.UserByScreenName("xyzyxJP")
	if err != nil {
		t.Error(err)
	} else {
		fmt.Println(user)
	}
}

func TestLikes(t *testing.T) {
	LoadEnv()
	client := twitter.NewTwitterClient(twitter.TwitterClientConfig{
		IsGuestTokenEnabled: false,
		AuthToken:           os.Getenv("TWITTER_AUTH_TOKEN"),
		CsrfToken:           os.Getenv("TWITTER_CSRF_TOKEN"),
	})
	tweets, cursor, err := client.Likes("1003084799592972288")
	if err != nil {
		t.Error(err)
	} else {
		fmt.Println(tweets)
		fmt.Println(cursor)
	}
}

func TestUserTweets(t *testing.T) {
	LoadEnv()
	client := twitter.NewTwitterClient(twitter.TwitterClientConfig{
		IsGuestTokenEnabled: false,
		AuthToken:           os.Getenv("TWITTER_AUTH_TOKEN"),
		CsrfToken:           os.Getenv("TWITTER_CSRF_TOKEN"),
	})
	tweets, cursor, err := client.UserTweets("1003084799592972288")
	if err != nil {
		t.Error(err)
	} else {
		fmt.Println(tweets)
		fmt.Println(cursor)
	}
}

func TestBookmarks(t *testing.T) {
	LoadEnv()
	client := twitter.NewTwitterClient(twitter.TwitterClientConfig{
		IsGuestTokenEnabled: false,
		AuthToken:           os.Getenv("TWITTER_AUTH_TOKEN"),
		CsrfToken:           os.Getenv("TWITTER_CSRF_TOKEN"),
	})
	tweets, cursor, err := client.Bookmarks()
	if err != nil {
		t.Error(err)
	} else {
		fmt.Println(tweets)
		fmt.Println(cursor)
	}
}
