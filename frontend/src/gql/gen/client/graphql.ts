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

export type GetShelfItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetShelfItemsQuery = { __typename?: 'Query', shelfItems: Array<{ __typename?: 'ShelfItem', ulid: string, name: string, description: string, category: { __typename?: 'ShelfCategory', ulid: string, name: string }, tags: Array<{ __typename?: 'ShelfTag', ulid: string, name: string }>, location: { __typename?: 'ShelfLocation', ulid: string, name: string } }> };

export type GetShelfItemQueryVariables = Exact<{
  ulid: Scalars['String']['input'];
}>;


export type GetShelfItemQuery = { __typename?: 'Query', shelfItem?: { __typename?: 'ShelfItem', ulid: string, name: string, description: string, category: { __typename?: 'ShelfCategory', ulid: string, name: string }, tags: Array<{ __typename?: 'ShelfTag', ulid: string, name: string }>, location: { __typename?: 'ShelfLocation', ulid: string, name: string } } | null };


export const GetShelfItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetShelfItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shelfItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetShelfItemsQuery, GetShelfItemsQueryVariables>;
export const GetShelfItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetShelfItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shelfItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ulid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetShelfItemQuery, GetShelfItemQueryVariables>;