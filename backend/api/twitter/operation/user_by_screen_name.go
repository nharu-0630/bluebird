package operation

import (
	"errors"

	"github.com/nharu-0630/bluebird/api/twitter/model"
)

var UserByScreenName = model.Operation{
	Name:       "UserByScreenName",
	AllowGuest: true,
	DefaultParams: map[string]interface{}{
		"variables":    map[string]interface{}{"withSafetyModeUserFields": true},
		"features":     map[string]interface{}{"hidden_profile_subscriptions_enabled": true, "profile_label_improvements_pcf_label_in_post_enabled": true, "rweb_tipjar_consumption_enabled": true, "responsive_web_graphql_exclude_directive_enabled": true, "verified_phone_label_enabled": false, "subscriptions_verification_info_is_identity_verified_enabled": true, "subscriptions_verification_info_verified_since_enabled": true, "highlights_tweets_tab_ui_enabled": true, "responsive_web_twitter_article_notes_tab_enabled": true, "subscriptions_feature_can_gift_premium": true, "creator_subscriptions_tweet_preview_api_enabled": true, "responsive_web_graphql_skip_user_profile_image_extensions_enabled": false, "responsive_web_graphql_timeline_navigation_enabled": true},
		"fieldToggles": map[string]interface{}{"withAuxiliaryUserLabels": false},
	},
	Args: map[string]interface{}{
		"variables": map[string]interface{}{"screen_name": nil},
	},
	Method:   "GET",
	Endpoint: "32pL5BWe9WKeSK1MoPvFQQ",
	Parser: func(data map[string]interface{}) (map[string]interface{}, error) {
		if user, ok := data["user"].(map[string]interface{}); ok {
			if result, ok := user["result"].(map[string]interface{}); ok {
				return result, nil
			}
			return nil, errors.New("user.result not found")
		}
		return nil, errors.New("user not found")
	},
}
