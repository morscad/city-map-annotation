import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CityMapMain from "./components/CityMapMain";
import MapContainer from "./components/MapContainer";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <CityMapMain />
        </Route>
        <Route exact path="/map">
          <MapContainer />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
