import React from "react";
import ReactDOM from "react-dom";
import { useLocation } from "react-router-dom";

const MainLayout = ({ children }) => {
  let location = useLocation();
  console.log("::", location);
  return (
    <div className={"mainContainer"}>
      {location !== "/" && <div className={"headerLayout"}></div>}
      <div className={"mainContent"}>{children}</div>
    </div>
  );
};

export default MainLayout;
