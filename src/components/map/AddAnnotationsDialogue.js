import React, {useContext, useEffect, useState} from 'react';

import './AddAnnotationsDialogue.scss';
import api from '../../services/apiService';
import { faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddAnnotationsDialogue = ({ context, clickLocation, close }) => {
  const [mapState, setMapState] = useContext(context);

  const [selectedTab, setSelectedTab] = useState('images');
  const [uploadRef, setUploadRef] = useState();
  const [file, setFile] = useState();
  const [mediaPreviewFile, setMediaPreviewFile] = useState();
  const [captions, setCaptions] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!!file) {
      let fr = new FileReader();
      fr.onload = function() {
        setMediaPreviewFile({ src: fr.result, type: file.type });
      };
      fr.readAsDataURL(file);
    }
  }, [file])
  const onChangeFile = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(e.target.files);
    if (checkMimeType(e, selectedTab)) {
      setFile(e.target.files[0]);

    }
  };

  const clearFile = () => {
    setError('');
    setCaptions('');
    setAuthorName('');
    setMediaPreviewFile(null);
    setFile(null);
  };
  const uploadFile = async () => {
    const data = new FormData();
    data.append('captions', captions);
    data.append('authorName', authorName !== '' ? authorName : 'Anonymous');
    data.append('type', selectedTab);
    data.append('flagged', 0);
    data.append('fileMimeType', file.type);
    data.append('file', file);

    const result = await api.sendRequest(
      `${process.env.REACT_APP_SERVER_URL}/annotate/lng/${clickLocation.lng}/lat/${clickLocation.lat}`,
      data,
      'POST',
      false,
      false
    );
    if (result) {
      close();
    }
  };

  const checkMimeType = (event, assumedType) => {
    //getting file object
    let files = event.target.files;
    //define message container
    let err = '';
    // list allow mime type
    const types =
      assumedType === 'images'
        ? ['image/png', 'image/jpeg', 'image/gif']
        : ['audio/mpeg', 'audio/mp4', 'audio/x-aiff', 'audio/vnd.wav'];
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

      setCaptions('');
      setAuthorName('');
      setMediaPreviewFile(null);
      setFile(null);

      setError('The file type you are trying to upload is not supported');
      return false;
    }
    return true;
  };

  return (
    <>
      <input id="myInput" type="file" ref={(ref) => setUploadRef(ref)} style={{ display: 'none' }} onChange={onChangeFile} />
      <div className={'dialogueContainer'}>
        <div className={'emptyPadding'}></div>
        <div className={'dialogueInnerContainer'}>
          <div className={'tabSelector'}>
            <div
              className={`tab ${selectedTab === 'images' ? 'tabSelected' : 'tabUnSelected'}`}
              onClick={() => {
                clearFile();
                setSelectedTab('images');
              }}
            >
              Images
            </div>
            <div
              className={`tab ${selectedTab === 'sounds' ? 'tabSelected' : 'tabUnSelected'}`}
              onClick={() => {
                clearFile();
                setSelectedTab('sounds');
              }}
            >
              Sounds
            </div>
          </div>
          <div className={'panelBody'}>
            <div className={'errorContainer'}>{error !== '' && <div className={'error'}>{error}</div>}</div>
            <div className={'panelBodyContainer'}>
              <div className={'captions'}>
                {!file && (
                  <>
                    <div className={'title'}>Select your file</div>
                    <div>
                      <div> How do I choose my image?</div>
                      <div> Ask yourself the following questions:</div>
                      <ol>
                        <li>If this neighborhood had a mascot, what would it be?</li>
                        <li>If this neighborhood was an animal or an object, what would it be?</li>
                        <li>Which corner/shop/perespective better represents the soul of this neighborhood</li>
                        <li>If this is my 'hood add I want to show someone an image of where I live, which one do I choose?</li>
                      </ol>
                    </div>
                  </>
                )}
                {!!file && (
                  <>
                    <div className={'title'}>Enter Captions</div>
                    <div>
                      <textarea
                        maxlength={512}
                        onChange={(e) => {
                          setCaptions(e.target.value);
                        }}
                      >
                        {captions}
                      </textarea>
                    </div>
                    <div>
                      <input
                        placeholder={'Your Name (optional)'}
                        value={authorName}
                        onChange={(e) => {
                          setAuthorName(e.target.value);
                        }}
                      />
                    </div>
                    <div className={'operations'}>
                      <div className={'operationsBtn'} onClick={clearFile}>
                        Clear Selection
                      </div>
                      <div className={'operationsBtn'} onClick={uploadFile}>
                        Upload
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className={'file'}>
                {!file && (
                  <div
                    className={'selectorBtn'}
                    onClick={() => {
                      if (uploadRef) {
                        uploadRef.click();
                      }
                    }}
                  >
                    Select File
                  </div>
                )}
                {!!file && !!mediaPreviewFile && selectedTab === 'images' && <img src={mediaPreviewFile.src} />}
                {!!file && !!mediaPreviewFile && selectedTab === 'sounds' && (
                  <audio controls>
                    <source src={mediaPreviewFile.src} type={mediaPreviewFile.type} />
                  </audio>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={'emptyPadding'}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </div>
      </div>
    </>
  );
};

export default AddAnnotationsDialogue;
