import React from 'react';

import MainLayout from '../layout/MainLayout';
import './HowItWorks.scss';

const HowItWorks = () => {
  return (
    <MainLayout>
      <div className={'instructionsContainer'}>
        <div>
          Upon entering the website, users can navigate the city map, search for addresses and landmarks, zoom in and out the map,
          and watch their map update with geo-specific tags and images.
        </div>

        <div>
          They can also choose what data to display by toggling visibility by type or by data-source, and navigate the details of
          the embedded media and read their captions.
        </div>

        <div>
          {' '}
          City Data Stories uses a reporting system for identifying offensive and problematic content to be removed from the
          database. Future iterations of this platform will also include a voting system and comments.
        </div>

        <div>
          Users can choose to add their own annotations to the city map by clicking on “Add Yours”, choosing a location by
          searching or by navigating the map, and clicking on the area they wish to annotate to add their media and captions.
        </div>

        <div>Users can choose to remain anonymous or enter their name when uploading the media.</div>

        <div>
          {' '}
          Once completed, the mediated augmented reality urban walk will load annotations by proximity and use them to overlay the
          existing urban environment.
        </div>
      </div>
    </MainLayout>
  );
};

export default HowItWorks;
