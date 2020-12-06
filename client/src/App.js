import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "./CreateRoom";
import Meeting from "./Meeting";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={CreateRoom} />
        <Route path="/room/:roomID" component={Meeting} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
