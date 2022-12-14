import React, { useEffect, useState } from "react";
import api from "../../api";
import { formatRelative } from "date-fns";
// import { ptBR } from 'date-fns/locale';

import "../css/statusPerguntas.scss";
import "../css/editarPergunta.scss";
import "../css/removerPergunta.scss";

import view from "./img/viewon.svg";
import edit from "../img/editpencil.svg";
import unedit from "../img/uneditpencil.svg";
import delet from "./img/deleteon.svg";
import undelet from "../img/unremove.svg";

import Modal from "./ModalEditar";
import ModalRemover from "./ModalRemover";
import ModalEditada from "./ModalEditada";
import ModalExcluida from "./ModalExcluida";
import ModalErro from "./ModalErro";
import Button from "../components/button";
import ButtonOutline from "./buttonoutline";
import ModalMostrarPE from "./ModalMostrarPerguntaEnviada";
import ModalMostrarR from "./ModalMostrarPerguntaRespondida";
import ModalMostrarRRecusada from "./ModalMostrarRespondiRecusada";
import ModalMostrarISC from "./ModalMostrarInformacaoSemComentario";
import ModalMostrarIRecusada from "./ModalMostrarInformacaoRecusada";
import ModalEditarResposta from "./ModalEditarResposta";
import ModalEditarPostagem from "./ModalEditarPostagem";
import ModalMostrarPRecudasa from "./ModalMostrarPerguntaRecusada";
import ModalMostrarPEA from "./ModalMostrarPerguntaAnalise";
import ModalMostrarInformativaEmAnalise from "./ModalMostrarInformacaoEmAnalise";
import ModalMostrarInformativaAprovada from "./ModalMostrarInformacaoAprovada";
import ModalMostrarPerguntaEnviada from "./ModalMostrarPerguntaEnviada";
import ModalMostrarRespondiEmAnalise from "./ModalMostrarRespondiEmAnalise";
import ModalMostrarPerguntaAnalise from "./ModalMostrarPerguntaAnalise";
import ModalMostrarRespondida from "./ModalMostrarRespondi";
import ModalPostagemEditada from "./ModalPostagemEditada";
import ModalRespostaEditada from "./ModalRespostaEditada";
import ModalRespostaExcluida from "./ModalRespostaExcluida";
import ModalPostagemExcluida from "./ModalPostagemExcluida";
import { id } from "date-fns/locale";

const StatusPergunta = ({ statuspergunta }) => {
  useEffect(() => {
    selecionarCategoria();
    console.log("ffffffffffff", statuspergunta);
    // setState
  }, [statuspergunta]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleRemover, setModalVisibleRemover] = useState(false);
  const [isModalVisibleEditada, setModalVisibleEditada] = useState(false);
  const [isModalVisibleExcluida, setModalVisibleExcluida] = useState(false);
  const [isModalVisibleFalha, setModalVisibleFalha] = useState(false);
  const [isModalVisibleVisualizar, setModalVisibleVisualizar] = useState(false);
  const [isModalVisiblePostagemEditada, setModalVisiblePostagemEditada] =
    useState(false);
  const [isModalVisibleRespostaEditada, setModalVisibleRespostaEditada] =
    useState(false);
  const [isModalVisibleRespostaExcluida, setModalVisibleRespostaExcluida] =
    useState(false);
  const [isModalVisiblePostagemExcluida, setModalVisiblePostagemExcluida] =
    useState(false);

  const [textoInput, setTextoInput] = useState("");
  const [tituloInput, setTituloInput] = useState("");
  const [respostaInput, setRespostaInput] = useState("");

  const [selectCategoria, setSelectCategoria] = useState("");
  const [selectValue, setSelectValue] = useState(1);

  let fk = window.sessionStorage.fk;
  let acesso = window.sessionStorage.acesso;
  // let situacao = false;

  function reload() {
    window.location.reload();
    setModalVisibleEditada(false);
    setModalVisibleExcluida(false);
    setModalVisiblePostagemEditada(false);
    setModalVisiblePostagemExcluida(false);
    setModalVisibleRespostaEditada(false);
    setModalVisibleRespostaExcluida(false);
  }

  function sucessoModalVisibleRespostaEditada() {
    setModalVisible(false);
    setModalVisibleRespostaEditada(true);
  }

  function sucessoModalVisibleEditada() {
    setModalVisible(false);
    setModalVisibleEditada(true);
  }

  function sucessoModalVisiblePostagemEditada() {
    setModalVisible(false);
    setModalVisiblePostagemEditada(true);
  }

  function sucessoModalVisibleRespostaApagada() {
    setModalVisibleRemover(false);
    setModalVisibleRespostaExcluida(true);
  }

  function sucessoModalVisiblePerguntaApagada() {
    setModalVisibleRemover(false);
    setModalVisibleExcluida(true);
  }

  function sucessoModalVisiblePostagemApagada() {
    setModalVisibleRemover(false);
    setModalVisiblePostagemExcluida(true);
  }

  function selecionarCategoria() {
    api
      .get("/categorias")
      .then((respostaObtida) => {
        console.log(
          "resposta do select de categorias p criar pergunta: ",
          respostaObtida
        );
        setSelectCategoria(respostaObtida.data);
      })
      .catch((erroOcorrido) => {
        console.log("erro ocorrido: ", erroOcorrido);
      });
  }

  const motivo = `${
    statuspergunta.status == 4
      ? "A sua publica????o foi recusada porque ela menciona um tema que n??o ?? permitido discutir na comunidade."
      : statuspergunta.status == 5
      ? "A sua publica????o foi recusada porque ela possui palavras inapropriadas."
      : "A sua publica????o foi recusada por infligir as diretrizes da nossa comunidade."
  }`;

  //estiliza????o de status NOME
  const statusAtual = `${
    acesso == 2
      ? statuspergunta.status == 4 ||
        statuspergunta.status == 5 ||
        statuspergunta.status == 6
        ? statuspergunta.tipoPublicacao == 1
          ? "POSTEI"
          : "RESPONDI"
        : statuspergunta.tipoPublicacao == 2
        ? statuspergunta.status == 3
          ? "RESPONDI"
          : "RESPONDI"
        : statuspergunta.status == 3
        ? "POSTEI"
        : "POSTEI"
      : statuspergunta.status == 1
      ? "ENVIADO"
      : statuspergunta.status == 2
      ? "ANALISE"
      : statuspergunta.status == 4 ||
        statuspergunta.status == 5 ||
        statuspergunta.status == 6
      ? "RECUSADO"
      : "RESPONDIDO"
  }`;

  //estiliza????o de status COR
  const background = `${
    statuspergunta.status == 1
      ? "azul"
      : statuspergunta.status == 2
      ? "amarelo"
      : statuspergunta.status == 3
      ? "verde"
      : statuspergunta.status > 3
      ? "vermelho"
      : ""
  }`;

  function editar() {
    console.log("Enviando dados!");
    console.log("Texto: ", textoInput);
    console.log("Titulo: ", tituloInput);
    console.log("IdPubli..", statuspergunta.idPublicacao);
    console.log("fkCategoria", parseInt(selectValue));

    const objetoFormatado = {
      idPublicacao: statuspergunta.idPublicacao,
      titulo: tituloInput,
      texto: textoInput,
      fkCategoria: parseInt(selectValue),
    };

    api
      .put("/publicacoes/atualizar-duvida", objetoFormatado)
      .then((respostaObtida) => {
        console.log("resp. publicar: ");
        console.log(respostaObtida.data);
        // editadas();
        if (statuspergunta.tipoPublicacao == 1 && statuspergunta.status == 2) {
          sucessoModalVisiblePostagemEditada();
        } else if (statuspergunta.tipoPublicacao == 2 && acesso == 2) {
          sucessoModalVisibleRespostaEditada();
        } else {
          sucessoModalVisibleEditada();
        }
      })
      .catch((erroOcorrido) => {
        console.log("erro ocorrido: ", erroOcorrido);
        setModalVisibleFalha(true);
      });
  }

  function editarResposta() {
    console.log("Editando resposta: dados!");
    console.log("Texto: ", respostaInput);
    console.log(
      "IdPubli..",
      statuspergunta.respostasByIdPublicacao[0].idResposta
    );

    const objetoFormatado = {
      texto: respostaInput,
    };

    api
      .patch(
        `/respostas/atualizar-resposta?idResposta=${statuspergunta.respostasByIdPublicacao[0].idResposta}`,
        objetoFormatado
      )
      .then((respostaObtida) => {
        console.log("resp. publicar: ");
        console.log(respostaObtida.data);
        // editadas();
        if (statuspergunta.tipoPublicacao == 1 && statuspergunta.status == 2) {
          sucessoModalVisiblePostagemEditada();
        } else if (statuspergunta.tipoPublicacao == 2 && acesso == 2) {
          sucessoModalVisibleRespostaEditada();
        } else {
          sucessoModalVisibleEditada();
        }
      })
      .catch((erroOcorrido) => {
        console.log("erro ocorrido: ", erroOcorrido);
        setModalVisibleFalha(true);
      });
  }

  function validarPerguntaEditada() {
    console.log("entrei em validar pergunta");
    editar();
  }

  function validarPostagemEditada() {
    console.log("entrei em validar POSTAGEM");
    editarResposta();
  }

  function deletar() {
    console.log("Apagando publicacao");
    console.log("titulo :", statuspergunta.titulo);

    api
      .delete(`/publicacoes/apagar-duvida?id=${statuspergunta.idPublicacao}`)
      .then((respostaObtida) => {
        sucessoModalVisiblePostagemApagada();
      })
      .catch((erroOcorrido) => {
        console.log("N??o foi possivel apagar");
        console.log("erro ocorrido: ", erroOcorrido);
        setModalVisibleFalha(true);
      });
  }

  function deletarResposta() {
    let id = parseInt(statuspergunta.respostasByIdPublicacao[0].idResposta);
    console.log("idresposta", id);
    api
      .delete(`/respostas?id=${id}`)
      .then((respostaObtida) => {
        
        sucessoModalVisibleRespostaApagada();
        alterarstatus(1);
      })
      .catch((erroOcorrido) => {
        console.log("N??o foi possivel apagar");
        console.log("erro ocorrido: ", erroOcorrido);
        setModalVisibleFalha(true);
      });
  }

  function alterarstatus(status) {
    api
      .patch(
        `/publicacoes/update-status?idPublicacao=${statuspergunta.idPublicacao}&status=${status}`
      )
      .then((respostaObtida) => {
     
      })
      .catch((erroOcorrido) => {
        console.log("N??o foi possivel alterar o status");
        console.log("erro ocorrido: ", erroOcorrido);
      });
  }

  function deletarperguntarecusadacomresposta() {
    let id = parseInt(statuspergunta.respostasByIdPublicacao[0].idResposta);
    console.log("idresposta", id);
    api
      .delete(`/respostas?id=${id}`)
      .then((respostaObtida) => {
        sucessoModalVisiblePerguntaApagada();
      })
      .catch((erroOcorrido) => {
        setModalVisibleFalha(true);
      });
  }

  let tituloCompleto = statuspergunta.titulo;
  let titulo = tituloCompleto.substring(0, 46);
  let data = statuspergunta.dataHora.substring(0, 13) + "h";
  let tituloMobile = tituloCompleto.substring(0, 23) + "...";

  let dataa = statuspergunta.dataHora;
  let hora = dataa.substring(11, 13);
  let dia = dataa.substring(9, 10);
  let mes = dataa.substring(6, 7);
  let ano = dataa.substring(0, 4);

  let mesFormat =
  mes == "01"
    ? "janeiro"
    : mes == "02"
    ? "fevereio"
    : mes == "05"
    ? "maio"
    : mes == "06"
    ? "junho"
    : (mes == '07' ? 'julho' : 
    (mes == '08' ? 'agosto' : (mes == '09' ? 'setembro' : (mes == '10' ?'outubro' : mes == '11' ? 'novembro' : 'dezembro' ))));
 

  let date2 =
    statuspergunta.diasAtras == 0
      ? `hoje ??s ${hora}h`
      : statuspergunta.diasAtras > 0 && statuspergunta.diasAtras < 7
      ? `?? ${statuspergunta.diasAtras} dias atr??s`
      : `${dia} de ${mesFormat} de ${ano}`;

  return (
    <>
      {
        (acesso = 2 ? (
          <>
            <div className="container-minhaduvida">
              {/* <p className="min-data">{data} </p> */}
              <p className="min-data">{date2}</p>
              <p> </p>
              <div className="min-categoriaTitulo">
                {statuspergunta.categoria}-{titulo}{" "}
              </div>
              <p className="min-categoriaTitulo-mobile">{tituloMobile} </p>
              <div className={background}>{statusAtual}</div>
              <div className="icons-status">
                <div
                  className={"btn-edit2"}
                  onClick={() => setModalVisibleVisualizar(true)}
                >
                  {<img src={view} defaultValue={statuspergunta.id} alt="" />}
                </div>

                <div
                  className={
                    statuspergunta.tipoPublicacao == 1 && acesso == 2
                      ? statuspergunta.status == 3
                        ? "btn-noedit"
                        : statuspergunta.status == 2
                        ? "btn-edit"
                        : "btn-noedit"
                      : statuspergunta.status == 2 && acesso == 2
                      ? "btn-edit"
                      : acesso == 2
                      ? statuspergunta.status >= 4
                        ? "btn-noedit"
                        : statuspergunta.status == 3
                        ? "btn-noedit"
                        : "btn-edit"
                      : statuspergunta.status == 1
                      ? "btn-edit"
                      : statuspergunta.status >= 4
                      ? "btn-noedit"
                      : statuspergunta.status == 2
                      ? "btn-noedit"
                      : statuspergunta.status == 3 &&
                        statuspergunta.tipoPublicacao == 2
                      ? "unbtn-edit"
                      : "unbtn-edit"
                  }
                  onClick={
                    statuspergunta.tipoPublicacao == 1 && acesso == 2
                      ? statuspergunta.status == 3
                        ? () => setModalVisible(false)
                        : statuspergunta.status == 2
                        ? () => setModalVisible(true)
                        : () => setModalVisible(false)
                      : statuspergunta.status == 2 && acesso == 2
                      ? () => setModalVisible(true)
                      : acesso == 2
                      ? statuspergunta.status >= 4
                        ? () => setModalVisible(false)
                        : statuspergunta.status == 3
                        ? () => setModalVisible(false)
                        : () => setModalVisible(true)
                      : statuspergunta.status == 1
                      ? () => setModalVisible(true)
                      : statuspergunta.status >= 4
                      ? () => setModalVisible(false)
                      : statuspergunta.status == 2
                      ? () => setModalVisible(false)
                      : ""
                  }
                >
                  {acesso == 2 ? (
                    statuspergunta.status == 3 ? (
                      <img
                        src={unedit}
                        defaultValue={statuspergunta.idPublicacao}
                        alt=""
                      />
                    ) : statuspergunta.status == 2 ? (
                      <img
                        src={edit}
                        defaultValue={statuspergunta.idPublicacao}
                        alt=""
                      />
                    ) : statuspergunta.status >= 4 ? (
                      <img
                        src={unedit}
                        defaultValue={statuspergunta.idPublicacao}
                        alt=""
                      />
                    ) : (
                      <img
                        src={edit}
                        defaultValue={statuspergunta.idPublicacao}
                        alt=""
                      />
                    )
                  ) : statuspergunta.status == 1 ? (
                    <img
                      src={edit}
                      defaultValue={statuspergunta.idPublicacao}
                      alt=""
                    />
                  ) : acesso == 2 && statuspergunta.status == 2 ? (
                    <img
                      src={unedit}
                      defaultValue={statuspergunta.idPublicacao}
                      alt=""
                    />
                  ) : (
                    <img
                      src={unedit}
                      defaultValue={statuspergunta.idPublicacao}
                      alt=""
                    />
                  )}
                </div>

                <div
                  className={
                    statuspergunta.tipoPublicacao == 1 && acesso == 2
                      ? statuspergunta.status == 3
                        ? "btn-nodelet"
                        : statuspergunta.status == 2
                        ? "btn-delet"
                        : statuspergunta.status >= 4
                        ? "btn-delet"
                        : "btn-nodelet"
                      : statuspergunta.tipoPublicacao == 2 && acesso == 2
                      ? statuspergunta.status == 1
                        ? "btn-delet"
                        : statuspergunta.status >= 4
                        ? "btn-delet"
                        : statuspergunta.status == 2
                        ? "btn-delet"
                        : statuspergunta.status == 3
                        ? "btn-nodelet"
                        : "btn-nodelet"
                      : statuspergunta.tipoPublicacao == 2 && acesso == 1
                      ? statuspergunta.status == 1
                        ? "btn-delet"
                        : statuspergunta.status >= 4
                        ? "btn-delet"
                        : statuspergunta.status == 3
                        ? "btn-nodelet"
                        : "unbtn-nodelet"
                      : statuspergunta.status >= 4 || statuspergunta.status == 1
                      ? "btn-delet"
                      : "unbtn-edit"
                  }
                  onClick={
                    statuspergunta.tipoPublicacao == 1 && acesso == 2
                      ? statuspergunta.status == 3
                        ? () => setModalVisibleRemover(false)
                        : statuspergunta.status >= 4
                        ? () => setModalVisibleRemover(true)
                        : statuspergunta.status == 2
                        ? () => setModalVisibleRemover(true)
                        : () => setModalVisibleRemover(false)
                      : statuspergunta.tipoPublicacao == 2
                      ? statuspergunta.status == 1
                        ? () => setModalVisibleRemover(true)
                        : statuspergunta.status >= 4
                        ? () => setModalVisibleRemover(true)
                        : statuspergunta.status == 2
                        ? () => setModalVisibleRemover(false)
                        : statuspergunta.status == 3
                        ? () => setModalVisibleRemover(false)
                        : () => setModalVisibleRemover(false)
                      : () => setModalVisibleRemover(false)
                  }
                >
                  {acesso == 2 ? (
                    statuspergunta.status == 3 ? (
                      <img
                        src={undelet}
                        defaultValue={statuspergunta.id}
                        alt=""
                      />
                    ) : (
                      <img
                        src={delet}
                        defaultValue={statuspergunta.id}
                        alt=""
                      />
                    )
                  ) : statuspergunta.status == 1 ||
                    statuspergunta.status >= 4 ? (
                    <img src={delet} defaultValue={statuspergunta.id} alt="" />
                  ) : (
                    <img
                      src={undelet}
                      defaultValue={statuspergunta.id}
                      alt=""
                    />
                  )}
                </div>
              </div>
            </div>

            {isModalVisibleVisualizar ? (
              statuspergunta.tipoPublicacao == 1 ? (
                statuspergunta.status == 2 ? (
                  <>
                    <ModalMostrarInformativaEmAnalise
                      onClose={() => setModalVisibleVisualizar(false)}
                    >
                      <div className="container-cadastro-editar">
                        <div className="input-titulo">
                          <p className="sub-titulo">
                            T??tulo da publica????o enviada{" "}
                          </p>
                          <div className="caixaview">
                            <span>{statuspergunta.titulo}</span>
                          </div>
                        </div>

                        <div className="input-descricao">
                          <p className="sub-titulo">
                            Descri????o da publica????o enviada
                          </p>
                          <div className="caixaview">
                            <span>{statuspergunta.texto}</span>
                          </div>
                        </div>
                      </div>
                    </ModalMostrarInformativaEmAnalise>
                  </>
                ) : statuspergunta.status == 3 ? (
                  <>
                    {/* ISC = IFORMATIVA APROVADA */}
                    <ModalMostrarInformativaAprovada
                      onClose={() => setModalVisibleVisualizar(false)}
                    >
                      <div className="container-cadastro-editar">
                        <div className="input-titulo">
                          <p className="sub-titulo">
                            T??tulo da publica????o enviada{" "}
                          </p>
                          <div className="caixaview">
                            <span>{statuspergunta.titulo}</span>
                          </div>
                        </div>

                        <div className="input-descricao">
                          <p className="sub-titulo">
                            Descri????o da publica????o enviada
                          </p>
                          <div className="caixaview">
                            <span>{statuspergunta.texto}</span>
                          </div>
                        </div>

           

                        <div className="input-descricao">
                          <p className="sub-titulo">Comentarios</p>
                          <div className="caixaview">
                            <span>
                                                        {statuspergunta.respostasByIdPublicacao.length ==
                              1 ? (
                                <>
                                  <>
                                    <span className="sub-titulo">
                                      {
                                        statuspergunta
                                          .respostasByIdPublicacao[0]
                                          .nomeUsuario
                                      }{" "}
                                      comentou:
                                    </span>
                                    <br />
                                    <span className="sub-titulo">
                                      {
                                        statuspergunta
                                          .respostasByIdPublicacao[0].texto
                                      }
                                    </span>
                                    <br />
                                    <br />
                                  </>
                                </>
                              ) : statuspergunta.respostasByIdPublicacao
                                  .length == 2 ? (
                                <>
                                  <span className="sub-titulo">
                                    {
                                      statuspergunta.respostasByIdPublicacao[0]
                                        .nomeUsuario
                                    }{" "}
                                    comentou:
                                  </span>
                                  <br />
                                  <span className="sub-titulo">
                                    {
                                      statuspergunta.respostasByIdPublicacao[0]
                                        .texto
                                    }
                                  </span>
                                  <br />
                                  <br />
                                  <span className="sub-titulo">
                                    {
                                      statuspergunta.respostasByIdPublicacao[1]
                                        .nomeUsuario
                                    }{" "}
                                    comentou:
                                  </span>
                                  <br />
                                  <span className="sub-titulo">
                                    {
                                      statuspergunta.respostasByIdPublicacao[1]
                                        .texto
                                    }
                                  </span>
                                  <br />
                                  <br />
                                </>
                              ) : statuspergunta.respostasByIdPublicacao
                                  .length == 3 ? (
                                <>
                                  <span className="sub-titulo">
                                    {
                                      statuspergunta.respostasByIdPublicacao[0]
                                        .nomeUsuario
                                    }{" "}
                                    comentou:
                                  </span>
                                  <br />
                                  <span className="sub-titulo">
                                    {
                                      statuspergunta.respostasByIdPublicacao[0]
                                        .texto
                                    }
                                  </span>
                                  <br />
                                  <br />
                                  <span className="sub-titulo">
                                    {
                                      statuspergunta.respostasByIdPublicacao[1]
                                        .nomeUsuario
                                    }{" "}
                                    comentou:
                                  </span>
                                  <br />
                                  <span className="sub-titulo">
                                    {
                                      statuspergunta.respostasByIdPublicacao[1]
                                        .texto
                                    }
                                  </span>
                                  <br />
                                  <br />
                                  <span className="sub-titulo">
                                    {
                                      statuspergunta.respostasByIdPublicacao[2]
                                        .nomeUsuario
                                    }{" "}
                                    comentou:
                                  </span>
                                  <br />
                                  <span className="sub-titulo">
                                    {
                                      statuspergunta.respostasByIdPublicacao[2]
                                        .texto
                                    }
                                  </span>
                                  <br />
                                  <br />
                                </>
                              ) : statuspergunta.respostasByIdPublicacao
                                  .length == 4 ? (
                                <>
                                  <span className="sub-titulo">
                                    {
                                      statuspergunta.respostasByIdPublicacao[0]
                                        .nomeUsuario
                                    }{" "}
                                    comentou:
                                  </span>
                                  <br />
                                  <span className="sub-titulo">
                                    {
                                      statuspergunta.respostasByIdPublicacao[0]
                                        .texto
                                    }
                                  </span>
                                  <br />
                                  <br />
                                  <span className="sub-titulo">
                                    {
                                      statuspergunta.respostasByIdPublicacao[1]
                                        .nomeUsuario
                                    }{" "}
                                    comentou:
                                  </span>
                                  <br />
                                  <span className="sub-titulo">
                                    {
                                      statuspergunta.respostasByIdPublicacao[1]
                                        .texto
                                    }
                                  </span>
                                  <br />
                                  <br />
                                  <span className="sub-titulo">
                                    {
                                      statuspergunta.respostasByIdPublicacao[2]
                                        .nomeUsuario
                                    }{" "}
                                    comentou:
                                  </span>
                                  <br />
                                  <span className="sub-titulo">
                                    {
                                      statuspergunta.respostasByIdPublicacao[2]
                                        .texto
                                    }
                                  </span>
                                  <br />
                                  <br />
                                  <span className="sub-titulo">
                                    {
                                      statuspergunta.respostasByIdPublicacao[3]
                                        .nomeUsuario
                                    }{" "}
                                    comentou:
                                  </span>
                                  <br />
                                  <span className="sub-titulo">
                                    {
                                      statuspergunta.respostasByIdPublicacao[3]
                                        .texto
                                    }
                                  </span>
                                  <br />
                                  <br />
                                </>
                              ) : statuspergunta.respostasByIdPublicacao
                                  .length == 0 ? (
                                "nenhum comentario"
                              ) : (
                                <>
                                  <span className="sub-titulo">
                                    {
                                      statuspergunta.respostasByIdPublicacao[0]
                                        .nomeUsuario
                                    }{" "}
                                    comentou:
                                  </span>
                                  <br />
                                  <span className="sub-titulo">
                                    {
                                      statuspergunta.respostasByIdPublicacao[0]
                                        .texto
                                    }
                                  </span>
                                  <br />
                                  <br />
                                  <span className="sub-titulo">
                                    {
                                      statuspergunta.respostasByIdPublicacao[1]
                                        .nomeUsuario
                                    }{" "}
                                    comentou:
                                  </span>
                                  <br />
                                  <span className="sub-titulo">
                                    {
                                      statuspergunta.respostasByIdPublicacao[1]
                                        .texto
                                    }
                                  </span>
                                  <br />
                                  <br />
                                  <span className="sub-titulo">
                                    {
                                      statuspergunta.respostasByIdPublicacao[2]
                                        .nomeUsuario
                                    }{" "}
                                    comentou:
                                  </span>
                                  <br />
                                  <span className="sub-titulo">
                                    {
                                      statuspergunta.respostasByIdPublicacao[2]
                                        .texto
                                    }
                                  </span>
                                  <br />
                                  <br />

                                  <p className="sub-titulo">
                                    mais comentarios....
                                  </p>
                                </>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                     
                    </ModalMostrarInformativaAprovada>
                  </>
                ) : (
                  <>
                   
                    <ModalMostrarIRecusada
                      onClose={() => setModalVisibleVisualizar(false)}
                    >
                      <div className="container-cadastro-editar">
                        <div className="input-descricao">
                          <p className="sub-titulo">Motivo da recusa:</p>
                          <div className="caixaview">
                            <span> {motivo}</span>
                          </div>
                        </div>
                        <div className="input-titulo">
                          <p className="sub-titulo">
                            T??tulo da publica????o enviada{" "}
                          </p>
                          <div className="caixaview">
                            <span>{statuspergunta.titulo}</span>
                          </div>
                        </div>

                        <div className="input-descricao">
                          <p className="sub-titulo">
                            Descri????o da publica????o enviada
                          </p>
                          <div className="caixaview">
                            <span>{statuspergunta.texto}</span>
                          </div>
                        </div>
                      </div>
                    </ModalMostrarIRecusada>
                  </>
                )
              ) : statuspergunta.status == 1 ? (
                <>
                  <ModalMostrarPerguntaEnviada
                    onClose={() => setModalVisibleVisualizar(false)}
                  >
                    <div className="container-cadastro-editar">
                      <div className="input-titulo">
                        <p className="sub-titulo">
                          T??tulo da publica????o enviada{" "}
                        </p>
                        <div className="caixaview">
                          <span>{statuspergunta.titulo}</span>
                        </div>
                      </div>

                      <div className="input-descricao">
                        <p className="sub-titulo">
                          Descri????o da publica????o enviada
                        </p>
                        <div className="caixaview">
                          <span>{statuspergunta.texto}</span>
                        </div>
                      </div>

                      <div className="input-descricao">
                        <p className="sub-titulo">
                          Quer saber o que significa pergunta enviada?
                        </p>
                        <div className="caixaview">
                          <span>
                            A sua pergunta foi recebida e est?? aguardando a
                            resposta de algum veterano, quando for respondida a
                            sua pergunta aguardar?? aprova????o do moderador para
                            ficar disnponivel no feed.
                          </span>
                        </div>
                      </div>

                      <div></div>
                    </div>
                  </ModalMostrarPerguntaEnviada>
                </>
              ) : statuspergunta.status == 2 ? (
                acesso == 2 ? (
                  <>
                    <ModalMostrarRespondiEmAnalise
                      onClose={() => setModalVisibleVisualizar(false)}
                    >
                      <div className="container-cadastro-editar">
                        <div className="input-descricao">
                          <p className="sub-titulo">Sua resposta aqui</p>
                          <div className="caixaview">
                            <span>
                              {statuspergunta.respostasByIdPublicacao[0].texto}
                            </span>
                          </div>
                        </div>

                        <div className="input-titulo">
                          <p className="sub-titulo">
                            T??tulo da pergunta de {statuspergunta.nomeUsuario}
                          </p>
                          <div className="caixaview">
                            <span>{statuspergunta.titulo}</span>
                          </div>
                        </div>

                        <div className="input-descricao">
                          <p className="sub-titulo">Descri????o da pergunta</p>
                          <div className="caixaview">
                            <span>{statuspergunta.texto}</span>
                          </div>
                        </div>
                      </div>
                    </ModalMostrarRespondiEmAnalise>
                  </>
                ) : (
                  <>
                    <ModalMostrarPerguntaAnalise
                      onClose={() => setModalVisibleVisualizar(false)}
                    >
                      <div className="container-cadastro-editar">
                        <div className="input-titulo">
                          <p className="sub-titulo">
                            T??tulo da publica????o enviada{" "}
                          </p>
                          <div className="caixaview">
                            <span>{statuspergunta.titulo}</span>
                          </div>
                        </div>

                        <div className="input-descricao">
                          <p className="sub-titulo">
                            Descri????o da publica????o enviada
                          </p>
                          <div className="caixaview">
                            <span>{statuspergunta.texto}</span>
                          </div>
                        </div>

                        <div className="input-descricao">
                          <p className="sub-titulo">
                            Quer saber o que significa pergunta em analise?
                          </p>
                          <div className="caixaview">
                            <span>
                              A sua pergunta foi recebida e respondida por um
                              veterano, agora est?? passando por uma analise e
                              aguardando aprova????o do moderador para ficar
                              disnponivel no feed.
                            </span>
                          </div>
                        </div>

                        <div></div>
                      </div>
                    </ModalMostrarPerguntaAnalise>
                  </>
                )
              ) : statuspergunta.status == 3 ? (
                acesso == 2 ? (
                  <>
                    <ModalMostrarRespondida
                      onClose={() => setModalVisibleVisualizar(false)}
                    >
                      <div className="container-cadastro-editar">
                        <div className="input-descricao">
                          <p className="sub-titulo">Sua resposta</p>
                          <div className="caixaview">
                            <span>
                              {statuspergunta.respostasByIdPublicacao[0].texto}
                            </span>
                          </div>
                        </div>

                        <div className="input-titulo">
                          <p className="sub-titulo">
                            T??tulo da pergunta de {statuspergunta.nomeUsuario}{" "}
                          </p>
                          <div className="caixaview">
                            <span>{statuspergunta.titulo}</span>
                          </div>
                        </div>

                        <div className="input-descricao">
                          <p className="sub-titulo">Descri????o da pergunta</p>
                          <div className="caixaview">
                            <span>{statuspergunta.texto}</span>
                          </div>
                        </div>
                      </div>
                    </ModalMostrarRespondida>
                  </>
                ) : (
                  <>
                    <ModalMostrarRespondida
                      onClose={() => setModalVisibleVisualizar(false)}
                    >
                      <div className="container-cadastro-editar">
                        <div className="input-descricao">
                          <p className="sub-titulo">
                            Resposta de{" "}
                            {
                              statuspergunta.respostasByIdPublicacao[0]
                                .nomeUsuario
                            }
                          </p>
                          <div className="caixaview">
                            <span>
                              {statuspergunta.respostasByIdPublicacao[0].texto}
                            </span>
                          </div>
                        </div>

                        <div className="input-titulo">
                          <p className="sub-titulo">T??tulo da sua pergunta </p>
                          <div className="caixaview">
                            <span>{statuspergunta.titulo}</span>
                          </div>
                        </div>

                        <div className="input-descricao">
                          <p className="sub-titulo">
                            Descri????o da sua pergunta
                          </p>
                          <div className="caixaview">
                            <span>{statuspergunta.texto}</span>
                          </div>
                        </div>
                      </div>
                    </ModalMostrarRespondida>
                  </>
                )
              ) : acesso == 2 ? (
                <>
                  <ModalMostrarRRecusada
                    onClose={() => setModalVisibleVisualizar(false)}
                  >
                    <div className="container-cadastro-editar">
                      <div className="input-descricao">
                        <p className="sub-titulo">Motivo da recusa:</p>
                        <div className="caixaview">
                          <span> {motivo}</span>
                        </div>
                      </div>
                      <div className="input-descricao">
                        <p className="sub-titulo">Sua resposta </p>
                        <div className="caixaview">
                          <span>
                            {statuspergunta.respostasByIdPublicacao[0].texto}
                          </span>
                        </div>
                      </div>

                      <div className="input-titulo">
                        <p className="sub-titulo">
                          T??tulo da pergunta de {statuspergunta.nomeUsuario}{" "}
                        </p>
                        <div className="caixaview">
                          <span>{statuspergunta.titulo}</span>
                        </div>
                      </div>

                      <div className="input-descricao">
                        <p className="sub-titulo">Descri????o da pergunta</p>
                        <div className="caixaview">
                          <span>{statuspergunta.texto}</span>
                        </div>
                      </div>
                    </div>
                  </ModalMostrarRRecusada>
                </>
              ) : (
                <>
                  <ModalMostrarPRecudasa
                    onClose={() => setModalVisibleVisualizar(false)}
                  >
                    <div className="container-cadastro-editar">
                      <div className="input-descricao">
                        <p className="sub-titulo">Motivo da recusa:</p>
                        <div className="caixaview">
                          <span> {motivo}</span>
                        </div>
                      </div>

                      <div className="input-titulo">
                        <p className="sub-titulo">T??tulo da sua pergunta </p>
                        <div className="caixaview">
                          <span>{statuspergunta.titulo}</span>
                        </div>
                      </div>

                      <div className="input-descricao">
                        <p className="sub-titulo">Descri????o da sua pergunta</p>
                        <div className="caixaview">
                          <span>{statuspergunta.texto}</span>
                        </div>
                      </div>
                    </div>
                  </ModalMostrarPRecudasa>
                </>
              )
            ) : null}

            <div>
              {isModalVisible ? (
                statuspergunta.status == 1 ? (
                  <>
                    <Modal onClose={() => setModalVisible(false)}>
                      <div className="container-cadastro-editar">
                        <div className="input-titulo">
                          <p className="sub-titulo">T??tulo da pergunta </p>
                          <div className="p-statuss">
                            <p id="p-pergunta">
                              Precisa-se de ao menos 10 caracteres
                            </p>
                          </div>

                          <div className="p-valida">
                            <p id="p-validando">
                              Para a pergunta ser enviada, ?? necess??rio pelo
                              menos 10 caracteres
                            </p>
                          </div>

                          <input
                            defaultValue={statuspergunta.titulo}
                            className="estilo-input-first"
                            onInput={(evento) =>
                              setTituloInput(evento.target.value)
                            }
                            type="text"
                            placeholder={statuspergunta.titulo}
                            id="input-pergunta"
                          />
                        </div>

                        <div className="input-descricao">
                          <p className="sub-titulo">Descri????o da pergunta</p>
                          <label>
                            <div className="p-pergunta">
                              <p id="p-pergunta-descricao">
                                Precisa ao menos de 10 caracteres
                              </p>
                            </div>
                            <div className="p-valida">
                              <p id="p-validando-descricao">
                                Para a pergunta ser enviada, ?? necess??rio pelo
                                menos 10 caracteres
                              </p>
                            </div>
                            <textarea
                              defaultValue={statuspergunta.texto}
                              className="estilo-input-second"
                              onInput={(evento) => {
                                setTextoInput(evento.target.value);
                              }}
                              id="input-descricao-pergunta"
                            ></textarea>
                          </label>
                        </div>

                        <div className="box-btn">
                          <p className="sub-titulo">Categoria</p>
                          <div className="categoria-pergunta">
                          
                            <select
                              onChange={(evento) => {
                                setSelectValue(evento.target.value);
                              }}
                              name="categorias"
                              className="estilo-input-three"
                            >
                              {selectCategoria.map((elemento) => (
                                <option
                                  key={elemento.idCategoria}
                                  value={elemento.idCategoria}
                                >
                                  {elemento.categoria}{" "}
                                </option>
                              ))}
                            </select>
                            <div>
                              <Button
                                onClick={editar}
                                className="click-button-editar"
                              >
                                {" "}
                                ENVIAR ALTERA????ES{" "}
                              </Button>
                              <div>
                                {isModalVisibleFalha ? (
                                  <ModalErro
                                    onClose={() => setModalVisibleFalha(false)}
                                  />
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </>
                ) : statuspergunta.status == 2 ? (
                  statuspergunta.tipoPublicacao == 2 ? (
                    <>
                      <ModalEditarResposta
                        onClose={() => setModalVisible(false)}
                      >
                        <div className="container-cadastro-editar">
                          <div className="input-descricao">
                            <p className="sub-titulo">Sua resposta aa</p>
                            <label>
                              <textarea
                                defaultValue={statuspergunta.texto}
                                className="estilo-input-second"
                              ></textarea>
                            </label>
                          </div>

                          <div className="input-titulo">
                            <p className="sub-titulo">T??tulo da publica????o b</p>

                            <input
                              disabled
                              defaultValue={statuspergunta.titulo}
                              className="estilo-input-first"
                              onInput={(evento) =>
                                setTituloInput(evento.target.value)
                              }
                              type="text"
                              placeholder={statuspergunta.titulo}
                            />
                          </div>

                          <div className="input-descricao">
                            <p className="sub-titulo">Descri????o</p>
                            <label>
                              <textarea
                                disabled
                                defaultValue={statuspergunta.texto}
                                className="estilo-input-second"
                              ></textarea>
                            </label>
                          </div>

                          <div className="box-btn">
                            <p className="sub-titulo">Categoria</p>
                            <div className="categoria-pergunta">
                           
                              <ButtonOutline>
                                {statuspergunta.categoria}
                              </ButtonOutline>
                              <div>
                                <Button
                                  onClick={editarResposta}
                                  className="click-button-editar"
                                >
                                  {" "}
                                  ENVIAR ALTERA????ES{" "}
                                </Button>
                                <div>
                                  {isModalVisibleFalha ? (
                                    <ModalErro
                                      onClose={() =>
                                        setModalVisibleFalha(false)
                                      }
                                    />
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ModalEditarResposta>
                    </>
                  ) : (
                    <>
                      <ModalEditarPostagem
                        onClose={() => setModalVisible(false)}
                      >
                        <div className="container-cadastro-editar">
                        
                          <div className="input-titulo">
                            <p className="sub-titulo">T??tulo da publica????o </p>

                            <input
                              defaultValue={statuspergunta.titulo}
                              className="estilo-input-first"
                              onInput={(evento) =>
                                setTituloInput(evento.target.value)
                              }
                              type="text"
                              placeholder={statuspergunta.titulo}
                            />
                          </div>

                          <div className="input-descricao">
                            <p className="sub-titulo">Descri????o</p>
                            <label>
                              <textarea
                                defaultValue={statuspergunta.texto}
                                className="estilo-input-second"
                              ></textarea>
                            </label>
                          </div>

                          <div className="box-btn">
                            <p className="sub-titulo">Categoria</p>
                            <div className="categoria-pergunta">
    
                              <ButtonOutline>
                                {statuspergunta.categoria}
                              </ButtonOutline>
                              <div>
                                <Button
                                  onClick={editarResposta}
                                  className="click-button-editar"
                                >
                                  {" "}
                                  ENVIAR ALTERA????ES{" "}
                                </Button>
                                <div>
                                  {isModalVisibleFalha ? (
                                    <ModalErro
                                      onClose={() =>
                                        setModalVisibleFalha(false)
                                      }
                                    />
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ModalEditarPostagem>
                    </>
                  )
                ) : (
                  <>
                    <ModalEditarResposta onClose={() => setModalVisible(false)}>
                      <div className="container-cadastro-editar">
                        <div className="input-descricao">
                          <p className="sub-titulo">Sua resposta teste</p>
                          <label>
                            <textarea
                              defaultValue={
                                statuspergunta.respostasByIdPublicacao[0].texto
                              }
                              className="estilo-input-first"
                              onInput={(evento) =>
                                setTituloInput(evento.target.value)
                              }
                              type="text"
                              placeholder={
                                statuspergunta.respostasByIdPublicacao[0].texto
                              }
                            />{" "}
                          </label>
                        </div>

                        <div className="input-titulo">
                          <p className="sub-titulo">T??tulo da pergunta </p>

                          <input
                            disabled
                            defaultValue={statuspergunta.titulo}
                            className="estilo-input-first"
                            onInput={(evento) =>
                              setTituloInput(evento.target.value)
                            }
                            type="text"
                            placeholder={statuspergunta.titulo}
                          />
                        </div>

                        <div className="input-descricao">
                          <p className="sub-titulo">Descri????o da pergunta</p>
                          <label>
                            <textarea
                              disabled
                              defaultValue={statuspergunta.texto}
                              className="estilo-input-second"
                            ></textarea>
                          </label>
                        </div>

                        <div className="box-btn">
                          <p className="sub-titulo">Categoria</p>
                          <div className="categoria-pergunta">
                          <ButtonOutline>
                              {statuspergunta.categoria}
                            </ButtonOutline>
                            <div>
                              <Button
                                onClick={validarPerguntaEditada}
                                className="click-button-editar"
                              >
                                {" "}
                                ENVIAR ALTERA????ES{" "}
                              </Button>
                              <div>
                                {isModalVisibleFalha ? (
                                  <ModalErro
                                    onClose={() => setModalVisibleFalha(false)}
                                  />
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ModalEditarResposta>
                  </>
                )
              ) : null}
            </div>

            <div>
              {isModalVisibleRemover ? (
                statuspergunta.status == 1 ? (
                  <>
                    <ModalRemover onClose={() => setModalVisibleRemover(false)}>
                      <div className="container-cadastro-remover">
                        <div className="input-titulo">
                          <p className="sub-titulo">
                            Voc?? esta prestes a excluir a pergunta "
                            {statuspergunta.titulo}" Tem certeza que deseja
                            exclui-la?{" "}
                          </p>
                        </div>

                        <div className="box-btn">
                          <ButtonOutline
                            onClick={() => setModalVisibleRemover(false)}
                            className="click-button-cancelar"
                          >
                            {" "}
                            CANCELAR{" "}
                          </ButtonOutline>

                          <Button
                            onClick={() => deletar(statuspergunta.idPublicacao)}
                            className="click-button-apagar"
                          >
                            {" "}
                            EXCLUIR{" "}
                          </Button>
                          <div>
                            {isModalVisibleFalha ? (
                              <ModalErro
                                onClose={() => setModalVisibleFalha(false)}
                              />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </ModalRemover>
                  </>
                ) : (
                  <>
                    <ModalRemover onClose={() => setModalVisibleRemover(false)}>
                      <div className="container-cadastro-remover">
                        <div className="input-titulo">
                          <p className="sub-titulo">
                            Voc?? esta prestes a excluir a publica????o "
                            {statuspergunta.titulo}" Tem certeza que deseja
                            exclui-la?{" "}
                          </p>
                        </div>

                        <div className="box-btn">
                          <ButtonOutline
                            onClick={() => setModalVisibleRemover(false)}
                            className="click-button-cancelar"
                          >
                            {" "}
                            CANCELAR{" "}
                          </ButtonOutline>

                          <Button
                            onClick={
                              statuspergunta.respostasByIdPublicacao.length ==
                                1 && acesso == 1
                                ? () => deletarperguntarecusadacomresposta()
                                : acesso == 2 &&
                                  statuspergunta.respostasByIdPublicacao
                                    .length == 1
                                ? () => deletarResposta()
                                : () => deletar()
                            }
                            className="click-button-apagar"
                          >
                            {" "}
                            EXCLUIR{" "}
                          </Button>
                        </div>
                      </div>
                      <div>
                        {isModalVisibleFalha ? (
                          <ModalErro
                            onClose={() => setModalVisibleFalha(false)}
                          />
                        ) : null}
                      </div>
                    </ModalRemover>
                  </>
                )
              ) : // statuspergunta.respostasByIdPublicacao.length == 0 ? deletar(statuspergunta.idPublicacao) : () => deletarperguntarecusadacomresposta()

              null}
            </div>
          </>
        ) : (
          ""
        ))
      }
      <div className="modais">
        <div>
          {isModalVisibleExcluida ? <ModalExcluida onClose={reload} /> : null}
        </div>

        <div>
          {isModalVisibleRespostaExcluida ? (
            <ModalRespostaExcluida onClose={reload} />
          ) : null}
        </div>

        <div>
          {isModalVisiblePostagemExcluida ? (
            <ModalPostagemExcluida onClose={reload} />
          ) : null}
        </div>

        <div>
          {isModalVisibleExcluida ? <ModalExcluida onClose={reload} /> : null}
        </div>

        <div>
          {isModalVisibleRespostaEditada ? (
            <ModalRespostaEditada onClose={reload} />
          ) : null}
        </div>

        <div>
          {isModalVisiblePostagemEditada ? (
            <ModalPostagemEditada onClose={reload} />
          ) : null}
        </div>

        <div>
          {isModalVisibleEditada ? <ModalEditada onClose={reload} /> : null}
        </div>
      </div>
    </>
  );
};

export default StatusPergunta;
