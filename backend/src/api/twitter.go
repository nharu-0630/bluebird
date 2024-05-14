package api

import (
	"encoding/json"
	"time"

	"dario.cat/mergo"
)

const (
	BaseURL             = "https://twitter.com/i/api/graphql/"
	LikesByVariablesURI = "BZpa3joi5mv2Rp14jC7y3A/Likes"
	BearerToken         = "AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA"
	ClientUUID          = "a0f767a2-2b96-4667-b672-b70cf9e2acc8"
	UserAgent           = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
)

var LikesByVariables = map[string]bool{
	"includePromotedContent": false,
	"withClientEventToken":   false,
	"withBirdwatchNotes":     false,
	"withVoice":              true,
	"withV2Timeline":         true,
}

var LikesByVariablesFeatures = map[string]bool{
	"responsive_web_graphql_exclude_directive_enabled":                        true,
	"verified_phone_label_enabled":                                            false,
	"responsive_web_home_pinned_timelines_enabled":                            true,
	"creator_subscriptions_tweet_preview_api_enabled":                         true,
	"responsive_web_graphql_timeline_navigation_enabled":                      true,
	"responsive_web_graphql_skip_user_profile_image_extensions_enabled":       false,
	"c9s_tweet_anatomy_moderator_badge_enabled":                               true,
	"tweetypie_unmention_optimization_enabled":                                true,
	"responsive_web_edit_tweet_api_enabled":                                   true,
	"graphql_is_translatable_rweb_tweet_is_translatable_enabled":              true,
	"view_counts_everywhere_api_enabled":                                      true,
	"longform_notetweets_consumption_enabled":                                 true,
	"responsive_web_twitter_article_tweet_consumption_enabled":                false,
	"tweet_awards_web_tipping_enabled":                                        false,
	"freedom_of_speech_not_reach_fetch_enabled":                               true,
	"standardized_nudges_misinfo":                                             true,
	"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled": true,
	"longform_notetweets_rich_text_read_enabled":                              true,
	"longform_notetweets_inline_media_enabled":                                true,
	"responsive_web_media_download_video_enabled":                             false,
	"responsive_web_enhance_cards_enabled":                                    false,
}

var LikesByVariablesHeaders = map[string]string{
	"authority":       "twitter.com",
	"accept":          "*/*",
	"accept-language": "ja,en-US;q=0.9,en;q=0.8",
	"authorization":   "Bearer " + BearerToken,
	"content-type":    "application/json",
	"dnt":             "1",
	// "referer":                   "https://twitter.com/" + str(screen_name) + "/likes",
	"user-agent":    UserAgent,
	"x-client-uuid": ClientUUID,
	// "x-csrf-token":              csrf_token,
	"x-twitter-active-user":     "yes",
	"x-twitter-auth-type":       "OAuth2Session",
	"x-twitter-client-language": "ja",
}

type TwitterAPIConfig struct {
	IntervalDelta time.Duration
	Cookies       map[string]string
}

type TwitterAPI struct {
	config       TwitterAPIConfig
	lastCalledAt time.Time
}

func NewTwitterAPI(config TwitterAPIConfig) *TwitterAPI {
	return &TwitterAPI{config: config}
}

func (t *TwitterAPI) Wait() {
	now := time.Now()
	delta := now.Sub(t.lastCalledAt)
	if delta < t.config.IntervalDelta {
		time.Sleep(t.config.IntervalDelta - delta)
	}
	t.lastCalledAt = time.Now()
}

func (t *TwitterAPI) FetchLikesByVariables(userID string, screenName string, cursor string) (string, error) {
	t.Wait()
	requestURL := BaseURL + LikesByVariablesURI
	variables := map[string]interface{}{
		"userId": userID,
		"count":  20,
	}
	if cursor != "" {
		variables["cursor"] = cursor
	}
	mergo.Merge(&variables, LikesByVariables)
	variablesBytes, err := json.Marshal(&variables)
	if err != nil {
		return "", err
	}
	requestURL += "?variables=" + string(variablesBytes)
	featuresBytes, err := json.Marshal(&LikesByVariablesFeatures)
	if err != nil {
		return "", err
	}
	requestURL += "&features=" + string(featuresBytes)
	headers := map[string]string{
		"referer": "https://twitter.com/" + screenName + "/likes",
		"x-csrf-token": t.config.Cookies["ct0"],
	}
	mergo.Merge(&headers, LikesByVariablesHeaders)
}
