import React, { useState, useContext } from 'react';
import { isFunction } from 'lodash';

import { OverlayView } from '@react-google-maps/api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faSearchMinus, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

import MainLayout from '../layout/MainLayout';
import './MapContainer.scss';
import api from '../services/apiService';
import { Link } from 'react-router-dom';
import SearchBox from './map/SearchBox';
import MapComponent from './map/MapComponent';
import AddYours from "./AddYours";
import AddFileComponent from "./map/AddFileComponent";

const MapContainer = ({ MapContext }) => {
  let delayCounter;
  const [mapState, setMapState] = useContext(MapContext);

  const [hoodmapsTags, setHoodmapsTags] = useState([]);
  const [images, setImages] = useState([]);
  const [showImages, setShowImages] = useState(true);
  const [showTags, setShowTags] = useState(true);

  const [popOverClass, setPopOverClass] = useState('');
  const [leftBtnClass, setLeftBtnClass] = useState('initLeftButton');
  const [rightBtnClass, setRightBtnClass] = useState('initRightButton');

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
      <div className={'mapBlockMain'}>
        <SearchBox MapContext={MapContext} showEyebrow={true} />

        <div className={'filterContainer'}>
          <div className={'filters'}>
            <div className={'filtersTitle'}>Filters</div>
            <div className={'filtersSelector'}>
              <label className="checkmarkContainer">
                Hoodmaps
                <input type="checkbox" checked={showTags} onClick={() => { setShowTags(!showTags)}}/>
                  <span className="checkmark"></span>
              </label>
            </div>
            <div className={'filtersSelector'}>
              <label className="checkmarkContainer">
                Images
                <input type="checkbox" checked={showImages} onClick={() => { setShowImages(!showImages)}}/>
                  <span className="checkmark"></span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <MapComponent MapContext={MapContext} resetAnnotations={resetAnnotations} callAnnotationService={callAnnotationService} mapStyle={'retro'}>
            {showTags && hoodmapsTags.map((hoodmapTag, index) => {
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

            {showImages && images.map((image, index) => {
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

      <div className={`addYours ${leftBtnClass}`} onClick={() => {
        setPopOverClass('popContainerIn');
        setLeftBtnClass('hideLeftButton');
        setRightBtnClass('showRightButton');
        setMapState({...mapState, openAnnotateOverlay: true});
      }}>
        <div className={'addYoursText'}>add yours</div>
        <div className={'addYoursCircle'}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>

      <div className={`closeAddYours ${rightBtnClass}`} onClick={() => {
        setPopOverClass('popContainerOut');
        setLeftBtnClass('showLeftButton');
        setRightBtnClass('hideRightButton');
        setMapState({...mapState, openAnnotateOverlay: false});
      }}>
        <div className={'addYoursText'}>Close</div>
        <div className={'addYoursCircle'}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>


      <div className={`popupContainer ${popOverClass}`}>
        <AddFileComponent MapContext={MapContext} />
      </div>
    </MainLayout>
  );
};

export default MapContainer;
