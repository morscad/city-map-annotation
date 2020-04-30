import React from 'react';
import moment from 'moment';
import './AnnotationDetail.scss';
import PopupLayout from '../../layout/PopupLayout';

const AnnotationDetail = ({ close, mediaObj }) => {
  console.log(mediaObj);
  return (
    <PopupLayout close={close}>
      <div className={'detailsOuterContainer'}>
        <div className={'mediaDetailsContainer'}>
          {mediaObj.type === 'images' && (
            <div className={'imageDetailsContainer'}>
              <img src={`${process.env.REACT_APP_SERVER_URL}/images/original/${mediaObj.filename}`} alt={mediaObj.title} />
            </div>
          )}
          {mediaObj.type === 'sounds' && (
            <div className={'imageDetailsContainer'}>
              <audio controls>
                <source
                  src={`${process.env.REACT_APP_SERVER_URL}/images/original/${mediaObj.filename}`}
                  type={mediaObj.fileMimeType}
                />
              </audio>
            </div>
          )}
        </div>
        <div className={'contentDetailsContainer'}>
          <div className={'captionsTitle'}>{mediaObj.title}</div>
          <div className={'captionsBody'}>{mediaObj.captions}</div>
          <div className={'authorBody'}>
            Published by {mediaObj.authorName} on {moment(mediaObj.uploadedOn).format('MMMM Do YYYY, h:mm:ss a')}
          </div>
        </div>
      </div>
    </PopupLayout>
  );
};
export default AnnotationDetail;
