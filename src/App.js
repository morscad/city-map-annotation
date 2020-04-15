import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CityMapMain from './components/CityMapMain';
import MapContainer from './components/MapContainer';
import { LoadScript } from '@react-google-maps/api';
import About from "./components/About";
import HowItWorks from "./components/HowItWorks";

const App = () => {
  return (
    <LoadScript id="google-maps-loader" googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={['places']}>
      <Router>
        <Switch>
          <Route exact path="/">
            <CityMapMain />
          </Route>
          <Route exact path="/map">
            <MapContainer />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/how-it-works">
            <HowItWorks />
          </Route>
        </Switch>
      </Router>
    </LoadScript>
  );
};

export default App;
