import { LinearProgress } from "@material-ui/core";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";

const Start = lazy(() => import("./pages/Start"));
const Access = lazy(() => import("./pages/Access"));
const Main = lazy(() => import("./pages/Home"));
const Meeting = lazy(() => import("./pages/Meeting"));

const App: React.FC = () => {
  const [fetching, setFetching] = useState<boolean>(true);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email!,
          })
        );
      } else {
        dispatch(logout());
      }
      setFetching(false);
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Switch>
        {user && !fetching && (
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
        {!user && !fetching && (
          <Suspense fallback={<LinearProgress />}>
            <Route path="/" exact component={Start} />
            <Route path="/register" component={Access} />
            <Route path="/login" component={Access} />
          </Suspense>
        )}
        {fetching && <Suspense fallback={<LinearProgress />} />}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
