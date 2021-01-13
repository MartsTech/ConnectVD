import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import App from "./pages/App";
import { client } from "./utils/apolloClient";
import "./styles/index.css";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ApolloProvider>,
  document.querySelector("#root")
);
