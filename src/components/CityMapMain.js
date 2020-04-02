import React from "react";
import "./CityMapMain.scss";

function CityMapMain() {
  return (
    <div className="mainContainer">
      <div>This is an Intro</div>
      <div onClick={() => {
        window.location = './map'
      }}>Enter</div>
    </div>
  );
}

export default CityMapMain;
