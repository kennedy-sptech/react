import React from "react";
import "../css/button.scss";



  const ButtonOutline = ({ children, onClick }) => {
    return (
      <button onClick={onClick} className="click-button-outline">
        {children}
      </button>
    );
  };

export default ButtonOutline;
