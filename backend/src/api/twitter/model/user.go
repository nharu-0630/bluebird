package model

type User struct {
	Typename                   string `json:"__typename,omitempty"`
	ID                         string `json:"id,omitempty"`
	RestID                     string `json:"rest_id,omitempty"`
	AffiliatesHighlightedLabel struct {
	} `json:"affiliates_highlighted_label,omitempty"`
	IsBlueVerified    bool   `json:"is_blue_verified,omitempty"`
	ProfileImageShape string `json:"profile_image_shape,omitempty"`
	Legacy            struct {
		CreatedAt           string `json:"created_at,omitempty"`
		DefaultProfile      bool   `json:"default_profile,omitempty"`
		DefaultProfileImage bool   `json:"default_profile_image,omitempty"`
		Description         string `json:"description,omitempty"`
		Entities            struct {
			Description struct {
				Urls []interface{} `json:"urls,omitempty"`
			} `json:"description,omitempty"`
		} `json:"entities,omitempty"`
		FastFollowersCount      int           `json:"fast_followers_count,omitempty"`
		FavouritesCount         int           `json:"favourites_count,omitempty"`
		FollowersCount          int           `json:"followers_count,omitempty"`
		FriendsCount            int           `json:"friends_count,omitempty"`
		HasCustomTimelines      bool          `json:"has_custom_timelines,omitempty"`
		IsTranslator            bool          `json:"is_translator,omitempty"`
		ListedCount             int           `json:"listed_count,omitempty"`
		Location                string        `json:"location,omitempty"`
		MediaCount              int           `json:"media_count,omitempty"`
		Name                    string        `json:"name,omitempty"`
		NormalFollowersCount    int           `json:"normal_followers_count,omitempty"`
		PinnedTweetIdsStr       []string      `json:"pinned_tweet_ids_str,omitempty"`
		PossiblySensitive       bool          `json:"possibly_sensitive,omitempty"`
		ProfileBannerURL        string        `json:"profile_banner_url,omitempty"`
		ProfileImageURLHTTPS    string        `json:"profile_image_url_https,omitempty"`
		ProfileInterstitialType string        `json:"profile_interstitial_type,omitempty"`
		ScreenName              string        `json:"screen_name,omitempty"`
		StatusesCount           int           `json:"statuses_count,omitempty"`
		TranslatorType          string        `json:"translator_type,omitempty"`
		Verified                bool          `json:"verified,omitempty"`
		WithheldInCountries     []interface{} `json:"withheld_in_countries,omitempty"`
	} `json:"legacy,omitempty"`
	TipjarSettings struct {
		IsEnabled      bool   `json:"is_enabled,omitempty"`
		BandcampHandle string `json:"bandcamp_handle,omitempty"`
		BitcoinHandle  string `json:"bitcoin_handle,omitempty"`
		CashAppHandle  string `json:"cash_app_handle,omitempty"`
		EthereumHandle string `json:"ethereum_handle,omitempty"`
		GofundmeHandle string `json:"gofundme_handle,omitempty"`
		PatreonHandle  string `json:"patreon_handle,omitempty"`
		PayPalHandle   string `json:"pay_pal_handle,omitempty"`
		VenmoHandle    string `json:"venmo_handle,omitempty"`
	} `json:"tipjar_settings,omitempty"`
	LegacyExtendedProfile struct {
	} `json:"legacy_extended_profile,omitempty"`
	IsProfileTranslatable           bool `json:"is_profile_translatable,omitempty"`
	HasHiddenLikesOnProfile         bool `json:"has_hidden_likes_on_profile,omitempty"`
	HasHiddenSubscriptionsOnProfile bool `json:"has_hidden_subscriptions_on_profile,omitempty"`
	VerificationInfo                struct {
		IsIdentityVerified bool `json:"is_identity_verified,omitempty"`
	} `json:"verification_info,omitempty"`
	HighlightsInfo struct {
		CanHighlightTweets bool   `json:"can_highlight_tweets,omitempty"`
		HighlightedTweets  string `json:"highlighted_tweets,omitempty"`
	} `json:"highlights_info,omitempty"`
	UserSeedTweetCount int `json:"user_seed_tweet_count,omitempty"`
	BusinessAccount    struct {
	} `json:"business_account,omitempty"`
	CreatorSubscriptionsCount int `json:"creator_subscriptions_count,omitempty"`
}
