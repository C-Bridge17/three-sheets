import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Checkin from "./components/Checkin"
import DrinkPage from "./components/DrinkPage";
import ProfilePage from './components/ProfilePage'
import BreweryPage from "./components/BreweryPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Checkin />
          </Route>
          <Route path={`/drinks/:drinkId(\\d+)`}>
            <DrinkPage />
          </Route>
          <Route path={`/users/:userId(\\d+)`}>
            <ProfilePage />
          </Route>
          <Route path={`/stores/:storeId(\\d+)`}>
            <BreweryPage />
          </Route>
        </Switch>
      )
      }
    </>
  );
}

export default App;
