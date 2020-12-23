import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";

const Access = lazy(() => import("./Access"));
const Header = lazy(() => import("./Header"));
const Main = lazy(() => import("./Main"));
const Meeting = lazy(() => import("./Meeting"));

const App = () => {
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
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        {!user ? (
          <Suspense fallback={<div>Loading...</div>}>
            <Route path="/register" component={Access} />
            <Route path="/" exact component={Access} />
          </Suspense>
        ) : (
          <Suspense fallback={<div>Loading...</div>}>
            <Route path="/" exact component={Header} />
            <Route path="/" exact component={Main} />
            <Route path="/room/:roomID" component={Meeting} />
          </Suspense>
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
