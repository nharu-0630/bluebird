/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  File: { input: any; output: any; }
  Upload: { input: File; output: File; }
};

export type BucketFile = {
  __typename?: 'BucketFile';
  bucket: Scalars['String']['output'];
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
  originalName: Scalars['String']['output'];
  signedUrl: Scalars['String']['output'];
  ulid: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addShelfItemImage: BucketFile;
  createShelfCategory?: Maybe<ShelfCategory>;
  createShelfItem?: Maybe<ShelfItem>;
  createShelfLocation?: Maybe<ShelfLocation>;
  createShelfTag?: Maybe<ShelfTag>;
  deleteShelfCategory: Scalars['Boolean']['output'];
  deleteShelfItem: Scalars['Boolean']['output'];
  deleteShelfLocation: Scalars['Boolean']['output'];
  deleteShelfTag: Scalars['Boolean']['output'];
  forceDeleteShelfItem: Scalars['Boolean']['output'];
  removeShelfItemImage: Scalars['Boolean']['output'];
  restoreShelfItem: Scalars['Boolean']['output'];
  updateShelfCategory?: Maybe<ShelfCategory>;
  updateShelfItem?: Maybe<ShelfItem>;
  updateShelfLocation?: Maybe<ShelfLocation>;
  updateShelfTag?: Maybe<ShelfTag>;
};


export type MutationAddShelfItemImageArgs = {
  file: Scalars['Upload']['input'];
  ulid: Scalars['String']['input'];
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


export type MutationRemoveShelfItemImageArgs = {
  fileUlid: Scalars['String']['input'];
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

export type PoIllust = {
  __typename?: 'PoIllust';
  category: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  imageURLs?: Maybe<Array<Scalars['String']['output']>>;
  user?: Maybe<PoUser>;
};

export type PoIllusts = {
  __typename?: 'PoIllusts';
  hasNext: Scalars['Boolean']['output'];
  illusts: Array<PoIllust>;
  pinnedIllusts: Array<PoIllust>;
  user: PoUser;
};

export type PoUser = {
  __typename?: 'PoUser';
  description: Scalars['String']['output'];
  emojis: Array<Scalars['String']['output']>;
  externalURL: Scalars['String']['output'];
  id: Scalars['String']['output'];
  imageURL: Scalars['String']['output'];
  isFollowing: Scalars['Boolean']['output'];
  itemCount: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  deletedShelfItem?: Maybe<ShelfItem>;
  deletedShelfItems: Array<ShelfItem>;
  poIllustByID: PoIllust;
  poIllustsByID: PoIllusts;
  shelfCategories: Array<ShelfCategory>;
  shelfCategory?: Maybe<ShelfCategory>;
  shelfItem?: Maybe<ShelfItem>;
  shelfItems: Array<ShelfItem>;
  shelfLocation?: Maybe<ShelfLocation>;
  shelfLocations: Array<ShelfLocation>;
  shelfTag?: Maybe<ShelfTag>;
  shelfTags: Array<ShelfTag>;
  twBookmarks?: Maybe<TwTweets>;
  twFollowers?: Maybe<TwUsers>;
  twFollowing?: Maybe<TwUsers>;
  twLikes?: Maybe<TwTweets>;
  twTweetByID?: Maybe<TwTweet>;
  twTweetDetail?: Maybe<TwTweets>;
  twUserByScreenName?: Maybe<TwUser>;
  twUserTweets?: Maybe<TwTweets>;
};


export type QueryDeletedShelfItemArgs = {
  ulid: Scalars['String']['input'];
};


export type QueryPoIllustByIdArgs = {
  illustID: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  userID: Scalars['String']['input'];
};


export type QueryPoIllustsByIdArgs = {
  pageIdx?: InputMaybe<Scalars['Int']['input']>;
  userID: Scalars['String']['input'];
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


export type QueryTwBookmarksArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTwFollowersArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  userID: Scalars['String']['input'];
};


export type QueryTwFollowingArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  userID: Scalars['String']['input'];
};


export type QueryTwLikesArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  userID: Scalars['String']['input'];
};


export type QueryTwTweetByIdArgs = {
  tweetID: Scalars['String']['input'];
};


export type QueryTwTweetDetailArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  tweetID: Scalars['String']['input'];
};


export type QueryTwUserByScreenNameArgs = {
  screenName: Scalars['String']['input'];
};


export type QueryTwUserTweetsArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  userID: Scalars['String']['input'];
};

export type ShelfCategory = {
  __typename?: 'ShelfCategory';
  name: Scalars['String']['output'];
  ulid: Scalars['String']['output'];
};

export type ShelfItem = {
  __typename?: 'ShelfItem';
  category: ShelfCategory;
  description: Scalars['String']['output'];
  images: Array<BucketFile>;
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

export type TwMedia = {
  __typename?: 'TwMedia';
  expandedURL?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  mediaKey?: Maybe<Scalars['String']['output']>;
  thumbURL?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  videoURL?: Maybe<Scalars['String']['output']>;
};

export type TwTweet = {
  __typename?: 'TwTweet';
  bookmarkCount?: Maybe<Scalars['Int']['output']>;
  bookmarked?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  favoriteCount?: Maybe<Scalars['Int']['output']>;
  favorited?: Maybe<Scalars['Boolean']['output']>;
  fullText?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  lang?: Maybe<Scalars['String']['output']>;
  media: Array<TwMedia>;
  quoteCount?: Maybe<Scalars['Int']['output']>;
  replyCount?: Maybe<Scalars['Int']['output']>;
  retweetCount?: Maybe<Scalars['Int']['output']>;
  retweeted?: Maybe<Scalars['Boolean']['output']>;
  user?: Maybe<TwUser>;
};

export type TwTweets = {
  __typename?: 'TwTweets';
  cursor?: Maybe<Scalars['String']['output']>;
  tweets: Array<TwTweet>;
};

export type TwUser = {
  __typename?: 'TwUser';
  birthday?: Maybe<Scalars['DateTime']['output']>;
  blueVerified?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  fastFollowersCount?: Maybe<Scalars['Int']['output']>;
  favouritesCount?: Maybe<Scalars['Int']['output']>;
  followedBy?: Maybe<Scalars['Boolean']['output']>;
  followersCount?: Maybe<Scalars['Int']['output']>;
  following?: Maybe<Scalars['Boolean']['output']>;
  friendsCount?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  listedCount?: Maybe<Scalars['Int']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  mediaCount?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  normalFollowersCount?: Maybe<Scalars['Int']['output']>;
  pinnedTweetIDs: Array<Scalars['String']['output']>;
  profileBannerURL?: Maybe<Scalars['String']['output']>;
  profileImageURL?: Maybe<Scalars['String']['output']>;
  screenName?: Maybe<Scalars['String']['output']>;
  statusesCount?: Maybe<Scalars['Int']['output']>;
  verified?: Maybe<Scalars['Boolean']['output']>;
};

export type TwUsers = {
  __typename?: 'TwUsers';
  cursor?: Maybe<Scalars['String']['output']>;
  users: Array<TwUser>;
};

export type PoIllustByIdQueryVariables = Exact<{
  userID: Scalars['String']['input'];
  illustID: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
}>;


export type PoIllustByIdQuery = { __typename?: 'Query', poIllustByID: { __typename?: 'PoIllust', id: string, category: string, description: string, imageURLs?: Array<string> | null, user?: { __typename?: 'PoUser', id: string, name: string, imageURL: string, externalURL: string, description: string, isFollowing: boolean, emojis: Array<string>, itemCount: number } | null } };

export type PoIllustsByIdQueryVariables = Exact<{
  userID: Scalars['String']['input'];
  pageIdx?: InputMaybe<Scalars['Int']['input']>;
}>;


export type PoIllustsByIdQuery = { __typename?: 'Query', poIllustsByID: { __typename?: 'PoIllusts', hasNext: boolean, user: { __typename?: 'PoUser', id: string, name: string, imageURL: string, externalURL: string, description: string, isFollowing: boolean, emojis: Array<string>, itemCount: number }, pinnedIllusts: Array<{ __typename?: 'PoIllust', id: string, category: string, description: string }>, illusts: Array<{ __typename?: 'PoIllust', id: string, category: string, description: string }> } };

export type GetShelfItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetShelfItemsQuery = { __typename?: 'Query', shelfItems: Array<{ __typename?: 'ShelfItem', ulid: string, name: string, description: string, category: { __typename?: 'ShelfCategory', ulid: string, name: string }, tags: Array<{ __typename?: 'ShelfTag', ulid: string, name: string }>, location: { __typename?: 'ShelfLocation', ulid: string, name: string }, images: Array<{ __typename?: 'BucketFile', ulid: string, bucket: string, key: string, name: string, originalName: string, signedUrl: string }> }> };

export type GetShelfItemQueryVariables = Exact<{
  ulid: Scalars['String']['input'];
}>;


export type GetShelfItemQuery = { __typename?: 'Query', shelfItem?: { __typename?: 'ShelfItem', ulid: string, name: string, description: string, category: { __typename?: 'ShelfCategory', ulid: string, name: string }, tags: Array<{ __typename?: 'ShelfTag', ulid: string, name: string }>, location: { __typename?: 'ShelfLocation', ulid: string, name: string }, images: Array<{ __typename?: 'BucketFile', ulid: string, bucket: string, key: string, name: string, originalName: string, signedUrl: string }> } | null };

export type GetDeletedShelfItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDeletedShelfItemsQuery = { __typename?: 'Query', deletedShelfItems: Array<{ __typename?: 'ShelfItem', ulid: string, name: string, description: string, category: { __typename?: 'ShelfCategory', ulid: string, name: string }, tags: Array<{ __typename?: 'ShelfTag', ulid: string, name: string }>, location: { __typename?: 'ShelfLocation', ulid: string, name: string }, images: Array<{ __typename?: 'BucketFile', ulid: string, bucket: string, key: string, name: string, originalName: string, signedUrl: string }> }> };

export type GetDeletedShelfItemQueryVariables = Exact<{
  ulid: Scalars['String']['input'];
}>;


export type GetDeletedShelfItemQuery = { __typename?: 'Query', deletedShelfItem?: { __typename?: 'ShelfItem', ulid: string, name: string, description: string, category: { __typename?: 'ShelfCategory', ulid: string, name: string }, tags: Array<{ __typename?: 'ShelfTag', ulid: string, name: string }>, location: { __typename?: 'ShelfLocation', ulid: string, name: string }, images: Array<{ __typename?: 'BucketFile', ulid: string, bucket: string, key: string, name: string, originalName: string, signedUrl: string }> } | null };

export type GetShelfCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetShelfCategoriesQuery = { __typename?: 'Query', shelfCategories: Array<{ __typename?: 'ShelfCategory', ulid: string, name: string }> };

export type GetShelfTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetShelfTagsQuery = { __typename?: 'Query', shelfTags: Array<{ __typename?: 'ShelfTag', ulid: string, name: string }> };

export type GetShelfLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetShelfLocationsQuery = { __typename?: 'Query', shelfLocations: Array<{ __typename?: 'ShelfLocation', ulid: string, name: string }> };

export type CreateShelfItemMutationVariables = Exact<{
  name: Scalars['String']['input'];
  categoryUlid: Scalars['String']['input'];
  tagsUlid: Array<Scalars['String']['input']> | Scalars['String']['input'];
  locationUlid: Scalars['String']['input'];
  description: Scalars['String']['input'];
}>;


export type CreateShelfItemMutation = { __typename?: 'Mutation', createShelfItem?: { __typename?: 'ShelfItem', ulid: string, name: string, description: string, category: { __typename?: 'ShelfCategory', ulid: string, name: string }, tags: Array<{ __typename?: 'ShelfTag', ulid: string, name: string }>, location: { __typename?: 'ShelfLocation', ulid: string, name: string } } | null };

export type UpdateShelfItemMutationVariables = Exact<{
  ulid: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  categoryUlid?: InputMaybe<Scalars['String']['input']>;
  tagsUlid?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  locationUlid?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateShelfItemMutation = { __typename?: 'Mutation', updateShelfItem?: { __typename?: 'ShelfItem', ulid: string, name: string, description: string, category: { __typename?: 'ShelfCategory', ulid: string, name: string }, tags: Array<{ __typename?: 'ShelfTag', ulid: string, name: string }>, location: { __typename?: 'ShelfLocation', ulid: string, name: string } } | null };

export type AddShelfItemImageMutationVariables = Exact<{
  ulid: Scalars['String']['input'];
  file: Scalars['Upload']['input'];
}>;


export type AddShelfItemImageMutation = { __typename?: 'Mutation', addShelfItemImage: { __typename?: 'BucketFile', ulid: string, bucket: string, key: string, name: string, originalName: string, signedUrl: string } };

export type RemoveShelfItemImageMutationVariables = Exact<{
  ulid: Scalars['String']['input'];
  fileUlid: Scalars['String']['input'];
}>;


export type RemoveShelfItemImageMutation = { __typename?: 'Mutation', removeShelfItemImage: boolean };

export type DeleteShelfItemMutationVariables = Exact<{
  ulid: Scalars['String']['input'];
}>;


export type DeleteShelfItemMutation = { __typename?: 'Mutation', deleteShelfItem: boolean };

export type RestoreShelfItemMutationVariables = Exact<{
  ulid: Scalars['String']['input'];
}>;


export type RestoreShelfItemMutation = { __typename?: 'Mutation', restoreShelfItem: boolean };

export type ForceDeleteShelfItemMutationVariables = Exact<{
  ulid: Scalars['String']['input'];
}>;


export type ForceDeleteShelfItemMutation = { __typename?: 'Mutation', forceDeleteShelfItem: boolean };

export type CreateShelfCategoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreateShelfCategoryMutation = { __typename?: 'Mutation', createShelfCategory?: { __typename?: 'ShelfCategory', ulid: string, name: string } | null };

export type UpdateShelfCategoryMutationVariables = Exact<{
  ulid: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateShelfCategoryMutation = { __typename?: 'Mutation', updateShelfCategory?: { __typename?: 'ShelfCategory', ulid: string, name: string } | null };

export type DeleteShelfCategoryMutationVariables = Exact<{
  ulid: Scalars['String']['input'];
}>;


export type DeleteShelfCategoryMutation = { __typename?: 'Mutation', deleteShelfCategory: boolean };

export type CreateShelfTagMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreateShelfTagMutation = { __typename?: 'Mutation', createShelfTag?: { __typename?: 'ShelfTag', ulid: string, name: string } | null };

export type UpdateShelfTagMutationVariables = Exact<{
  ulid: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateShelfTagMutation = { __typename?: 'Mutation', updateShelfTag?: { __typename?: 'ShelfTag', ulid: string, name: string } | null };

export type DeleteShelfTagMutationVariables = Exact<{
  ulid: Scalars['String']['input'];
}>;


export type DeleteShelfTagMutation = { __typename?: 'Mutation', deleteShelfTag: boolean };

export type CreateShelfLocationMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreateShelfLocationMutation = { __typename?: 'Mutation', createShelfLocation?: { __typename?: 'ShelfLocation', ulid: string, name: string } | null };

export type UpdateShelfLocationMutationVariables = Exact<{
  ulid: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateShelfLocationMutation = { __typename?: 'Mutation', updateShelfLocation?: { __typename?: 'ShelfLocation', ulid: string, name: string } | null };

export type DeleteShelfLocationMutationVariables = Exact<{
  ulid: Scalars['String']['input'];
}>;


export type DeleteShelfLocationMutation = { __typename?: 'Mutation', deleteShelfLocation: boolean };

export type TwUserByScreenNameQueryVariables = Exact<{
  screenName: Scalars['String']['input'];
}>;


export type TwUserByScreenNameQuery = { __typename?: 'Query', twUserByScreenName?: { __typename?: 'TwUser', id?: string | null, name?: string | null, screenName?: string | null, verified?: boolean | null, blueVerified?: boolean | null, description?: string | null, location?: string | null, birthday?: any | null, createdAt?: any | null, friendsCount?: number | null, following?: boolean | null, fastFollowersCount?: number | null, followersCount?: number | null, normalFollowersCount?: number | null, followedBy?: boolean | null, mediaCount?: number | null, favouritesCount?: number | null, listedCount?: number | null, pinnedTweetIDs: Array<string>, profileBannerURL?: string | null, profileImageURL?: string | null, statusesCount?: number | null } | null };

export type TwUserTweetsQueryVariables = Exact<{
  userID: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type TwUserTweetsQuery = { __typename?: 'Query', twUserTweets?: { __typename?: 'TwTweets', cursor?: string | null, tweets: Array<{ __typename?: 'TwTweet', id?: string | null, fullText?: string | null, createdAt?: any | null, replyCount?: number | null, retweetCount?: number | null, quoteCount?: number | null, retweeted?: boolean | null, favoriteCount?: number | null, favorited?: boolean | null, bookmarkCount?: number | null, bookmarked?: boolean | null, lang?: string | null, user?: { __typename?: 'TwUser', id?: string | null, name?: string | null, screenName?: string | null, verified?: boolean | null, blueVerified?: boolean | null, description?: string | null, location?: string | null, birthday?: any | null, createdAt?: any | null, friendsCount?: number | null, following?: boolean | null, fastFollowersCount?: number | null, followersCount?: number | null, normalFollowersCount?: number | null, followedBy?: boolean | null, mediaCount?: number | null, favouritesCount?: number | null, listedCount?: number | null, pinnedTweetIDs: Array<string>, profileBannerURL?: string | null, profileImageURL?: string | null, statusesCount?: number | null } | null, media: Array<{ __typename?: 'TwMedia', id?: string | null, mediaKey?: string | null, expandedURL?: string | null, type?: string | null, thumbURL?: string | null, videoURL?: string | null }> }> } | null };

export type TwLikesQueryVariables = Exact<{
  userID: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type TwLikesQuery = { __typename?: 'Query', twLikes?: { __typename?: 'TwTweets', cursor?: string | null, tweets: Array<{ __typename?: 'TwTweet', id?: string | null, fullText?: string | null, createdAt?: any | null, replyCount?: number | null, retweetCount?: number | null, quoteCount?: number | null, retweeted?: boolean | null, favoriteCount?: number | null, favorited?: boolean | null, bookmarkCount?: number | null, bookmarked?: boolean | null, lang?: string | null, user?: { __typename?: 'TwUser', id?: string | null, name?: string | null, screenName?: string | null, verified?: boolean | null, blueVerified?: boolean | null, description?: string | null, location?: string | null, birthday?: any | null, createdAt?: any | null, friendsCount?: number | null, following?: boolean | null, fastFollowersCount?: number | null, followersCount?: number | null, normalFollowersCount?: number | null, followedBy?: boolean | null, mediaCount?: number | null, favouritesCount?: number | null, listedCount?: number | null, pinnedTweetIDs: Array<string>, profileBannerURL?: string | null, profileImageURL?: string | null, statusesCount?: number | null } | null, media: Array<{ __typename?: 'TwMedia', id?: string | null, mediaKey?: string | null, expandedURL?: string | null, type?: string | null, thumbURL?: string | null, videoURL?: string | null }> }> } | null };

export type TwBookmarksQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type TwBookmarksQuery = { __typename?: 'Query', twBookmarks?: { __typename?: 'TwTweets', cursor?: string | null, tweets: Array<{ __typename?: 'TwTweet', id?: string | null, fullText?: string | null, createdAt?: any | null, replyCount?: number | null, retweetCount?: number | null, quoteCount?: number | null, retweeted?: boolean | null, favoriteCount?: number | null, favorited?: boolean | null, bookmarkCount?: number | null, bookmarked?: boolean | null, lang?: string | null, user?: { __typename?: 'TwUser', id?: string | null, name?: string | null, screenName?: string | null, verified?: boolean | null, blueVerified?: boolean | null, description?: string | null, location?: string | null, birthday?: any | null, createdAt?: any | null, friendsCount?: number | null, following?: boolean | null, fastFollowersCount?: number | null, followersCount?: number | null, normalFollowersCount?: number | null, followedBy?: boolean | null, mediaCount?: number | null, favouritesCount?: number | null, listedCount?: number | null, pinnedTweetIDs: Array<string>, profileBannerURL?: string | null, profileImageURL?: string | null, statusesCount?: number | null } | null, media: Array<{ __typename?: 'TwMedia', id?: string | null, mediaKey?: string | null, expandedURL?: string | null, type?: string | null, thumbURL?: string | null, videoURL?: string | null }> }> } | null };

export type TwFollowingQueryVariables = Exact<{
  userID: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type TwFollowingQuery = { __typename?: 'Query', twFollowing?: { __typename?: 'TwUsers', cursor?: string | null, users: Array<{ __typename?: 'TwUser', id?: string | null, name?: string | null, screenName?: string | null, verified?: boolean | null, blueVerified?: boolean | null, description?: string | null, location?: string | null, birthday?: any | null, createdAt?: any | null, friendsCount?: number | null, following?: boolean | null, fastFollowersCount?: number | null, followersCount?: number | null, normalFollowersCount?: number | null, followedBy?: boolean | null, mediaCount?: number | null, favouritesCount?: number | null, listedCount?: number | null, pinnedTweetIDs: Array<string>, profileBannerURL?: string | null, profileImageURL?: string | null, statusesCount?: number | null }> } | null };

export type TwFollowersQueryVariables = Exact<{
  userID: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type TwFollowersQuery = { __typename?: 'Query', twFollowers?: { __typename?: 'TwUsers', cursor?: string | null, users: Array<{ __typename?: 'TwUser', id?: string | null, name?: string | null, screenName?: string | null, verified?: boolean | null, blueVerified?: boolean | null, description?: string | null, location?: string | null, birthday?: any | null, createdAt?: any | null, friendsCount?: number | null, following?: boolean | null, fastFollowersCount?: number | null, followersCount?: number | null, normalFollowersCount?: number | null, followedBy?: boolean | null, mediaCount?: number | null, favouritesCount?: number | null, listedCount?: number | null, pinnedTweetIDs: Array<string>, profileBannerURL?: string | null, profileImageURL?: string | null, statusesCount?: number | null }> } | null };


export const PoIllustByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PoIllustByID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"illustID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"poIllustByID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}},{"kind":"Argument","name":{"kind":"Name","value":"illustID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"illustID"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageURLs"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}},{"kind":"Field","name":{"kind":"Name","value":"externalURL"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"emojis"}},{"kind":"Field","name":{"kind":"Name","value":"itemCount"}}]}}]}}]}}]} as unknown as DocumentNode<PoIllustByIdQuery, PoIllustByIdQueryVariables>;
export const PoIllustsByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PoIllustsByID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageIdx"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"poIllustsByID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageIdx"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageIdx"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}},{"kind":"Field","name":{"kind":"Name","value":"externalURL"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"emojis"}},{"kind":"Field","name":{"kind":"Name","value":"itemCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pinnedIllusts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"illusts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<PoIllustsByIdQuery, PoIllustsByIdQueryVariables>;
export const GetShelfItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetShelfItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shelfItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"bucket"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}},{"kind":"Field","name":{"kind":"Name","value":"signedUrl"}}]}}]}}]}}]} as unknown as DocumentNode<GetShelfItemsQuery, GetShelfItemsQueryVariables>;
export const GetShelfItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetShelfItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shelfItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ulid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"bucket"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}},{"kind":"Field","name":{"kind":"Name","value":"signedUrl"}}]}}]}}]}}]} as unknown as DocumentNode<GetShelfItemQuery, GetShelfItemQueryVariables>;
export const GetDeletedShelfItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDeletedShelfItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletedShelfItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"bucket"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}},{"kind":"Field","name":{"kind":"Name","value":"signedUrl"}}]}}]}}]}}]} as unknown as DocumentNode<GetDeletedShelfItemsQuery, GetDeletedShelfItemsQueryVariables>;
export const GetDeletedShelfItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDeletedShelfItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletedShelfItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ulid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"bucket"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}},{"kind":"Field","name":{"kind":"Name","value":"signedUrl"}}]}}]}}]}}]} as unknown as DocumentNode<GetDeletedShelfItemQuery, GetDeletedShelfItemQueryVariables>;
export const GetShelfCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetShelfCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shelfCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetShelfCategoriesQuery, GetShelfCategoriesQueryVariables>;
export const GetShelfTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetShelfTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shelfTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetShelfTagsQuery, GetShelfTagsQueryVariables>;
export const GetShelfLocationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetShelfLocations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shelfLocations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetShelfLocationsQuery, GetShelfLocationsQueryVariables>;
export const CreateShelfItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateShelfItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryUlid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tagsUlid"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locationUlid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createShelfItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"categoryUlid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryUlid"}}},{"kind":"Argument","name":{"kind":"Name","value":"tagsUlid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tagsUlid"}}},{"kind":"Argument","name":{"kind":"Name","value":"locationUlid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locationUlid"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<CreateShelfItemMutation, CreateShelfItemMutationVariables>;
export const UpdateShelfItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateShelfItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryUlid"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tagsUlid"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locationUlid"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateShelfItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ulid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"categoryUlid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryUlid"}}},{"kind":"Argument","name":{"kind":"Name","value":"tagsUlid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tagsUlid"}}},{"kind":"Argument","name":{"kind":"Name","value":"locationUlid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locationUlid"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<UpdateShelfItemMutation, UpdateShelfItemMutationVariables>;
export const AddShelfItemImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddShelfItemImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addShelfItemImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ulid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}}},{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"bucket"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}},{"kind":"Field","name":{"kind":"Name","value":"signedUrl"}}]}}]}}]} as unknown as DocumentNode<AddShelfItemImageMutation, AddShelfItemImageMutationVariables>;
export const RemoveShelfItemImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveShelfItemImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fileUlid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeShelfItemImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ulid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}}},{"kind":"Argument","name":{"kind":"Name","value":"fileUlid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fileUlid"}}}]}]}}]} as unknown as DocumentNode<RemoveShelfItemImageMutation, RemoveShelfItemImageMutationVariables>;
export const DeleteShelfItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteShelfItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteShelfItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ulid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}}}]}]}}]} as unknown as DocumentNode<DeleteShelfItemMutation, DeleteShelfItemMutationVariables>;
export const RestoreShelfItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RestoreShelfItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"restoreShelfItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ulid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}}}]}]}}]} as unknown as DocumentNode<RestoreShelfItemMutation, RestoreShelfItemMutationVariables>;
export const ForceDeleteShelfItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ForceDeleteShelfItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forceDeleteShelfItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ulid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}}}]}]}}]} as unknown as DocumentNode<ForceDeleteShelfItemMutation, ForceDeleteShelfItemMutationVariables>;
export const CreateShelfCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateShelfCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createShelfCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateShelfCategoryMutation, CreateShelfCategoryMutationVariables>;
export const UpdateShelfCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateShelfCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateShelfCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ulid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateShelfCategoryMutation, UpdateShelfCategoryMutationVariables>;
export const DeleteShelfCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteShelfCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteShelfCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ulid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}}}]}]}}]} as unknown as DocumentNode<DeleteShelfCategoryMutation, DeleteShelfCategoryMutationVariables>;
export const CreateShelfTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateShelfTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createShelfTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateShelfTagMutation, CreateShelfTagMutationVariables>;
export const UpdateShelfTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateShelfTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateShelfTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ulid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateShelfTagMutation, UpdateShelfTagMutationVariables>;
export const DeleteShelfTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteShelfTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteShelfTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ulid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}}}]}]}}]} as unknown as DocumentNode<DeleteShelfTagMutation, DeleteShelfTagMutationVariables>;
export const CreateShelfLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateShelfLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createShelfLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateShelfLocationMutation, CreateShelfLocationMutationVariables>;
export const UpdateShelfLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateShelfLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateShelfLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ulid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateShelfLocationMutation, UpdateShelfLocationMutationVariables>;
export const DeleteShelfLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteShelfLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteShelfLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ulid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}}}]}]}}]} as unknown as DocumentNode<DeleteShelfLocationMutation, DeleteShelfLocationMutationVariables>;
export const TwUserByScreenNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TwUserByScreenName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"screenName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"twUserByScreenName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"screenName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"screenName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"screenName"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"blueVerified"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"friendsCount"}},{"kind":"Field","name":{"kind":"Name","value":"following"}},{"kind":"Field","name":{"kind":"Name","value":"fastFollowersCount"}},{"kind":"Field","name":{"kind":"Name","value":"followersCount"}},{"kind":"Field","name":{"kind":"Name","value":"normalFollowersCount"}},{"kind":"Field","name":{"kind":"Name","value":"followedBy"}},{"kind":"Field","name":{"kind":"Name","value":"mediaCount"}},{"kind":"Field","name":{"kind":"Name","value":"favouritesCount"}},{"kind":"Field","name":{"kind":"Name","value":"listedCount"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedTweetIDs"}},{"kind":"Field","name":{"kind":"Name","value":"profileBannerURL"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"statusesCount"}}]}}]}}]} as unknown as DocumentNode<TwUserByScreenNameQuery, TwUserByScreenNameQueryVariables>;
export const TwUserTweetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TwUserTweets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"twUserTweets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"tweets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullText"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"replyCount"}},{"kind":"Field","name":{"kind":"Name","value":"retweetCount"}},{"kind":"Field","name":{"kind":"Name","value":"quoteCount"}},{"kind":"Field","name":{"kind":"Name","value":"retweeted"}},{"kind":"Field","name":{"kind":"Name","value":"favoriteCount"}},{"kind":"Field","name":{"kind":"Name","value":"favorited"}},{"kind":"Field","name":{"kind":"Name","value":"bookmarkCount"}},{"kind":"Field","name":{"kind":"Name","value":"bookmarked"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"screenName"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"blueVerified"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"friendsCount"}},{"kind":"Field","name":{"kind":"Name","value":"following"}},{"kind":"Field","name":{"kind":"Name","value":"fastFollowersCount"}},{"kind":"Field","name":{"kind":"Name","value":"followersCount"}},{"kind":"Field","name":{"kind":"Name","value":"normalFollowersCount"}},{"kind":"Field","name":{"kind":"Name","value":"followedBy"}},{"kind":"Field","name":{"kind":"Name","value":"mediaCount"}},{"kind":"Field","name":{"kind":"Name","value":"favouritesCount"}},{"kind":"Field","name":{"kind":"Name","value":"listedCount"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedTweetIDs"}},{"kind":"Field","name":{"kind":"Name","value":"profileBannerURL"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"statusesCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mediaKey"}},{"kind":"Field","name":{"kind":"Name","value":"expandedURL"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"thumbURL"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}}]}}]}}]}}]}}]} as unknown as DocumentNode<TwUserTweetsQuery, TwUserTweetsQueryVariables>;
export const TwLikesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TwLikes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"twLikes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"tweets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullText"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"replyCount"}},{"kind":"Field","name":{"kind":"Name","value":"retweetCount"}},{"kind":"Field","name":{"kind":"Name","value":"quoteCount"}},{"kind":"Field","name":{"kind":"Name","value":"retweeted"}},{"kind":"Field","name":{"kind":"Name","value":"favoriteCount"}},{"kind":"Field","name":{"kind":"Name","value":"favorited"}},{"kind":"Field","name":{"kind":"Name","value":"bookmarkCount"}},{"kind":"Field","name":{"kind":"Name","value":"bookmarked"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"screenName"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"blueVerified"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"friendsCount"}},{"kind":"Field","name":{"kind":"Name","value":"following"}},{"kind":"Field","name":{"kind":"Name","value":"fastFollowersCount"}},{"kind":"Field","name":{"kind":"Name","value":"followersCount"}},{"kind":"Field","name":{"kind":"Name","value":"normalFollowersCount"}},{"kind":"Field","name":{"kind":"Name","value":"followedBy"}},{"kind":"Field","name":{"kind":"Name","value":"mediaCount"}},{"kind":"Field","name":{"kind":"Name","value":"favouritesCount"}},{"kind":"Field","name":{"kind":"Name","value":"listedCount"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedTweetIDs"}},{"kind":"Field","name":{"kind":"Name","value":"profileBannerURL"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"statusesCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mediaKey"}},{"kind":"Field","name":{"kind":"Name","value":"expandedURL"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"thumbURL"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}}]}}]}}]}}]}}]} as unknown as DocumentNode<TwLikesQuery, TwLikesQueryVariables>;
export const TwBookmarksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TwBookmarks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"twBookmarks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"tweets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullText"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"replyCount"}},{"kind":"Field","name":{"kind":"Name","value":"retweetCount"}},{"kind":"Field","name":{"kind":"Name","value":"quoteCount"}},{"kind":"Field","name":{"kind":"Name","value":"retweeted"}},{"kind":"Field","name":{"kind":"Name","value":"favoriteCount"}},{"kind":"Field","name":{"kind":"Name","value":"favorited"}},{"kind":"Field","name":{"kind":"Name","value":"bookmarkCount"}},{"kind":"Field","name":{"kind":"Name","value":"bookmarked"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"screenName"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"blueVerified"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"friendsCount"}},{"kind":"Field","name":{"kind":"Name","value":"following"}},{"kind":"Field","name":{"kind":"Name","value":"fastFollowersCount"}},{"kind":"Field","name":{"kind":"Name","value":"followersCount"}},{"kind":"Field","name":{"kind":"Name","value":"normalFollowersCount"}},{"kind":"Field","name":{"kind":"Name","value":"followedBy"}},{"kind":"Field","name":{"kind":"Name","value":"mediaCount"}},{"kind":"Field","name":{"kind":"Name","value":"favouritesCount"}},{"kind":"Field","name":{"kind":"Name","value":"listedCount"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedTweetIDs"}},{"kind":"Field","name":{"kind":"Name","value":"profileBannerURL"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"statusesCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mediaKey"}},{"kind":"Field","name":{"kind":"Name","value":"expandedURL"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"thumbURL"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}}]}}]}}]}}]}}]} as unknown as DocumentNode<TwBookmarksQuery, TwBookmarksQueryVariables>;
export const TwFollowingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TwFollowing"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"twFollowing"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"screenName"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"blueVerified"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"friendsCount"}},{"kind":"Field","name":{"kind":"Name","value":"following"}},{"kind":"Field","name":{"kind":"Name","value":"fastFollowersCount"}},{"kind":"Field","name":{"kind":"Name","value":"followersCount"}},{"kind":"Field","name":{"kind":"Name","value":"normalFollowersCount"}},{"kind":"Field","name":{"kind":"Name","value":"followedBy"}},{"kind":"Field","name":{"kind":"Name","value":"mediaCount"}},{"kind":"Field","name":{"kind":"Name","value":"favouritesCount"}},{"kind":"Field","name":{"kind":"Name","value":"listedCount"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedTweetIDs"}},{"kind":"Field","name":{"kind":"Name","value":"profileBannerURL"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"statusesCount"}}]}}]}}]}}]} as unknown as DocumentNode<TwFollowingQuery, TwFollowingQueryVariables>;
export const TwFollowersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TwFollowers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"twFollowers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"screenName"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"blueVerified"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"friendsCount"}},{"kind":"Field","name":{"kind":"Name","value":"following"}},{"kind":"Field","name":{"kind":"Name","value":"fastFollowersCount"}},{"kind":"Field","name":{"kind":"Name","value":"followersCount"}},{"kind":"Field","name":{"kind":"Name","value":"normalFollowersCount"}},{"kind":"Field","name":{"kind":"Name","value":"followedBy"}},{"kind":"Field","name":{"kind":"Name","value":"mediaCount"}},{"kind":"Field","name":{"kind":"Name","value":"favouritesCount"}},{"kind":"Field","name":{"kind":"Name","value":"listedCount"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedTweetIDs"}},{"kind":"Field","name":{"kind":"Name","value":"profileBannerURL"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"statusesCount"}}]}}]}}]}}]} as unknown as DocumentNode<TwFollowersQuery, TwFollowersQueryVariables>;