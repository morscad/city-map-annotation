import React, { useState, useContext } from 'react';
import { isFunction } from 'lodash';

import {  OverlayView } from '@react-google-maps/api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faSearchMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import MainLayout from '../layout/MainLayout';
import './MapContainer.scss';
import api from '../services/apiService';
import { Link } from 'react-router-dom';
import SearchBox from './map/SearchBox';
import MapComponent from "./map/MapComponent";

const MapContainer = ({ MapContext }) => {
  let delayCounter;

  const [hoodmapsTags, setHoodmapsTags] = useState([]);
  const [images, setImages] = useState([]);
  const [mapState, setMapState] = useContext(MapContext);

  const resetAnnotations = () => {
    setHoodmapsTags([]);
    setImages([]);
  };

  const callAnnotationService = () => {
    clearTimeout(delayCounter);
    delayCounter = setTimeout(getLocationAnnotation, 1000);
  };

  const getLocationAnnotation = async () => {
    const result = await api.sendRequest(
      `${process.env.REACT_APP_SERVER_URL}/minlng/${mapState.minLng}/maxlng/${mapState.maxLng}/minlat/${mapState.minLat}/maxlat/${mapState.maxLat}`,
      {},
      'GET',
      true
    );
    if (result && result.hoodmaps) {
      setHoodmapsTags(result.hoodmaps);
      setImages(result.images);
    }
  };

  return (
    <MainLayout>
      <div className={'mapBlock'}>
        <SearchBox MapContext={MapContext} showEyebrow={true} />

        <div className={'filterContainer'}>
          <div className={'filters'}>Filters</div>
          <Link to={{ pathname: '/add-yours', state: { mapState: mapState } }}>
            <div className={'addYours'}>
              <div className={'addYoursText'}>add yours</div>
              <div className={'addYoursCircle'}>
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </div>
          </Link>
        </div>

        <div>
          <MapComponent MapContext={MapContext} resetAnnotations={resetAnnotations} callAnnotationService={callAnnotationService}>
            {hoodmapsTags.map((hoodmapTag, index) => {
              const position = { lat: hoodmapTag.latitude, lng: hoodmapTag.longitude };
              const fSize = 16 + (40 * hoodmapTag.votes) / 100;
              return (
                <OverlayView position={position} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET} key={`tages_${index}`}>
                  <div className={'hoodmapsTag'} style={{ fontSize: fSize }}>
                    {hoodmapTag.tag}
                  </div>
                </OverlayView>
              );
            })}

            {images.map((image, index) => {
              const position = { lat: image.latitude, lng: image.longitude };
              return (
                  <OverlayView position={position} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET} key={`tages_${index}`}>
                    <div className={'imageTag'}>
                      <img src={`${process.env.REACT_APP_SERVER_URL}/images/resized/${image.filename}`} />
                    </div>
                  </OverlayView>
              );
            })}

          </MapComponent>
        </div>
      </div>
    </MainLayout>
  );
};

export default MapContainer;
