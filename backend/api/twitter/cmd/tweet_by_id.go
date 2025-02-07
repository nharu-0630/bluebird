package cmd

import (
	"errors"

	"github.com/nharu-0630/bluebird/api/twitter/model"
)

var TweetByID = model.Cmd{
	Name:       "TweetResultByRestId",
	AllowGuest: true,
	DefaultParams: map[string]interface{}{
		"variables": map[string]interface{}{"includePromotedContent": true, "withBirdwatchNotes": true, "withVoice": true, "withCommunity": true},
		"features":  map[string]interface{}{"creator_subscriptions_tweet_preview_api_enabled": true, "communities_web_enable_tweet_community_results_fetch": true, "c9s_tweet_anatomy_moderator_badge_enabled": true, "articles_preview_enabled": true, "tweetypie_unmention_optimization_enabled": true, "responsive_web_edit_tweet_api_enabled": true, "graphql_is_translatable_rweb_tweet_is_translatable_enabled": true, "view_counts_everywhere_api_enabled": true, "longform_notetweets_consumption_enabled": true, "responsive_web_twitter_article_tweet_consumption_enabled": true, "tweet_awards_web_tipping_enabled": false, "creator_subscriptions_quote_tweet_preview_enabled": false, "freedom_of_speech_not_reach_fetch_enabled": true, "standardized_nudges_misinfo": true, "tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled": true, "tweet_with_visibility_results_prefer_gql_media_interstitial_enabled": true, "rweb_video_timestamps_enabled": true, "longform_notetweets_rich_text_read_enabled": true, "longform_notetweets_inline_media_enabled": true, "rweb_tipjar_consumption_enabled": true, "responsive_web_graphql_exclude_directive_enabled": true, "verified_phone_label_enabled": false, "responsive_web_graphql_skip_user_profile_image_extensions_enabled": false, "responsive_web_graphql_timeline_navigation_enabled": true, "responsive_web_enhance_cards_enabled": false},
	},
	Args: map[string]interface{}{
		"variables": map[string]interface{}{"tweetId": nil},
	},
	Method:   "GET",
	Endpoint: "7xflPyRiUxGVbJd4uWmbfg",
	Parser: func(data map[string]interface{}) (map[string]interface{}, error) {
		if tweetResult, ok := data["tweetResult"].(map[string]interface{}); ok {
			if result, ok := tweetResult["result"].(map[string]interface{}); ok {
				return result, nil
			}
			return nil, errors.New("tweetResult.result not found")
		}
		return nil, errors.New("tweetResult not found")
	},
}
