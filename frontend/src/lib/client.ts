import { ApolloClient, InMemoryCache } from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const httpLink = createUploadLink({
  uri: "http://localhost/api/query",
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});