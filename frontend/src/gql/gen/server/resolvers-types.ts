import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
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
  updateShelfCategory?: Maybe<ShelfCategory>;
  updateShelfItem?: Maybe<ShelfItem>;
  updateShelfLocation?: Maybe<ShelfLocation>;
  updateShelfTag?: Maybe<ShelfTag>;
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


export type MutationUpdateShelfCategoryArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  ulid: Scalars['String']['input'];
};


export type MutationUpdateShelfItemArgs = {
  categoryUlid?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  locationUlid?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
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

export type Query = {
  __typename?: 'Query';
  shelfCategories: Array<ShelfCategory>;
  shelfCategory?: Maybe<ShelfCategory>;
  shelfItem?: Maybe<ShelfItem>;
  shelfItems: Array<ShelfItem>;
  shelfLocation?: Maybe<ShelfLocation>;
  shelfLocations: Array<ShelfLocation>;
  shelfTag?: Maybe<ShelfTag>;
  shelfTags: Array<ShelfTag>;
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

export type ShelfCategory = {
  __typename?: 'ShelfCategory';
  name: Scalars['String']['output'];
  ulid: Scalars['String']['output'];
};

export type ShelfItem = {
  __typename?: 'ShelfItem';
  category: ShelfCategory;
  description: Scalars['String']['output'];
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  ShelfCategory: ResolverTypeWrapper<ShelfCategory>;
  ShelfItem: ResolverTypeWrapper<ShelfItem>;
  ShelfLocation: ResolverTypeWrapper<ShelfLocation>;
  ShelfTag: ResolverTypeWrapper<ShelfTag>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Mutation: {};
  Query: {};
  ShelfCategory: ShelfCategory;
  ShelfItem: ShelfItem;
  ShelfLocation: ShelfLocation;
  ShelfTag: ShelfTag;
  String: Scalars['String']['output'];
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createShelfCategory?: Resolver<Maybe<ResolversTypes['ShelfCategory']>, ParentType, ContextType, RequireFields<MutationCreateShelfCategoryArgs, 'name'>>;
  createShelfItem?: Resolver<Maybe<ResolversTypes['ShelfItem']>, ParentType, ContextType, RequireFields<MutationCreateShelfItemArgs, 'categoryUlid' | 'description' | 'locationUlid' | 'name' | 'tagsUlid'>>;
  createShelfLocation?: Resolver<Maybe<ResolversTypes['ShelfLocation']>, ParentType, ContextType, RequireFields<MutationCreateShelfLocationArgs, 'name'>>;
  createShelfTag?: Resolver<Maybe<ResolversTypes['ShelfTag']>, ParentType, ContextType, RequireFields<MutationCreateShelfTagArgs, 'name'>>;
  deleteShelfCategory?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteShelfCategoryArgs, 'ulid'>>;
  deleteShelfItem?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteShelfItemArgs, 'ulid'>>;
  deleteShelfLocation?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteShelfLocationArgs, 'ulid'>>;
  deleteShelfTag?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteShelfTagArgs, 'ulid'>>;
  updateShelfCategory?: Resolver<Maybe<ResolversTypes['ShelfCategory']>, ParentType, ContextType, RequireFields<MutationUpdateShelfCategoryArgs, 'ulid'>>;
  updateShelfItem?: Resolver<Maybe<ResolversTypes['ShelfItem']>, ParentType, ContextType, RequireFields<MutationUpdateShelfItemArgs, 'ulid'>>;
  updateShelfLocation?: Resolver<Maybe<ResolversTypes['ShelfLocation']>, ParentType, ContextType, RequireFields<MutationUpdateShelfLocationArgs, 'ulid'>>;
  updateShelfTag?: Resolver<Maybe<ResolversTypes['ShelfTag']>, ParentType, ContextType, RequireFields<MutationUpdateShelfTagArgs, 'ulid'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  shelfCategories?: Resolver<Array<ResolversTypes['ShelfCategory']>, ParentType, ContextType>;
  shelfCategory?: Resolver<Maybe<ResolversTypes['ShelfCategory']>, ParentType, ContextType, RequireFields<QueryShelfCategoryArgs, 'ulid'>>;
  shelfItem?: Resolver<Maybe<ResolversTypes['ShelfItem']>, ParentType, ContextType, RequireFields<QueryShelfItemArgs, 'ulid'>>;
  shelfItems?: Resolver<Array<ResolversTypes['ShelfItem']>, ParentType, ContextType>;
  shelfLocation?: Resolver<Maybe<ResolversTypes['ShelfLocation']>, ParentType, ContextType, RequireFields<QueryShelfLocationArgs, 'ulid'>>;
  shelfLocations?: Resolver<Array<ResolversTypes['ShelfLocation']>, ParentType, ContextType>;
  shelfTag?: Resolver<Maybe<ResolversTypes['ShelfTag']>, ParentType, ContextType, RequireFields<QueryShelfTagArgs, 'ulid'>>;
  shelfTags?: Resolver<Array<ResolversTypes['ShelfTag']>, ParentType, ContextType>;
};

export type ShelfCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShelfCategory'] = ResolversParentTypes['ShelfCategory']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ulid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShelfItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShelfItem'] = ResolversParentTypes['ShelfItem']> = {
  category?: Resolver<ResolversTypes['ShelfCategory'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['ShelfLocation'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['ShelfTag']>, ParentType, ContextType>;
  ulid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShelfLocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShelfLocation'] = ResolversParentTypes['ShelfLocation']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ulid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShelfTagResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShelfTag'] = ResolversParentTypes['ShelfTag']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ulid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ShelfCategory?: ShelfCategoryResolvers<ContextType>;
  ShelfItem?: ShelfItemResolvers<ContextType>;
  ShelfLocation?: ShelfLocationResolvers<ContextType>;
  ShelfTag?: ShelfTagResolvers<ContextType>;
};

