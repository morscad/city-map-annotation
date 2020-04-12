import React from "react";
import { Link } from "react-router-dom";

import "./CityMapMain.scss";
import MainLayout from "../layout/MainLayout";

function CityMapMain() {
  return (
    <MainLayout>
      <div className="mainContainer">
        <div>This is an Intro</div>
        <Link to={"/map"}>Enter</Link>
      </div>
    </MainLayout>
  );
}

export default CityMapMain;
