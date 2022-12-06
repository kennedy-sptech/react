import React, { useEffect, useState } from "react";
import api from "../api";
import { formatRelative } from 'date-fns';
// import { ptBR } from 'date-fns/locale';

import "../css/statusPerguntas.scss";
import "../css/publicacao.scss";

import userFoto from "../img/userpadradark.svg";




import Modal from "./ModalEditar";
import Button from "./button";
import { resetState } from "react-modal/lib/helpers/ariaAppHider";
import ModalRemover from "./ModalRemover";
import ButtonOutline from "./buttonoutline";

const StatusPerguntaAtividade = ({ statuspergunta }) => {

  let acesso = window.sessionStorage.acesso;

  return (
    <>
     {acesso == 3 ? "" : 
     
     (<>
      <div className="detalhes-pub">
      <div>
        <img className="avatar" src={userFoto} alt={statuspergunta.nome} />
      </div>

      <div className="conteudo-titulo">
        <div className="frase-resposta">
          <p className="resposta-pgt">
            <span className="nome"> </span>
            respondeu a pergunta de
            <span className="nome"> {statuspergunta.nomeUsuario}</span>
          </p>
        </div>

        <div className="dados-frase-resposta">
          {/* <p className="data">{statuspergunta.data.toString()}</p> */}
          <div className="data">
            <span> {statuspergunta.dataHora} </span>

            <span className="p-destaque"> {statuspergunta.categoria} |</span>
            <span className="p-destaque"> {statuspergunta.titulo} </span>
          </div>
        </div>
      </div>
    </div>
     </>)}
    </>
  );
};

export default StatusPerguntaAtividade;
