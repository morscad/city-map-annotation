import React, { useContext, useState } from 'react';
import './MapComponent.scss';
import { GoogleMap } from '@react-google-maps/api';
import { isFunction } from 'lodash';

const MapComponent = ({ MapContext, children, resetAnnotations, callAnnotationService, handleAnnotationPointSelect  }) => {
  const [mapState, setMapState] = useContext(MapContext);
  const [map, setMap] = useState();

  const onMapBoundsChanged = () => {
    if (map && isFunction(map.getCenter)) {
      if (map.getCenter().lng() !== mapState.lng || map.getCenter().lat() !== mapState.lat || map.getZoom() !== mapState.zoom) {
        const { Ua, Ya } = map.getBounds();
        setMapState({
          lng: map.getCenter().lng(),
          lat: map.getCenter().lat(),
          zoom: map.getZoom(),
          minLng: Ua.i,
          minLat: Ya.i,
          maxLng: Ua.j,
          maxLat: Ya.j,
        });
        if (callAnnotationService) {
          callAnnotationService();
        }
      }
    }
  };

  return (
    <GoogleMap
      zoom={mapState.zoom}
      center={{
        lat: mapState.lat,
        lng: mapState.lng,
      }}
      mapContainerClassName={'mapContainer'}
      clickableIcons={false}
      onClick={(e) => {
        if (handleAnnotationPointSelect) {
          handleAnnotationPointSelect(e.latLng.lat(), e.latLng.lng());
        }
      }}
      onLoad={(m) => {
        setMap(m);
      }}
      onDragStart={() => {
          if (resetAnnotations) {
              resetAnnotations();
          }
      }}
      onDragEnd={onMapBoundsChanged}
      onZoomChanged={() => {
        if (resetAnnotations) {
          resetAnnotations();
        }
        onMapBoundsChanged();
      }}
    >
      {children}
    </GoogleMap>
  );
};

export default MapComponent;
