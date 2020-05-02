import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import './MainLayout.scss';
import smallLogo from '../assets/images/logo-header.png';

const MainLayout = ({ children }) => {
  let location = useLocation();
  const [menuClass, setMenuClass] = useState('');

  const toggleMenu = () => {
    if (menuClass === 'expanded') {
      setMenuClass('contracted');
    } else {
      setMenuClass('expanded');
    }
  };
  const updateMenuClass = () => {
    if (window.innerWidth > 768 || menuClass === '') {
      setMenuClass('contracted');
    }
  };
  useEffect(() => {
    window.addEventListener('resize', updateMenuClass);
    if (menuClass === '') {
      updateMenuClass();
    }
    return () => {
      window.removeEventListener('resize', updateMenuClass);
    };
  }, [window]);

  return (
    <>
      <div className={'mainContainer'}>
        {location.pathname !== '/' && (
          <div className={`headerLayout ${menuClass}`}>
            <div
              className={`hamburgerMenu`}
              onClick={() => {
                toggleMenu();
              }}
            >
              {menuClass === 'contracted' && (
                <div className={`${menuClass === 'contracted' ? 'closedMenu' : 'openMenu'}`}>
                  <div>Menu</div>
                  <div>
                    <FontAwesomeIcon icon={faBars} />
                  </div>
                </div>
              )}

              {menuClass === 'expanded' && (
                <div className={`${menuClass === 'contracted' ? 'closedMenu' : 'openMenu'}`}>
                  <div>Close</div>
                  <div>
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                </div>
              )}
            </div>
            <div className={'headerLogo'}>
              <Link to={'/'}>
                <img src={smallLogo} alt={'City Data Stories Logo'} />
              </Link>
            </div>
            <div className={location.pathname === '/about' ? 'headerLinkActive' : 'headerLink'}>
              {location.pathname !== '/about' && <Link to={'/about'}>what's this? &raquo;</Link>}
              {location.pathname === '/about' && <>what's this? &raquo;</>}
            </div>
            <div className={location.pathname === '/how-it-works' ? 'headerLinkActive' : 'headerLink'}>
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
    </>
  );
};

export default MainLayout;
