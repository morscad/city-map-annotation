import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MainLayout from "../layout/MainLayout";

mapboxgl.accessToken =
  "pk.eyJ1IjoibW9yc2NhZCIsImEiOiJjanR1ZnA1eGwwMTgzNGVwaWJkYXJjcTJmIn0.KVAPq4j4oST3Oc614Ihpnw";

const MapContainer = () => {
  let map  = useRef(null);
  let mapContainer = useRef(null);
  const [state, setState] = useState({
    lng: 5,
    lat: 34,
    zoom: 2
  });

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [state.lng, state.lat],
        zoom: state.zoom
      });

      map.current.on("move", () => {
        setState({
          lng: map.getCenter().lng.toFixed(4),
          lat: map.getCenter().lat.toFixed(4),
          zoom: map.getZoom().toFixed(2)
        });
      });
    }
  }, [map]);
  return (
    <MainLayout>
      <div>I am a map</div>
      <div ref={el => (mapContainer = el)} className="mapContainer" />
    </MainLayout>
  );
};

export default MapContainer;
