/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createShelfCategory?: Maybe<ShelfCategory>;
  createShelfItem?: Maybe<ShelfItem>;
  createShelfLocation?: Maybe<ShelfLocation>;
  createShelfTag?: Maybe<ShelfTag>;
  deleteShelfCategory: Scalars['Boolean']['output'];
  deleteShelfItem: Scalars['Boolean']['output'];
  deleteShelfLocation: Scalars['Boolean']['output'];
  deleteShelfTag: Scalars['Boolean']['output'];
  forceDeleteShelfItem: Scalars['Boolean']['output'];
  restoreShelfItem: Scalars['Boolean']['output'];
  updateShelfCategory?: Maybe<ShelfCategory>;
  updateShelfItem?: Maybe<ShelfItem>;
  updateShelfLocation?: Maybe<ShelfLocation>;
  updateShelfTag?: Maybe<ShelfTag>;
  uploadShelfItemImage?: Maybe<ShelfFile>;
};


export type MutationCreateShelfCategoryArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateShelfItemArgs = {
  categoryUlid: Scalars['String']['input'];
  description: Scalars['String']['input'];
  locationUlid: Scalars['String']['input'];
  name: Scalars['String']['input'];
  tagsUlid: Array<Scalars['String']['input']>;
};


export type MutationCreateShelfLocationArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateShelfTagArgs = {
  name: Scalars['String']['input'];
};


export type MutationDeleteShelfCategoryArgs = {
  ulid: Scalars['String']['input'];
};


export type MutationDeleteShelfItemArgs = {
  ulid: Scalars['String']['input'];
};


export type MutationDeleteShelfLocationArgs = {
  ulid: Scalars['String']['input'];
};


export type MutationDeleteShelfTagArgs = {
  ulid: Scalars['String']['input'];
};


export type MutationForceDeleteShelfItemArgs = {
  ulid: Scalars['String']['input'];
};


export type MutationRestoreShelfItemArgs = {
  ulid: Scalars['String']['input'];
};


export type MutationUpdateShelfCategoryArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  ulid: Scalars['String']['input'];
};


export type MutationUpdateShelfItemArgs = {
  categoryUlid?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  locationUlid?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  tagsUlid?: InputMaybe<Array<Scalars['String']['input']>>;
  ulid: Scalars['String']['input'];
};


export type MutationUpdateShelfLocationArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  ulid: Scalars['String']['input'];
};


export type MutationUpdateShelfTagArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  ulid: Scalars['String']['input'];
};


export type MutationUploadShelfItemImageArgs = {
  file: Scalars['Upload']['input'];
  ulid: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  deletedShelfItem?: Maybe<ShelfItem>;
  deletedShelfItems: Array<ShelfItem>;
  shelfCategories: Array<ShelfCategory>;
  shelfCategory?: Maybe<ShelfCategory>;
  shelfItem?: Maybe<ShelfItem>;
  shelfItems: Array<ShelfItem>;
  shelfLocation?: Maybe<ShelfLocation>;
  shelfLocations: Array<ShelfLocation>;
  shelfTag?: Maybe<ShelfTag>;
  shelfTags: Array<ShelfTag>;
  twitterBookmarks?: Maybe<Array<Maybe<TwitterTweet>>>;
  twitterLikes?: Maybe<Array<Maybe<TwitterTweet>>>;
  twitterTweet?: Maybe<TwitterTweet>;
  twitterUser?: Maybe<TwitterUser>;
  twitterUserTweets?: Maybe<Array<Maybe<TwitterTweet>>>;
};


export type QueryDeletedShelfItemArgs = {
  ulid: Scalars['String']['input'];
};


export type QueryShelfCategoryArgs = {
  ulid: Scalars['String']['input'];
};


export type QueryShelfItemArgs = {
  ulid: Scalars['String']['input'];
};


export type QueryShelfLocationArgs = {
  ulid: Scalars['String']['input'];
};


export type QueryShelfTagArgs = {
  ulid: Scalars['String']['input'];
};


export type QueryTwitterLikesArgs = {
  user_id: Scalars['String']['input'];
};


export type QueryTwitterTweetArgs = {
  tweet_id: Scalars['String']['input'];
};


export type QueryTwitterUserArgs = {
  screen_name: Scalars['String']['input'];
};


export type QueryTwitterUserTweetsArgs = {
  user_id: Scalars['String']['input'];
};

export type ShelfCategory = {
  __typename?: 'ShelfCategory';
  name: Scalars['String']['output'];
  ulid: Scalars['String']['output'];
};

export type ShelfFile = {
  __typename?: 'ShelfFile';
  baseUri: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type ShelfItem = {
  __typename?: 'ShelfItem';
  category: ShelfCategory;
  description: Scalars['String']['output'];
  images: Array<ShelfFile>;
  location: ShelfLocation;
  name: Scalars['String']['output'];
  tags: Array<ShelfTag>;
  ulid: Scalars['String']['output'];
};

export type ShelfLocation = {
  __typename?: 'ShelfLocation';
  name: Scalars['String']['output'];
  ulid: Scalars['String']['output'];
};

export type ShelfTag = {
  __typename?: 'ShelfTag';
  name: Scalars['String']['output'];
  ulid: Scalars['String']['output'];
};

export type TwitterMedia = {
  __typename?: 'TwitterMedia';
  expanded_url?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  media_key?: Maybe<Scalars['String']['output']>;
  thumb_url?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  video_url?: Maybe<Scalars['String']['output']>;
};

export type TwitterTweet = {
  __typename?: 'TwitterTweet';
  bookmark_count?: Maybe<Scalars['Int']['output']>;
  bookmarked?: Maybe<Scalars['Boolean']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  favorite_count?: Maybe<Scalars['Int']['output']>;
  favorited?: Maybe<Scalars['Boolean']['output']>;
  full_text?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  lang?: Maybe<Scalars['String']['output']>;
  media?: Maybe<Array<Maybe<TwitterMedia>>>;
  quote_count?: Maybe<Scalars['Int']['output']>;
  reply_count?: Maybe<Scalars['Int']['output']>;
  retweet_count?: Maybe<Scalars['Int']['output']>;
  retweeted?: Maybe<Scalars['Boolean']['output']>;
  user?: Maybe<TwitterUser>;
};

export type TwitterUser = {
  __typename?: 'TwitterUser';
  birthday?: Maybe<Scalars['DateTime']['output']>;
  blue_verified?: Maybe<Scalars['Boolean']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  fast_followers_count?: Maybe<Scalars['Int']['output']>;
  favourites_count?: Maybe<Scalars['Int']['output']>;
  followed_by?: Maybe<Scalars['Boolean']['output']>;
  followers_count?: Maybe<Scalars['Int']['output']>;
  following?: Maybe<Scalars['Boolean']['output']>;
  friends_count?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  listed_count?: Maybe<Scalars['Int']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  media_count?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  normal_followers_count?: Maybe<Scalars['Int']['output']>;
  pinned_tweet_ids?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  profile_banner_url?: Maybe<Scalars['String']['output']>;
  profile_image_url?: Maybe<Scalars['String']['output']>;
  screen_name?: Maybe<Scalars['String']['output']>;
  statuses_count?: Maybe<Scalars['Int']['output']>;
  verified?: Maybe<Scalars['Boolean']['output']>;
};
