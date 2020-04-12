import React from "react";
import { Link } from "react-router-dom";

import "./CityMapMain.scss";
import MainLayout from "../layout/MainLayout";

import homepageLogo from "../assets/images/logo-main.png";

function CityMapMain() {
  return (
    <MainLayout>
      <div className="mainContainer">
        <div className={"homepageLogoContainer"}>
          <div className={"homepageLogo"}>
            <div className={"logo"}>
              <img src={homepageLogo} />
            </div>
            <div className={"link"}>
              <Link to={"/map"}>enter &raquo;</Link>
            </div>
          </div>
          <div className={"logoFooter"}>
            A New York University Research Project
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default CityMapMain;
