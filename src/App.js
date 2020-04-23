import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CityMapMain from './components/CityMapMain';
import MapContainer from './components/MapContainer';
import { LoadScript } from '@react-google-maps/api';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import AddYours from './components/AddYours';

const MapContext = React.createContext({ lng: -73.9981527, lat: 40.7308238, zoom: 15.5 });
const App = () => {
  const [mapState, setMapState] = useState({
    lng: -73.9981527,
    lat: 40.7308238,
    zoom: 15.5,
    minLng: -74.01446053081055,
    minLat: 40.724205541822558,
    maxLng: -73.98184486918946,
    maxLat: 40.73744139997255,
  });
  return (
    <MapContext.Provider value={[mapState, setMapState]}>
      <LoadScript id="google-maps-loader" googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={['places']}>
        <Router>
          <Switch>
            <Route exact path="/">
              <CityMapMain />
            </Route>
            <Route exact path="/map">
              <MapContainer MapContext={MapContext} />
            </Route>
            <Route exact path="/add-yours">
              <AddYours MapContext={MapContext} />
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
    </MapContext.Provider>
  );
};

export default App;
