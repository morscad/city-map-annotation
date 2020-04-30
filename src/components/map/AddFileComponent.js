import React, { useContext, useState, useEffect } from 'react';

import SearchBox from './SearchBox';
import MapComponent from './MapComponent';
import './AddFileComponent.scss';
import MapInstuctions from './MapInstuctions';
import AddAnnotationsDialogue from "./AddAnnotationsDialogue";

const AddFileComponent = ({ MapContext, refreshData }) => {
  const [mapState, setMapState] = useContext(MapContext);
  const [selectedClick, setSelectedClick] = useState();
  const [showInstructrions, setShowInstructions] = useState(1);
  const [showUploadPopup, setShowUploadPopup] = useState(0);
  const [hidePermanetly, setHidePermanetly] = useState(false);
  const [instructionsClass, seInstructionsClass] = useState('hide');


  const handleAnnotationPointSelect = (lat, lng) => {
    console.log('handleAnnotationPointSelect', lat, lng);
    setSelectedClick({ lat: lat, lng: lng });
    setShowUploadPopup(1);
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

  const closeAnnotationsDialogue = () => {
    setShowUploadPopup(0);
    setMapState({...mapState, openAnnotateOverlay:false});
    refreshData();
  }

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
      <div className={'mapBlockAdd'}>
        {showInstructrions === 1 && (
          <MapInstuctions
            instructionsClass={instructionsClass}
            hidePermanetly={hidePermanetly}
            closeInstructions={closeInstructions}
            dontShowInstructionsAgain={dontShowInstructionsAgain}
          />
        )}
        {showUploadPopup === 1 && (
            <AddAnnotationsDialogue context={MapContext} clickLocation={selectedClick} close={closeAnnotationsDialogue}/>
        )}
        <SearchBox MapContext={MapContext} showEyebrow={false} />
        <div className={'shortInstructions'}>
          Click anywhere on the map to add your annotations
        </div>
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
