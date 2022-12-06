import React from "react";
import exit from "./img/exit.png";


const ModalRemoverPostagem = ({ id = "modal", onClose = () => {}, children }) => {
  const handleOutsideClick2 = (e) => {
    if (e.target.id === id) onClose();
  };

  
  return (
    <div id={id} className="modal" onClick={handleOutsideClick2}>
      <div className="container-modal2">
        <div className="flex">
          <p className="titulo">Apagar publicação</p>

          <img src={exit} className="close" onClick={onClose} alt="Sair" />
        </div>
        <div className="content-modal">{children}</div>
      </div>
    </div>
  );
};

export default ModalRemoverPostagem;
