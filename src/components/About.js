import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';

import MainLayout from '../layout/MainLayout';
import './About.scss';

const About = () => {
  const [allowReroute, setAllowReroute] = useState(false);
  return (
    <MainLayout>
      {allowReroute && <Redirect to="/map" />}
      <div className={'videoContainer'}>
        <iframe
          src="https://player.vimeo.com/video/413972673"
          width="1200"
          height="675"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      </div>
      <div className={'buttonContainer'}>
        <div className={'button'} onClick={() => { setAllowReroute(true)}}>Go to the map</div>
      </div>
      <div className={'contentContainer'}>
        <div>
          City Data Stories is a multi-phase research project for creating a digital platform that allows users to co-create
          multi-sensory geographies and contribute to the ongoing narrative of their city.
        </div>

        <div>
          Users can annotate the city with visual and oral stories by using a web platform that leverages Google Maps to allow
          people to upload their media to a specific location or address.
        </div>

        <div>
          The result is a location-specific crowdsourced database of media and texts, which will later be used to create a
          mediated augmented reality urban walk that brings viewers on a journey that tells the story of the city through data.
        </div>

        <div>
          On top of user-generated content, City Data Stories uses data from two other source:
          <ul>
            <li>
              The Opportunity Atlas project, which was created by researchers at Harvard University, Brown University, and the
              United States Census Bureau;
            </li>
            <li>A crowdsourced database of urban tags from the Hoodmaps website;</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
