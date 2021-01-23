import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./app/store";
import App from "./pages/App";
import "./styles/index.css";
import { client } from "./utils/urqlClient";
import { Provider as UrqlProvider } from "urql";

ReactDOM.render(
  <UrqlProvider value={client}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </UrqlProvider>,
  document.querySelector("#root")
);
