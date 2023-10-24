import React from "react";
import Articlecontent from "./content";
import { Outlet } from "react-router-dom";

const Acontent: React.FC = () => {
  return (
    <>
      <div>
        <Articlecontent />
      </div>
    </>
  );
};

export default Acontent;
