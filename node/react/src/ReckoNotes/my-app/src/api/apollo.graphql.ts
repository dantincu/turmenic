import {
  gql,
  ApolloClient,
  InMemoryCache,
  ApolloError,
  ApolloQueryResult,
} from "@apollo/client";

export const apiClient = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

function getQueryResultPromise<T, TResult1>(
  query: string
): Promise<ApolloQueryResult<T>> {
  return apiClient.query<T, TResult1>({ query: gql(query) });
}

export const getQueryResult = getQueryResultPromise;

export interface ServicePlatformGql {
  servicePlatforms: [
    {
      uuid: string;
      key: string;
      name: string;
      description: string;
    }
  ];
}

export const SERVICE_PLATFORMS_TEST_QUERY = `
query GetServicePlatforms {
    servicePlatforms {
        uuid
        key
        name
        description
    }
}
`;

export const queryManager = {
  getServicePlatformsTest: () =>
    getQueryResult<any, ServicePlatformGql>(SERVICE_PLATFORMS_TEST_QUERY),
};
