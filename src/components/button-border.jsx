import React from "react";
import "./css/Button.css";
import { useState } from "react";
import Modal from "./Modal";
import "./css/EnvioPerguntas.css";


  const ButtonBorder = ({ children, onClick }) => {
    return (
      <button onClick={onClick} className="click-button-border">
        {children}
      </button>
    );
  };

export default ButtonBorder;
