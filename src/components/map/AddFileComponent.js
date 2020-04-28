import React, { useContext, useState, useEffect } from 'react';

import SearchBox from './SearchBox';
import MapComponent from './MapComponent';
import api from '../../services/apiService';
import './AddFileComponent.scss';
import MapInstuctions from './MapInstuctions';

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

  // ------ Instructions function

  const dontShowInstructionsAgain = () => {
    setHidePermanetly(!hidePermanetly);
  };

  const closeInstructions = () => {
    try {
      if (localStorage) {
        setShowInstructions(0);
        if (hidePermanetly) {
          localStorage.setItem('cityData_showUploadInstructions', 0);
        }
      }
    } catch (e) {}
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
          <MapInstuctions
            instructionsClass={instructionsClass}
            hidePermanetly={hidePermanetly}
            closeInstructions={closeInstructions}
            dontShowInstructionsAgain={dontShowInstructionsAgain}
          />
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
