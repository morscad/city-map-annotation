import React from 'react';
import './PopupLayout.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const PopupLayout = ({ close, children }) => {
  return (
    <div className={'popupContainer'}>
      <div className={'emptyPadding'}></div>
      <div className={'popupInnerContainer'}>{children}</div>
      <div className={'emptyPadding'} >
          <div className={'clicker'} onClick={close}><FontAwesomeIcon icon={faTimesCircle} /></div>
      </div>
    </div>
  );
};
export default PopupLayout;
