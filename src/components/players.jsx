import React from "react";
const Player = (props) => (
  <>
    <div className="pbox">
      <span className="name">{props.name}</span>
      <h1>{props.option}</h1>
    </div>
  </>
);

export default Player;
