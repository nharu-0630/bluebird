import { ApolloClient, InMemoryCache } from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const httpLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_HOST_NAME + "/api",
});


export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
}); 