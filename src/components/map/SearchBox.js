import React, { useContext, useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import './SearchBox.scss';

const SearchBox = ({ MapContext, showEyebrow }) => {
  const [mapState, setMapState] = useContext(MapContext);
  const [address, setAddress] = useState('');

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
  return (
    <>
      {showEyebrow && (
        <div className={'searchEyebrow'}>
          Type and address, find an intersection, or look up a name to navigate the neighborhood's annotations
        </div>
      )}
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
      </div>
    </>
  );
};

export default SearchBox;
