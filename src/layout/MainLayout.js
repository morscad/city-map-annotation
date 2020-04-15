import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MainLayout.scss';
import smallLogo from '../assets/images/logo-header.png';

const MainLayout = ({ children }) => {
  let location = useLocation();
  return (
    <div className={'mainContainer'}>
      {location.pathname !== '/' && (
        <div className={'headerLayout'}>
          <div className={'headerLogo'}>
            <img src={smallLogo} alt={'City Data Stories Logo'} />
          </div>
          <div className={location.pathname === '/about' ? 'headerLinkActive' : 'headerLink'}>
            {location.pathname !== '/about' && <Link to={'/about'}>what's this? &raquo;</Link>}
            {location.pathname === '/about' && <>what's this? &raquo;</>}
          </div>
          <div
            className={location.pathname === '/how-it-works' ? 'headerLinkActive' : 'headerLink'}
          >
            {location.pathname !== '/how-it-works' && <Link to={'/how-it-works'}>how does it work? &raquo;</Link>}
            {location.pathname === '/how-it-works' && <>how does it work? &raquo;</>}
          </div>
          <div className={location.pathname === '/map' ? 'headerLinkActive' : 'headerLink'}>
            {location.pathname !== '/map' && <Link to={'/map'}>the map &raquo;</Link>}
            {location.pathname === '/map' && <>the map &raquo;</>}
          </div>
        </div>
      )}
      <div className={'mainContent'}>{children}</div>
    </div>
  );
};

export default MainLayout;
