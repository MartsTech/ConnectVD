import { LinearProgress } from "@material-ui/core";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";

const Access = lazy(() => import("./Access"));
const Main = lazy(() => import("./Home"));
const Meeting = lazy(() => import("./Meeting"));

const App: React.FC = () => {
  const [{ data }] = useMeQuery();

  return (
    <BrowserRouter>
      <Switch>
        {!data?.me ? (
          <Suspense fallback={<LinearProgress />}>
            <Route path="/register" component={Access} />
            <Route path="/login" exact component={Access} />
          </Suspense>
        ) : (
          <Suspense fallback={<LinearProgress />}>
            <Route path="/" exact component={Main} />
            <Route path="/room/:roomId" component={Meeting} />
          </Suspense>
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
