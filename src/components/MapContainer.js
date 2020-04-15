import React, { useState } from 'react';
import { isFunction } from 'lodash';

import { GoogleMap, OverlayView } from '@react-google-maps/api';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faSearchMinus } from '@fortawesome/free-solid-svg-icons';

import MainLayout from '../layout/MainLayout';
import './MapContainer.scss';
import api from "../services/apiService";

const MapContainer = () => {
  let delayCounter;
  const [map, setMap] = useState();
  const [hoodmapsTags, setHoodmapsTags] = useState([]);
  const [address, setAddress] = useState('');
  const [mapState, setMapState] = useState({
    lng: -73.9981527,
    lat: 40.7308238,
    zoom: 15.5,
  });

  const handleAddressChange = (searchAddress) => {
    setAddress(searchAddress);
  };

  const handleAddressSelect = (searchAddress) => {
    setAddress(searchAddress);
    geocodeByAddress(searchAddress)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setMapState({ lng: latLng.lng, lat: latLng.lat, zoom: mapState.zoom });
        console.log('Success', latLng);
      })
      .catch((error) => console.error('Error', error));
  };

  const onMapBoundsChaned = () => {
    if (map && isFunction(map.getCenter)) {
      if (
          map.getCenter().lng() !== mapState.lng ||
          map.getCenter().lat() !== mapState.lat ||
          map.getZoom() !== mapState.zoom
      ) {

        setMapState({ lng: map.getCenter().lng(), lat: map.getCenter().lat(), zoom: map.getZoom() });
        clearTimeout(delayCounter);
        delayCounter = setTimeout( getLocationAnnotation , 1000);
      }
    }
  }

  const getLocationAnnotation = async () => {
    const {Ua , Ya} = map.getBounds();
    const result = await api.sendRequest(`${process.env.REACT_APP_SERVER_URL}/minlng/${Ua.i}/maxlng/${Ua.j}/minlat/${Ya.i}/maxlat/${Ya.j}` , {} , 'GET', true );
    if(result && result.hoodmaps){
      setHoodmapsTags(result.hoodmaps);
    }
  }


  return (
    <MainLayout>
      <div className={'mapBlock'}>
        <div className={'searchEyebrow'}>
          Type and address, find an intersection, or look up a name to navigate the neighborhood's annotations
        </div>
        <div className={'controlsContainer'}>
          <div className={'searchInput'}>
            <PlacesAutocomplete value={address} onChange={handleAddressChange} onSelect={handleAddressSelect}>
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <>
                  <input
                    {...getInputProps({
                      placeholder: 'eg: 60 Washington Square S; 6th ave & West 4th; Washington Square Park, New York',
                    })}
                  />
                  {suggestions.length > 0 && (
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                          : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </PlacesAutocomplete>
          </div>
          <div className={'zoomBtn'}>
            <FontAwesomeIcon icon={faSearchPlus} />
          </div>
          <div className={'zoomBtn'}>
            <FontAwesomeIcon icon={faSearchMinus} />
          </div>
        </div>
        <div>
          <GoogleMap
            zoom={mapState.zoom}
            center={{
              lat: mapState.lat,
              lng: mapState.lng,
            }}
            mapContainerClassName={'mapContainer'}
            onLoad={(m) => {
              setMap(m);
            }}
            onDragStart={() => {
              setHoodmapsTags([]);
            }}
            onDragEnd={onMapBoundsChaned}
            onZoomChanged={() => {
              setHoodmapsTags([]);
              onMapBoundsChaned();
            }}
          >
            {
              hoodmapsTags.map((hoodmapTag, index) => {
                const position = { lat: hoodmapTag.latitude, lng: hoodmapTag.longitude };
                const fSize = 16 + (40 * hoodmapTag.votes/100);
                return (
                    <OverlayView
                        position={position}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                        key={`tages_${index}`}
                    >
                      <div className={'hoodmapsTag'} style={{fontSize: fSize}}>{hoodmapTag.tag}</div>
                    </OverlayView>
                );
            })}
          </GoogleMap>
        </div>
      </div>
    </MainLayout>
  );
};

export default MapContainer;
