import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import CreateRoom from "./CreateRoom";
import Meeting from "./Meeting";
import Login from "./Login";

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
      {user ? (
        <Switch>
          <Route path="/" exact component={CreateRoom} />
          <Route path="/room/:roomID" component={Meeting} />
        </Switch>
      ) : (
        <Login />
      )}
    </BrowserRouter>
  );
};

export default App;
