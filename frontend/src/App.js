import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import SpotPage from "./components/SpotPage";



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <header>
        <Navigation isLoaded={isLoaded} />
      </header>
      <main>
        {isLoaded && (
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/signup">
              <SignupFormPage />
            </Route>
            <Route exact path="/spots/:spotId">
              <SpotPage />
            </Route>
          </Switch>
        )}
      </main>
    </>
  );
}
export default App;
