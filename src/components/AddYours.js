import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import './AddYours.scss';

import SearchBox from './map/SearchBox';
import MapComponent from './map/MapComponent';
import api from '../services/apiService';
import AddFileComponent from './map/AddFileComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';

const AddYours = ({ MapContext }) => {
  const [redirectToMap, setRedirectToMap] = useState(false);

  return (
    <MainLayout>
      {redirectToMap && <Redirect to="/map" />}
      <AddFileComponent MapContext={MapContext} />
      <div
        className={`closeAddYours`}
        onClick={() => {
          setRedirectToMap(true);
        }}
      >
        <div className={'addYoursText'}>view map</div>
        <div className={'addYoursCircle'}>
          <FontAwesomeIcon icon={faBackward} />
        </div>
      </div>
    </MainLayout>
  );
};

export default AddYours;
