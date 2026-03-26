import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.beta.deliverygateway.io/graphql/public",
    headers: {
      "x-merchant-id": "e7e84b82-cf23-4640-80c4-2760b09190c9",
      "x-session-id": "9f2bb9e8-6653-482d-a953-3932f68dd07a",
    },
  }),
  cache: new InMemoryCache(),
});
