import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as UrqlProvider } from "urql";
import App from "./App";
import { persistor, store } from "./app/store";
import "./styles/index.css";
import { client } from "./utils/urqlClient";

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
