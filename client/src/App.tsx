import { LinearProgress } from "@material-ui/core";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useMeQuery } from "./generated/graphql";

const Start = lazy(() => import("./pages/Start"));
const Access = lazy(() => import("./pages/Access"));
const Main = lazy(() => import("./pages/Home"));
const Meeting = lazy(() => import("./pages/Meeting"));

const App: React.FC = () => {
  const [{ data, fetching }] = useMeQuery();

  return (
    <BrowserRouter>
      <Switch>
        {data?.me && !fetching && (
          <>
            <Suspense fallback={<LinearProgress />}>
              <Route path="/" exact component={Main} />
              <Route path="/messages" component={Main} />
              <Route path="/mail" component={Main} />
              <Route path="/sendMail" component={Main} />
            </Suspense>

            <Suspense fallback={<LinearProgress />}>
              <Route path="/room/:roomId" component={Meeting} />
            </Suspense>
          </>
        )}
        {!data?.me && !fetching && (
          <Suspense fallback={<LinearProgress />}>
            <Route path="/" exact component={Start} />
            <Route path="/register" component={Access} />
            <Route path="/login" component={Access} />
          </Suspense>
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
