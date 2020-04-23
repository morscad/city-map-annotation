import React from 'react';
import { Link } from 'react-router-dom';

import './CityMapMain.scss';
import MainLayout from '../layout/MainLayout';

import homepageLogoLeft from '../assets/images/LogoLeft.png';
import homepageLogoRight from '../assets/images/LogoRight.png';

function CityMapMain() {
  return (
    <MainLayout>
      <div className="mainContainer">
        <div className={'homepageLogoContainer'}>
          <div className={'homepageLogo'}>
            <div className={'logo'}>
              <div>
                <div class={'motionContainer'}>
                  <img src={homepageLogoLeft} alt={'Caity Data Stories Home Page'} />
                </div>
              </div>
              <div>
                <div className={'motionContainer'}>
                  <img src={homepageLogoRight} alt={'Caity Data Stories Home Page'} />
                </div>
              </div>
            </div>
            <div className={'link'}>
              <Link to={'/map'}>enter &raquo;</Link>
            </div>
          </div>
          <div className={'logoFooter'}>A New York University Research Project</div>
        </div>
      </div>
    </MainLayout>
  );
}

export default CityMapMain;
