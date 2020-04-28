import React, { useContext, useState, useEffect } from 'react';

import SearchBox from './SearchBox';
import MapComponent from './MapComponent';
import api from '../../services/apiService';
import './AddFileComponent.scss';

const AddFileComponent = ({ MapContext }) => {
  const [mapState, setMapState] = useContext(MapContext);
  const [selectedClick, setSelectedClick] = useState();
  const [uploadRef, setUploadRef] = useState();
  const [showInstructrions, setShowInstructions] = useState(1);
  const [hidePermanetly, setHidePermanetly] = useState(false);
  const [instructionsClass, seInstructionsClass] = useState('hide');
  let upload;

  const onChangeFile = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (checkMimeType(e)) {
      const data = new FormData();
      data.lat = selectedClick.lat;
      data.lng = selectedClick.lng;
      console.log(e.target.files[0]);
      data.append('file', e.target.files[0]);

      const result = await api.sendRequest(
        `${process.env.REACT_APP_SERVER_URL}/annotate/lng/${selectedClick.lng}/lat/${selectedClick.lat}`,
        data,
        'POST',
        false,
        false
      );
      if (result) {
        setMapState({
          ...mapState,
          lng: selectedClick.lng,
          lat: selectedClick.lat,
        });
      }
    } else {
      console.log('unsupported format');
    }
  };

  const checkMimeType = (event) => {
    //getting file object
    let files = event.target.files;
    //define message container
    let err = '';
    // list allow mime type
    const types = ['image/png', 'image/jpeg', 'image/gif'];
    // loop access array
    for (let x = 0; x < files.length; x++) {
      // compare file type find doesn't matach
      if (types.every((type) => files[x].type !== type)) {
        // create error message and assign to container
        err += files[x].type + ' is not a supported format\n';
      }
    }

    if (err !== '') {
      // if message not same old that mean has error
      event.target.value = null; // discard selected file
      console.log(err);
      return false;
    }
    return true;
  };

  const handleAnnotationPointSelect = (lat, lng) => {
    console.log('handleAnnotationPointSelect', lat, lng);
    setSelectedClick({ lat: lat, lng: lng });
    console.log(upload);
    if (uploadRef) {
      uploadRef.click();
    }
  };
  useEffect(() => {
    let showInst = 0;
    if (localStorage) {
      showInst = localStorage.getItem('cityData_showUploadInstructions');
      showInst = parseInt(showInst);
      if (isNaN(showInst)) {
        showInst = 1;
      }
      setShowInstructions(showInst);
    }
  }, []);

  useEffect(() => {
    if (mapState.openAnnotateOverlay) {
      if (showInstructrions === 1 && instructionsClass === 'hide') {
        seInstructionsClass('show');
      }
    } else {
        seInstructionsClass('hide');
    }
  }, [mapState, showInstructrions]);

  return (
    <>
      <input id="myInput" type="file" ref={(ref) => setUploadRef(ref)} style={{ display: 'none' }} onChange={onChangeFile} />

      <div className={'mapBlockAdd'}>
        {showInstructrions === 1 && (
          <div className={`instructions ${instructionsClass}`}>
            <div className={'title'}>Let's talk first!</div>
            <div className={'introBody'}>
              You too can <strike>annotate</strike> <span className={'imagify'}>imagify</span> your city by looking up an address,
              an intersection, or a location in the city, &nbsp;<u>or by clicking anywhere on the map</u> and uploading your own
              images to be associated with this location.
            </div>
            <div className={'subTitle'}>How do I choose which images to upload?</div>
            <div style={{ paddingLeft: 20, paddingTop: 10 }}>
              <span> Ask yourself the following questions:</span>
              <ol>
                <li>If this neighborhood had a mascot, what would it be?</li>
                <li>If this neighborhood was an animal or an object, what would it be?</li>
                <li>Which corner/shop/perespective better represents the soul of this neighborhood</li>
                <li>If this is my 'hood add I want to show someone an image of where I live, which one do I choose?</li>
              </ol>
            </div>
            <div className={'subTitle'}>What location do I choose to annotate?</div>
            <div style={{ paddingLeft: 20, paddingTop: 10 }}>
              <span>Anywhere in the city is fairplay. Ex:</span>
              <ol>
                <li>Where you live</li>
                <li>Where your friend lives</li>
                <li>Where your partner or significant other lives</li>
                <li>Where you work</li>
                <li>Where you go to school</li>
                <li>Where you hangout on the weekends</li>
                <li>etc..</li>
              </ol>
            </div>
            <div className={'introBody'}>
              Please be considerate to others who might want to browser this website when you choose your photos.
              <br />
              but most importantly, Have fun!
            </div>
            <div className={'hideLine'}>
              <div
                className={'hideNow'}
                onClick={() => {
                  try {
                    if (localStorage) {
                      setShowInstructions(0);
                      if (hidePermanetly) {
                        localStorage.setItem('cityData_showUploadInstructions', 0);
                      }
                    }
                  } catch (e) {}
                }}
              >
                Close
              </div>
              <div className={'hidePermenantly'}>
                <input
                  type={'checkbox'}
                  checked={hidePermanetly}
                  onClick={() => {
                    setHidePermanetly(!hidePermanetly);
                  }}
                />{' '}
                Don't show this again!
              </div>
            </div>
          </div>
        )}
        <SearchBox MapContext={MapContext} showEyebrow={false} />

        <div>
          <MapComponent
            MapContext={MapContext}
            handleAnnotationPointSelect={handleAnnotationPointSelect}
            mapStyle={'silver'}
          ></MapComponent>
        </div>
      </div>
    </>
  );
};

export default AddFileComponent;
