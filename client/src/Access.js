import React from "react";
import { Canvas } from "react-three-fiber";
import "./Access.css";
import Register from "./Register";

const Access = () => {
  return (
    <div className="access">
      <div className="access__left">
        <Register />
      </div>
      <div className="access__right">
      </div>
    </div>
  );
};

export default Access;
