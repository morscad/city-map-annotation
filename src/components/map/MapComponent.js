import React, { useContext, useState, useEffect } from 'react';
import './MapComponent.scss';
import { GoogleMap } from '@react-google-maps/api';
import { isFunction } from 'lodash';
import retroMapStyle from '../../mapStyle/retroMapStyle'
import silverMapStyle from '../../mapStyle/silverMapStyle'

const MapComponent = ({ MapContext, children, mapStyle, resetAnnotations, callAnnotationService, handleAnnotationPointSelect  }) => {
  const [mapState, setMapState] = useContext(MapContext);
  const [map, setMap] = useState();

  const onMapBoundsChanged = (force = false) => {
    if (map && isFunction(map.getCenter)) {
      if (force || (!force && (map.getCenter().lng() !== mapState.lng || map.getCenter().lat() !== mapState.lat || map.getZoom() !== mapState.zoom))) {
        const { Ua, Ya } = map.getBounds();
        setMapState({
          ...mapState,
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
      options={{
          styles: mapStyle === 'retro' ? retroMapStyle : silverMapStyle,
      }}
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
