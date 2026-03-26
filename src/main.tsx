import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apolloClient";
import { PickupPointMap } from "./PickupPointMap";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <PickupPointMap />
    </ApolloProvider>
  </React.StrictMode>
);
