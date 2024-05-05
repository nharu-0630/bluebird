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
  uploadShelfItemImage?: Maybe<ShelfImage>;
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

export type ShelfCategory = {
  __typename?: 'ShelfCategory';
  name: Scalars['String']['output'];
  ulid: Scalars['String']['output'];
};

export type ShelfImage = {
  __typename?: 'ShelfImage';
  baseUri: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type ShelfItem = {
  __typename?: 'ShelfItem';
  category: ShelfCategory;
  description: Scalars['String']['output'];
  images: Array<ShelfImage>;
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


export type GetShelfItemsQuery = { __typename?: 'Query', shelfItems: Array<{ __typename?: 'ShelfItem', ulid: string, name: string, description: string, category: { __typename?: 'ShelfCategory', ulid: string, name: string }, tags: Array<{ __typename?: 'ShelfTag', ulid: string, name: string }>, location: { __typename?: 'ShelfLocation', ulid: string, name: string }, images: Array<{ __typename?: 'ShelfImage', baseUri: string, token: string }> }> };

export type GetShelfItemQueryVariables = Exact<{
  ulid: Scalars['String']['input'];
}>;


export type GetShelfItemQuery = { __typename?: 'Query', shelfItem?: { __typename?: 'ShelfItem', ulid: string, name: string, description: string, category: { __typename?: 'ShelfCategory', ulid: string, name: string }, tags: Array<{ __typename?: 'ShelfTag', ulid: string, name: string }>, location: { __typename?: 'ShelfLocation', ulid: string, name: string }, images: Array<{ __typename?: 'ShelfImage', baseUri: string, token: string }> } | null };

export type GetDeletedShelfItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDeletedShelfItemsQuery = { __typename?: 'Query', deletedShelfItems: Array<{ __typename?: 'ShelfItem', ulid: string, name: string, description: string, category: { __typename?: 'ShelfCategory', ulid: string, name: string }, tags: Array<{ __typename?: 'ShelfTag', ulid: string, name: string }>, location: { __typename?: 'ShelfLocation', ulid: string, name: string }, images: Array<{ __typename?: 'ShelfImage', baseUri: string, token: string }> }> };

export type GetDeletedShelfItemQueryVariables = Exact<{
  ulid: Scalars['String']['input'];
}>;


export type GetDeletedShelfItemQuery = { __typename?: 'Query', deletedShelfItem?: { __typename?: 'ShelfItem', ulid: string, name: string, description: string, category: { __typename?: 'ShelfCategory', ulid: string, name: string }, tags: Array<{ __typename?: 'ShelfTag', ulid: string, name: string }>, location: { __typename?: 'ShelfLocation', ulid: string, name: string }, images: Array<{ __typename?: 'ShelfImage', baseUri: string, token: string }> } | null };

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


export const GetShelfItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetShelfItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shelfItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"baseUri"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]}}]} as unknown as DocumentNode<GetShelfItemsQuery, GetShelfItemsQueryVariables>;
export const GetShelfItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetShelfItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shelfItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ulid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"baseUri"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]}}]} as unknown as DocumentNode<GetShelfItemQuery, GetShelfItemQueryVariables>;
export const GetDeletedShelfItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDeletedShelfItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletedShelfItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"baseUri"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]}}]} as unknown as DocumentNode<GetDeletedShelfItemsQuery, GetDeletedShelfItemsQueryVariables>;
export const GetDeletedShelfItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDeletedShelfItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletedShelfItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ulid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"baseUri"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]}}]} as unknown as DocumentNode<GetDeletedShelfItemQuery, GetDeletedShelfItemQueryVariables>;
export const GetShelfCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetShelfCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shelfCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetShelfCategoriesQuery, GetShelfCategoriesQueryVariables>;
export const GetShelfTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetShelfTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shelfTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetShelfTagsQuery, GetShelfTagsQueryVariables>;
export const GetShelfLocationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetShelfLocations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shelfLocations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetShelfLocationsQuery, GetShelfLocationsQueryVariables>;
export const CreateShelfItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateShelfItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryUlid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tagsUlid"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locationUlid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createShelfItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"categoryUlid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryUlid"}}},{"kind":"Argument","name":{"kind":"Name","value":"tagsUlid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tagsUlid"}}},{"kind":"Argument","name":{"kind":"Name","value":"locationUlid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locationUlid"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<CreateShelfItemMutation, CreateShelfItemMutationVariables>;
export const UpdateShelfItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateShelfItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryUlid"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tagsUlid"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locationUlid"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateShelfItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ulid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ulid"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"categoryUlid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryUlid"}}},{"kind":"Argument","name":{"kind":"Name","value":"tagsUlid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tagsUlid"}}},{"kind":"Argument","name":{"kind":"Name","value":"locationUlid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locationUlid"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ulid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<UpdateShelfItemMutation, UpdateShelfItemMutationVariables>;
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