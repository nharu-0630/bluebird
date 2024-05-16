package twitter

import (
	"encoding/json"
	"errors"
	"net/http"
	"net/http/cookiejar"
	"net/url"
	"time"

	"github.com/google/uuid"
	"github.com/xyzyxJP/bluebird/src/api/twitter/model"
)

type TwitterClientConfig struct {
	IsGuestTokenEnabled bool
}

type TwitterClient struct {
	config       TwitterClientConfig
	client       *http.Client
	guestToken   string
	lastCalledAt time.Time
}

func NewTwitterClient(config TwitterClientConfig) *TwitterClient {
	jar, err := cookiejar.New(nil)
	if err != nil {
		panic(err)
	}
	client := &TwitterClient{config: config,
		client: &http.Client{
			Timeout: 10 * time.Second,
			Jar:     jar,
		},
		lastCalledAt: time.Now(),
	}
	if config.IsGuestTokenEnabled {
		client.initializeGuestToken()
	}
	return client
}

func (c *TwitterClient) gql(method string, queryID string, operation string, params map[string]interface{}) (map[string]interface{}, error) {
	if method == "POST" {
		return nil, nil
	}
	if method == "GET" {
		encodedParams := ""
		for key, value := range params {
			encodedValue, err := json.Marshal(value)
			if err != nil {
				return nil, err
			}
			escapedValue := url.QueryEscape(string(encodedValue))
			encodedParams += key + "=" + escapedValue + "&"
		}
		encodedParams = encodedParams[:len(encodedParams)-1]
		req, err := http.NewRequest("GET", GQL_API_ENDPOINT+"/"+queryID+"/"+operation+"?"+encodedParams, nil)
		if err != nil {
			return nil, err
		}
		c.setHeaders(req)
		res, err := c.client.Do(req)
		if err != nil {
			return nil, err
		}
		defer res.Body.Close()
		var resData map[string]interface{}
		err = json.NewDecoder(res.Body).Decode(&resData)
		if err != nil {
			return nil, err
		}
		return resData, nil
	}
	return nil, nil
}

func (c *TwitterClient) setHeaders(req *http.Request) {
	if c.config.IsGuestTokenEnabled {
		c.setGuestHeaders(req)
	} else {
		c.setAuthorizedHeaders(req)
	}
}

func (c *TwitterClient) setGuestHeaders(req *http.Request) {
	req.Header.Add("authorization", "Bearer "+BEARER_TOKEN)
	req.Header.Add("origin", "https://twitter.com")
	req.Header.Add("referer", "https://twitter.com/")
	req.Header.Add("user-agent", USER_AGENT)
	req.Header.Add("x-guest-token", c.guestToken)
	req.Header.Add("x-twitter-active-user", "yes")
	req.Header.Add("x-twitter-client-language", "ja")
}

func (c *TwitterClient) setAuthorizedHeaders(req *http.Request) {
	req.Header.Add("authorization", "Bearer "+BEARER_TOKEN)
	req.Header.Add("origin", "https://twitter.com")
	req.Header.Add("referer", "https://twitter.com/")
	req.Header.Add("user-agent", USER_AGENT)
	// req.Header.Add("x-client-transaction-id", nil)
	clientUUID, err := uuid.NewRandom()
	if err != nil {
		panic(err)
	}
	req.Header.Add("x-client-uuid", clientUUID.String())
	cookies := c.client.Jar.Cookies(&url.URL{Host: "twitter.com"})
	ct0 := ""
	for _, cookie := range cookies {
		if cookie.Name == "ct0" {
			ct0 = cookie.Value
			break
		}
	}
	req.Header.Add("x-csrf-token", ct0)
	req.Header.Add("x-twitter-active-user", "yes")
	req.Header.Add("x-twitter-auth-type", "OAuth2Session")
	req.Header.Add("x-twitter-client-language", "ja")
}

func (c *TwitterClient) initializeGuestToken() {
	req, err := http.NewRequest("POST", "https://api.twitter.com/1.1/guest/activate.json", nil)
	if err != nil {
		panic(err)
	}
	req.Header.Add("authorization", "Bearer "+BEARER_TOKEN)
	req.Header.Add("origin", "https://twitter.com")
	req.Header.Add("referer", "https://twitter.com/")
	req.Header.Add("user-agent", USER_AGENT)
	res, err := c.client.Do(req)
	if err != nil {
		panic(err)
	}
	defer res.Body.Close()
	var resData map[string]interface{}
	err = json.NewDecoder(res.Body).Decode(&resData)
	if err != nil {
		panic(err)
	}
	c.guestToken = resData["guest_token"].(string)
}

func (c *TwitterClient) TweetResultByRestId(tweetID string) (model.Tweet, error) {
	variables := map[string]interface{}{"tweetId": tweetID, "includePromotedContent": true, "withBirdwatchNotes": true, "withVoice": true, "withCommunity": true}
	features := map[string]interface{}{"creator_subscriptions_tweet_preview_api_enabled": true, "communities_web_enable_tweet_community_results_fetch": true, "c9s_tweet_anatomy_moderator_badge_enabled": true, "articles_preview_enabled": true, "tweetypie_unmention_optimization_enabled": true, "responsive_web_edit_tweet_api_enabled": true, "graphql_is_translatable_rweb_tweet_is_translatable_enabled": true, "view_counts_everywhere_api_enabled": true, "longform_notetweets_consumption_enabled": true, "responsive_web_twitter_article_tweet_consumption_enabled": true, "tweet_awards_web_tipping_enabled": false, "creator_subscriptions_quote_tweet_preview_enabled": false, "freedom_of_speech_not_reach_fetch_enabled": true, "standardized_nudges_misinfo": true, "tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled": true, "tweet_with_visibility_results_prefer_gql_media_interstitial_enabled": true, "rweb_video_timestamps_enabled": true, "longform_notetweets_rich_text_read_enabled": true, "longform_notetweets_inline_media_enabled": true, "rweb_tipjar_consumption_enabled": true, "responsive_web_graphql_exclude_directive_enabled": true, "verified_phone_label_enabled": false, "responsive_web_graphql_skip_user_profile_image_extensions_enabled": false, "responsive_web_graphql_timeline_navigation_enabled": true, "responsive_web_enhance_cards_enabled": false}
	params := map[string]interface{}{
		"variables": variables,
		"features":  features,
	}
	res, err := c.gql("GET", "7xflPyRiUxGVbJd4uWmbfg", "TweetResultByRestId", params)
	if err != nil {
		return model.Tweet{}, err
	}
	tweet, err := ParseTweet(res["data"].(map[string]interface{})["tweetResult"].(map[string]interface{})["result"].(map[string]interface{}))
	if err != nil {
		return model.Tweet{}, err
	}
	return tweet, nil
}

func (c *TwitterClient) UserByScreenName(screenName string) (model.User, error) {
	variables := map[string]interface{}{"screen_name": screenName, "withSafetyModeUserFields": true}
	features := map[string]interface{}{"hidden_profile_likes_enabled": true, "hidden_profile_subscriptions_enabled": true, "rweb_tipjar_consumption_enabled": true, "responsive_web_graphql_exclude_directive_enabled": true, "verified_phone_label_enabled": false, "subscriptions_verification_info_is_identity_verified_enabled": true, "subscriptions_verification_info_verified_since_enabled": true, "highlights_tweets_tab_ui_enabled": true, "responsive_web_twitter_article_notes_tab_enabled": true, "creator_subscriptions_tweet_preview_api_enabled": true, "responsive_web_graphql_skip_user_profile_image_extensions_enabled": false, "responsive_web_graphql_timeline_navigation_enabled": true}
	fieldToggles := map[string]interface{}{"withAuxiliaryUserLabels": false}
	params := map[string]interface{}{
		"variables":    variables,
		"features":     features,
		"fieldToggles": fieldToggles,
	}
	res, err := c.gql("GET", "qW5u-DAuXpMEG0zA1F7UGQ", "UserByScreenName", params)
	if err != nil {
		return model.User{}, err
	}
	user, err := ParseUser(res["data"].(map[string]interface{})["user"].(map[string]interface{})["result"].(map[string]interface{}))
	if err != nil {
		return model.User{}, err
	}
	return user, nil
}

func (c *TwitterClient) Likes(userID string) (map[string]interface{}, error) {
	if c.config.IsGuestTokenEnabled {
		return nil, errors.New("Likes API is not available with guest token")
	}
	variables := map[string]interface{}{"userId": userID, "count": 20, "includePromotedContent": false, "withClientEventToken": false, "withBirdwatchNotes": false, "withVoice": true, "withV2Timeline": true}
	features := map[string]interface{}{"rweb_tipjar_consumption_enabled": true, "responsive_web_graphql_exclude_directive_enabled": true, "verified_phone_label_enabled": false, "creator_subscriptions_tweet_preview_api_enabled": true, "responsive_web_graphql_timeline_navigation_enabled": true, "responsive_web_graphql_skip_user_profile_image_extensions_enabled": false, "communities_web_enable_tweet_community_results_fetch": true, "c9s_tweet_anatomy_moderator_badge_enabled": true, "articles_preview_enabled": true, "tweetypie_unmention_optimization_enabled": true, "responsive_web_edit_tweet_api_enabled": true, "graphql_is_translatable_rweb_tweet_is_translatable_enabled": true, "view_counts_everywhere_api_enabled": true, "longform_notetweets_consumption_enabled": true, "responsive_web_twitter_article_tweet_consumption_enabled": true, "tweet_awards_web_tipping_enabled": false, "creator_subscriptions_quote_tweet_preview_enabled": false, "freedom_of_speech_not_reach_fetch_enabled": true, "standardized_nudges_misinfo": true, "tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled": true, "tweet_with_visibility_results_prefer_gql_media_interstitial_enabled": true, "rweb_video_timestamps_enabled": true, "longform_notetweets_rich_text_read_enabled": true, "longform_notetweets_inline_media_enabled": true, "responsive_web_enhance_cards_enabled": false}
	fieldToggles := map[string]interface{}{"withArticlePlainText": false}
	params := map[string]interface{}{
		"variables":    variables,
		"features":     features,
		"fieldToggles": fieldToggles,
	}
	res, err := c.gql("GET", "RaAkBb4XXis-atDL3rV-xw", "Likes", params)
	if err != nil {
		return nil, err
	}
	return res, nil
}
