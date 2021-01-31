import { LinearProgress } from "@material-ui/core";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";

const Start = lazy(() => import("./Start"));
const Access = lazy(() => import("./Access"));
const Main = lazy(() => import("./Home"));
const Meeting = lazy(() => import("./Meeting"));

const App: React.FC = () => {
  const [{ data, fetching }] = useMeQuery();

  return (
    <BrowserRouter>
      <Switch>
        {!data?.me && !fetching ? (
          <Suspense fallback={<LinearProgress />}>
            <Route path="/" exact component={Start} />
            <Route path="/register" component={Access} />
            <Route path="/login" component={Access} />
          </Suspense>
        ) : (
          <>
            <Suspense fallback={<LinearProgress />}>
              <Route path="/" exact component={Main} />
              <Route path="/messages" component={Main} />
              <Route path="/mail" component={Main} />
            </Suspense>

            <Suspense fallback={<LinearProgress />}>
              <Route path="/room/:roomId" component={Meeting} />
            </Suspense>
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
