
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./../backend/graphql/schema/*.graphql",
  documents: "src/gql/docs/*.graphql",
  generates: {
    "src/gql/gen/": {
      config: {
        scalars: {
          Upload: "File",
        },
      },
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
