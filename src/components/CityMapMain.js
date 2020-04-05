import React from "react";
import {
    Link
} from "react-router-dom";

import "./CityMapMain.scss";

function CityMapMain() {
  return (
    <div className="mainContainer">
      <div>This is an Intro</div>
      <Link to={"/map"}>Enter</Link>
    </div>
  );
}

export default CityMapMain;
