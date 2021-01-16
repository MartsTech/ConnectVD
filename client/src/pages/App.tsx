import { LinearProgress } from "@material-ui/core";
import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { login, logout, selectUser } from "../features/userSlice";
import { auth } from "../firebase";

const Access = lazy(() => import("./Access"));
const Main = lazy(() => import("./Main"));
const Meeting = lazy(() => import("./Meeting"));

const App: React.FC<{}> = () => {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            displayName: authUser.displayName,
            uid: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        {!user ? (
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
