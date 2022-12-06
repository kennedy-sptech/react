import React, { useEffect, useState } from "react";
import userFoto from "../img/userpadradark.svg";
import likeUnselect from "../img/likeunselect.svg";
import like from "../img/like.svg";
import salvar from "../img/saveunselect.svg";
import "../css/publicacao.scss";
import Comentar from "../../Layout/comentar.js";
import ModalResponder from "./ModalResponder";
import ModalPrecisaMotivoRecusar from "./ModalPrecisaMotivoRecusar";
import ModalPostagemAprovada from "./ModalPostagemAprovada";
import ModalPostagemRecusada from "./ModalPostagemRecusada";
import ModalPerguntaAprovada from "./ModalPerguntaAprovada";
import ModalPerguntaRecusada from "./ModalPerguntaRecusada";
import ModalErro from "./ModalErro";
import ModalRespondida from "./ModalRespondida";
import Button from "./button";
import api from "../../api";
import ButtonOutline from "./buttonoutline";
import { isConstructSignatureDeclaration } from "typescript";
import StatusPergunta from "./statuspergunta";
import InformacaoModeradorFeed from "./informacaoModerador";
import RespostaModeradorFeed from "./respostaModeradoR";
import RespostaFeed from "./resposta";
import InformacaoFeed from "./informacao";
import PerguntaFeed from "./pergunta";

const Publicacao = ({ publicacao }) => {

  const [curtirr, setCurtir] = useState();
  const [curtidas, setCurtidas] = useState();
  const [qtd, setQtd] = useState(publicacao.countCurtidas);

  let id = window.sessionStorage.id;
  let acesso = window.sessionStorage.acesso;
  let idPublicacaodavez = publicacao.idPublicacao;
  let idInt = parseInt(id);
  let publicacaoInt = parseInt(idPublicacaodavez);

  function vercurtida() {
    api
      .get(`/curtidas/verificar?idUsu=${idInt}&idPub=${publicacaoInt}`)
      .then((respostaEnviada) => {
        console.log("CURTI?!!!", respostaEnviada.data);
        if (respostaEnviada.data == true) {
          setCurtidas(1);
          console.log("true", curtidas);
        } else {
          setCurtidas(2);
          console.log("false", curtidas);
        }
      })
      .catch((erroOcorrido) => {
        console.log("erro ocorrido: ", erroOcorrido);
      });
  }

  useEffect(
    () => {
      console.log(
        "CHAMADO QUANDO O COMPONENTE É MONTADO, E QUANDO O ESTADO 'qtd' É ALTERADO, SOMENTE!"
      );
      vercurtida();
    },
    [qtd],
    [curtirr]
  );


  return (
    <>
      {acesso == 3 ? (
        publicacao.tipoPublicacao == 1 && publicacao.status == 2 ? (
          <>
            <InformacaoModeradorFeed publicacao={publicacao} />
          </>
        ) : publicacao.status == 2 && publicacao.tipoPublicacao == 2 ? (
          <>
            <RespostaModeradorFeed publicacao={publicacao} />
          </>
        ) : (
          <></>
        )
      ) : (
        <>
          {acesso == 2 ? (
            publicacao.tipoPublicacao == 2 &&
            publicacao.respostasByIdPublicacao.length == 0 ? (
              <>
                <PerguntaFeed publicacao={publicacao} />
              </>
            ) : publicacao.tipoPublicacao == 1 && publicacao.status == 3 ? (
              <>
                <InformacaoFeed publicacao={publicacao} />
              </>
            ) : publicacao.status == 3 ? (
              <>
                <RespostaFeed publicacao={publicacao} />
              </>
            ) : (
              ""
            )
          ) : publicacao.tipoPublicacao == 1 && publicacao.status == 3 ? (
            <>
              <InformacaoFeed publicacao={publicacao} />
            </>
          ) : publicacao.status == 3 ? (
            <>
              <RespostaFeed publicacao={publicacao} />
            </>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export default Publicacao;
