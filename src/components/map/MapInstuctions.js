import React from 'react';
import './MapInstuctions.scss';

const MapInstuctions = ({ instructionsClass, hidePermanetly, closeInstructions, dontShowInstructionsAgain }) => {
  return (
    <div className={`instructions ${instructionsClass}`}>
      <div className={'title'}>Let's talk first!</div>
      <div className={'introBody'}>
        You too can <strike>annotate</strike> <span className={'imagify'}>imagify</span> your city by looking up an address, an
        intersection, or a location in the city, &nbsp;<u>or by clicking anywhere on the map</u> and uploading your own images to
        be associated with this location.
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
        <div className={'hideNow'} onClick={closeInstructions}>
          Close
        </div>
        <div className={'hidePermenantly'}>
          <input type={'checkbox'} checked={hidePermanetly} onClick={dontShowInstructionsAgain} /> Don't show this again!
        </div>
      </div>
    </div>
  );
};

export default MapInstuctions;
