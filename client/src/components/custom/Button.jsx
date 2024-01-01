import React from "react";
import "./button.css";

export default function Button  ({value , onClick,type="button"})  {
    const handleClick = (event) => {
        event.preventDefault();
        onClick();
      };
  return (
    <button  type={type} onClick={type==="button"?handleClick:undefined} className="SAVE">
      <div className="label">{value}</div>
    </button>
  );
};
