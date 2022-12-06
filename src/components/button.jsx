import React from "react";
import "../css/button.scss";



  const Button = ({ children, onClick }) => {
    return (
      <button onClick={onClick} className="click-button">
        {children}
      </button>
    );
  };

export default Button;
