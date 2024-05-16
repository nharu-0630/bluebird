package model

type Tweet struct {
	Typename          string `json:"__typename,omitempty"`
	RestID            string `json:"rest_id,omitempty"`
	HasBirdwatchNotes bool   `json:"has_birdwatch_notes,omitempty"`
	BirdwatchPivot    struct {
		DestinationURL string `json:"destinationUrl,omitempty"`
		Footer         struct {
			Text     string `json:"text,omitempty"`
			Entities []struct {
				FromIndex int `json:"fromIndex,omitempty"`
				ToIndex   int `json:"toIndex,omitempty"`
				Ref       struct {
					Type    string `json:"type,omitempty"`
					URL     string `json:"url,omitempty"`
					URLType string `json:"urlType,omitempty"`
				} `json:"ref,omitempty"`
			} `json:"entities,omitempty"`
		} `json:"footer,omitempty"`
		Note struct {
			RestID string `json:"rest_id,omitempty"`
		} `json:"note,omitempty"`
		Subtitle struct {
			Text     string `json:"text,omitempty"`
			Entities []struct {
				FromIndex int `json:"fromIndex,omitempty"`
				ToIndex   int `json:"toIndex,omitempty"`
				Ref       struct {
					Type    string `json:"type,omitempty"`
					URL     string `json:"url,omitempty"`
					URLType string `json:"urlType,omitempty"`
				} `json:"ref,omitempty"`
			} `json:"entities,omitempty"`
		} `json:"subtitle,omitempty"`
		Title       string `json:"title,omitempty"`
		Shorttitle  string `json:"shorttitle,omitempty"`
		VisualStyle string `json:"visualStyle,omitempty"`
		IconType    string `json:"iconType,omitempty"`
	} `json:"birdwatch_pivot,omitempty"`
	Core struct {
		UserResults struct {
			Result struct {
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
							Urls []any `json:"urls,omitempty"`
						} `json:"description,omitempty"`
					} `json:"entities,omitempty"`
					FastFollowersCount      int    `json:"fast_followers_count,omitempty"`
					FavouritesCount         int    `json:"favourites_count,omitempty"`
					FollowersCount          int    `json:"followers_count,omitempty"`
					FriendsCount            int    `json:"friends_count,omitempty"`
					HasCustomTimelines      bool   `json:"has_custom_timelines,omitempty"`
					IsTranslator            bool   `json:"is_translator,omitempty"`
					ListedCount             int    `json:"listed_count,omitempty"`
					Location                string `json:"location,omitempty"`
					MediaCount              int    `json:"media_count,omitempty"`
					Name                    string `json:"name,omitempty"`
					NormalFollowersCount    int    `json:"normal_followers_count,omitempty"`
					PinnedTweetIdsStr       []any  `json:"pinned_tweet_ids_str,omitempty"`
					PossiblySensitive       bool   `json:"possibly_sensitive,omitempty"`
					ProfileBannerURL        string `json:"profile_banner_url,omitempty"`
					ProfileImageURLHTTPS    string `json:"profile_image_url_https,omitempty"`
					ProfileInterstitialType string `json:"profile_interstitial_type,omitempty"`
					ScreenName              string `json:"screen_name,omitempty"`
					StatusesCount           int    `json:"statuses_count,omitempty"`
					TranslatorType          string `json:"translator_type,omitempty"`
					Verified                bool   `json:"verified,omitempty"`
					WithheldInCountries     []any  `json:"withheld_in_countries,omitempty"`
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
			} `json:"result,omitempty"`
		} `json:"user_results,omitempty"`
	} `json:"core,omitempty"`
	UnmentionData struct {
	} `json:"unmention_data,omitempty"`
	EditControl struct {
		EditTweetIds       []string `json:"edit_tweet_ids,omitempty"`
		EditableUntilMsecs string   `json:"editable_until_msecs,omitempty"`
		IsEditEligible     bool     `json:"is_edit_eligible,omitempty"`
		EditsRemaining     string   `json:"edits_remaining,omitempty"`
	} `json:"edit_control,omitempty"`
	IsTranslatable bool `json:"is_translatable,omitempty"`
	Views          struct {
		Count string `json:"count,omitempty"`
		State string `json:"state,omitempty"`
	} `json:"views,omitempty"`
	Source    string `json:"source,omitempty"`
	NoteTweet struct {
		IsExpandable     bool `json:"is_expandable,omitempty"`
		NoteTweetResults struct {
			Result struct {
				ID        string `json:"id,omitempty"`
				Text      string `json:"text,omitempty"`
				EntitySet struct {
					Hashtags     []any `json:"hashtags,omitempty"`
					Symbols      []any `json:"symbols,omitempty"`
					Urls         []any `json:"urls,omitempty"`
					UserMentions []any `json:"user_mentions,omitempty"`
				} `json:"entity_set,omitempty"`
			} `json:"result,omitempty"`
		} `json:"note_tweet_results,omitempty"`
	} `json:"note_tweet,omitempty"`
	Legacy struct {
		BookmarkCount     int    `json:"bookmark_count,omitempty"`
		Bookmarked        bool   `json:"bookmarked,omitempty"`
		CreatedAt         string `json:"created_at,omitempty"`
		ConversationIDStr string `json:"conversation_id_str,omitempty"`
		DisplayTextRange  []int  `json:"display_text_range,omitempty"`
		Entities          struct {
			Hashtags []any `json:"hashtags,omitempty"`
			Media    []struct {
				DisplayURL           string `json:"display_url,omitempty"`
				ExpandedURL          string `json:"expanded_url,omitempty"`
				IDStr                string `json:"id_str,omitempty"`
				Indices              []int  `json:"indices,omitempty"`
				MediaKey             string `json:"media_key,omitempty"`
				MediaURLHTTPS        string `json:"media_url_https,omitempty"`
				Type                 string `json:"type,omitempty"`
				URL                  string `json:"url,omitempty"`
				ExtMediaAvailability struct {
					Status string `json:"status,omitempty"`
				} `json:"ext_media_availability,omitempty"`
				Features struct {
					Large struct {
						Faces []any `json:"faces,omitempty"`
					} `json:"large,omitempty"`
					Medium struct {
						Faces []any `json:"faces,omitempty"`
					} `json:"medium,omitempty"`
					Small struct {
						Faces []any `json:"faces,omitempty"`
					} `json:"small,omitempty"`
					Orig struct {
						Faces []any `json:"faces,omitempty"`
					} `json:"orig,omitempty"`
				} `json:"features,omitempty"`
				Sizes struct {
					Large struct {
						H      int    `json:"h,omitempty"`
						W      int    `json:"w,omitempty"`
						Resize string `json:"resize,omitempty"`
					} `json:"large,omitempty"`
					Medium struct {
						H      int    `json:"h,omitempty"`
						W      int    `json:"w,omitempty"`
						Resize string `json:"resize,omitempty"`
					} `json:"medium,omitempty"`
					Small struct {
						H      int    `json:"h,omitempty"`
						W      int    `json:"w,omitempty"`
						Resize string `json:"resize,omitempty"`
					} `json:"small,omitempty"`
					Thumb struct {
						H      int    `json:"h,omitempty"`
						W      int    `json:"w,omitempty"`
						Resize string `json:"resize,omitempty"`
					} `json:"thumb,omitempty"`
				} `json:"sizes,omitempty"`
				OriginalInfo struct {
					Height     int `json:"height,omitempty"`
					Width      int `json:"width,omitempty"`
					FocusRects []struct {
						X int `json:"x,omitempty"`
						Y int `json:"y,omitempty"`
						W int `json:"w,omitempty"`
						H int `json:"h,omitempty"`
					} `json:"focus_rects,omitempty"`
				} `json:"original_info,omitempty"`
				MediaResults struct {
					Result struct {
						MediaKey string `json:"media_key,omitempty"`
					} `json:"result,omitempty"`
				} `json:"media_results,omitempty"`
			} `json:"media,omitempty"`
			Symbols      []any `json:"symbols,omitempty"`
			Timestamps   []any `json:"timestamps,omitempty"`
			Urls         []any `json:"urls,omitempty"`
			UserMentions []any `json:"user_mentions,omitempty"`
		} `json:"entities,omitempty"`
		ExtendedEntities struct {
			Media []struct {
				DisplayURL           string `json:"display_url,omitempty"`
				ExpandedURL          string `json:"expanded_url,omitempty"`
				IDStr                string `json:"id_str,omitempty"`
				Indices              []int  `json:"indices,omitempty"`
				MediaKey             string `json:"media_key,omitempty"`
				MediaURLHTTPS        string `json:"media_url_https,omitempty"`
				Type                 string `json:"type,omitempty"`
				URL                  string `json:"url,omitempty"`
				ExtMediaAvailability struct {
					Status string `json:"status,omitempty"`
				} `json:"ext_media_availability,omitempty"`
				Features struct {
					Large struct {
						Faces []any `json:"faces,omitempty"`
					} `json:"large,omitempty"`
					Medium struct {
						Faces []any `json:"faces,omitempty"`
					} `json:"medium,omitempty"`
					Small struct {
						Faces []any `json:"faces,omitempty"`
					} `json:"small,omitempty"`
					Orig struct {
						Faces []any `json:"faces,omitempty"`
					} `json:"orig,omitempty"`
				} `json:"features,omitempty"`
				Sizes struct {
					Large struct {
						H      int    `json:"h,omitempty"`
						W      int    `json:"w,omitempty"`
						Resize string `json:"resize,omitempty"`
					} `json:"large,omitempty"`
					Medium struct {
						H      int    `json:"h,omitempty"`
						W      int    `json:"w,omitempty"`
						Resize string `json:"resize,omitempty"`
					} `json:"medium,omitempty"`
					Small struct {
						H      int    `json:"h,omitempty"`
						W      int    `json:"w,omitempty"`
						Resize string `json:"resize,omitempty"`
					} `json:"small,omitempty"`
					Thumb struct {
						H      int    `json:"h,omitempty"`
						W      int    `json:"w,omitempty"`
						Resize string `json:"resize,omitempty"`
					} `json:"thumb,omitempty"`
				} `json:"sizes,omitempty"`
				OriginalInfo struct {
					Height     int `json:"height,omitempty"`
					Width      int `json:"width,omitempty"`
					FocusRects []struct {
						X int `json:"x,omitempty"`
						Y int `json:"y,omitempty"`
						W int `json:"w,omitempty"`
						H int `json:"h,omitempty"`
					} `json:"focus_rects,omitempty"`
				} `json:"original_info,omitempty"`
				MediaResults struct {
					Result struct {
						MediaKey string `json:"media_key,omitempty"`
					} `json:"result,omitempty"`
				} `json:"media_results,omitempty"`
			} `json:"media,omitempty"`
		} `json:"extended_entities,omitempty"`
		FavoriteCount             int    `json:"favorite_count,omitempty"`
		Favorited                 bool   `json:"favorited,omitempty"`
		FullText                  string `json:"full_text,omitempty"`
		IsQuoteStatus             bool   `json:"is_quote_status,omitempty"`
		Lang                      string `json:"lang,omitempty"`
		PossiblySensitive         bool   `json:"possibly_sensitive,omitempty"`
		PossiblySensitiveEditable bool   `json:"possibly_sensitive_editable,omitempty"`
		QuoteCount                int    `json:"quote_count,omitempty"`
		ReplyCount                int    `json:"reply_count,omitempty"`
		RetweetCount              int    `json:"retweet_count,omitempty"`
		Retweeted                 bool   `json:"retweeted,omitempty"`
		UserIDStr                 string `json:"user_id_str,omitempty"`
		IDStr                     string `json:"id_str,omitempty"`
	} `json:"legacy,omitempty"`
}
