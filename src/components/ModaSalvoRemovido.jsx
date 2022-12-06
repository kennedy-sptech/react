import React from "react";
import exit from "./img/exit.png";


const ModalSalvoRemovido = ({ id = "modal", onClose = () => {}, children }) => {
  const handleOutsideClick = (e) => {
    if (e.target.id === id) onClose();
  };

  
  return (
    <div id={id} className="modal" onClick={handleOutsideClick}>
      <div className="container-modal3">
        <div className="flex">
          <p className="titulo">Item removido com sucesso! ✅</p>

          <img src={exit} className="close" onClick={onClose} alt="Sair" />
        </div>
        <div className="content-modal">{children}</div>
      </div>
    </div>
  );
};

export default ModalSalvoRemovido;