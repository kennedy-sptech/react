import React from "react";
import exit from "./img/exit.png";
import { useLocation } from "react-router-dom";


const ModalMostrarISC = ({ id = "modal", onClose = () => {}, children }) => {
  const handleOutsideClick = (e) => {
    if (e.target.id === id) onClose();
  };


  const teste = useLocation().pathname;

  return (
    <div id={id} className="modal" onClick={handleOutsideClick}>
      <div className="container-modal2">
        <div className="flex">
          <p className="titulo"
          >
            Visualizando publicação postada
          </p>
          <img src={exit} className="close" onClick={onClose} alt="Sair" />
        </div>
        <div className="content-modal">{children}</div>
      </div>
    </div>
  );
};

export default ModalMostrarISC;
