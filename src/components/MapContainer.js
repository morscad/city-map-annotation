import React, { useState, useContext, useEffect } from 'react';

import { OverlayView } from '@react-google-maps/api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAudio, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

import MainLayout from '../layout/MainLayout';
import './MapContainer.scss';
import api from '../services/apiService';
import SearchBox from './map/SearchBox';
import MapComponent from './map/MapComponent';
import AddFileComponent from './map/AddFileComponent';
import AnnotationDetail from "./map/AnnotationDetail";

const MapContainer = ({ MapContext }) => {
  let delayCounter;
  const [mapState, setMapState] = useContext(MapContext);

  const [hoodmapsTags, setHoodmapsTags] = useState([]);
  const [images, setImages] = useState([]);
  const [showImages, setShowImages] = useState(true);
  const [showSounds, setShowSounds] = useState(true);
  const [showTags, setShowTags] = useState(true);

  const [popOverClass, setPopOverClass] = useState('');
  const [leftBtnClass, setLeftBtnClass] = useState('initLeftButton');
  const [rightBtnClass, setRightBtnClass] = useState('initRightButton');

  const [mediaDetailedFileIndex, setMediaDetailedFileIndex] = useState(-1);

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

  const closeDetailsPopup = () => {
    setMediaDetailedFileIndex(-1);
  }

  useEffect(() => {
    if (mapState.openAnnotateOverlay) {
      setPopOverClass('popContainerIn');
      setLeftBtnClass('hideLeftButton');
      setRightBtnClass('showRightButton');
    } else {
      if (popOverClass !== '') {
        setPopOverClass('popContainerOut');
        setLeftBtnClass('showLeftButton');
        setRightBtnClass('hideRightButton');
      }
    }
  }, [mapState.openAnnotateOverlay]);

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
                <input
                  type="checkbox"
                  checked={showTags}
                  onClick={() => {
                    setShowTags(!showTags);
                  }}
                />
                <span className="checkmark"></span>
              </label>
            </div>
            <div className={'filtersSelector'}>
              <label className="checkmarkContainer">
                Images
                <input
                  type="checkbox"
                  checked={showImages}
                  onClick={() => {
                    setShowImages(!showImages);
                  }}
                />
                <span className="checkmark"></span>
              </label>
            </div>
            <div className={'filtersSelector'}>
              <label className="checkmarkContainer">
                Sounds
                <input
                  type="checkbox"
                  checked={showSounds}
                  onClick={() => {
                    setShowSounds(!showSounds);
                  }}
                />
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <MapComponent
            MapContext={MapContext}
            resetAnnotations={resetAnnotations}
            callAnnotationService={callAnnotationService}
            mapStyle={'retro'}
          >
            {showTags &&
              hoodmapsTags.map((hoodmapTag, index) => {
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

            {(showImages || showSounds) &&
              images.map((mediaFile, index) => {
                const position = { lat: mediaFile.latitude, lng: mediaFile.longitude };
                return (
                  <OverlayView position={position} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET} key={`tages_${index}`}>
                    <div className={'imageTag'}>
                      {showImages && mediaFile.fileMimeType.indexOf('image/') > -1 && (
                        <div
                          onClick={() => {
                            setMediaDetailedFileIndex(index);
                          }}
                        >
                          <img src={`${process.env.REACT_APP_SERVER_URL}/images/resized/${mediaFile.filename}`} alt={mediaFile.title} />
                        </div>
                      )}
                      {showSounds && mediaFile.fileMimeType.indexOf('audio/') > -1 && (
                        <div
                          onClick={() => {
                            setMediaDetailedFileIndex(index);
                          }}
                        >
                          <FontAwesomeIcon icon={faFileAudio} />
                        </div>
                      )}
                    </div>
                  </OverlayView>
                );
              })}
          </MapComponent>
        </div>
      </div>

      {mediaDetailedFileIndex > -1 && <AnnotationDetail mediaObj={images[mediaDetailedFileIndex]} close={closeDetailsPopup} />}

      <div
        className={`addYours ${leftBtnClass}`}
        onClick={() => {
          setMapState({ ...mapState, openAnnotateOverlay: true });
        }}
      >
        <div className={'addYoursText'}>add yours</div>
        <div className={'addYoursCircle'}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>

      <div
        className={`closeAddYours ${rightBtnClass}`}
        onClick={() => {
          setMapState({ ...mapState, openAnnotateOverlay: false });
        }}
      >
        <div className={'addYoursText'}>Close</div>
        <div className={'addYoursCircle'}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>

      <div className={`myMapContainer ${popOverClass}`}>
        <AddFileComponent MapContext={MapContext} refreshData={getLocationAnnotation} />
      </div>
    </MainLayout>
  );
};

export default MapContainer;
