package twitter_test

import (
	"fmt"
	"testing"

	"github.com/xyzyxJP/bluebird/src/api/twitter"
)

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
	client := twitter.NewTwitterClient(twitter.TwitterClientConfig{
		IsGuestTokenEnabled: false,
	})
	likes, err := client.Likes("1003084799592972288")
	if err != nil {
		t.Error(err)
	} else {
		fmt.Println(likes)
	}
}
