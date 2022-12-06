import React, { Component, useEffect, useState } from "react";
import { ReactDOM } from "react";
import "../css/salvos.scss";
import { formatRelative } from "date-fns";
import { ptBR } from "date-fns/locale";
import view from "./img/viewon.svg";
import delet from "./img/deleteon.svg";
import Publicacao from "./publicacao";
import ModalMostrarRespondida from "./ModalMostrarRespondi";
import ModalMostrarSalvos from "./ModalMostrarSalvosResposta";
import ButtonOutline from "./buttonoutline";
import Button from "./button";
import ModalRemover from "./ModalRemover";
import ModalRemoverSalvo from "./ModalRemoverSalvo";
import api from "../api";
import ModalSalvoRemovido from "./ModaSalvoRemovido";
import ModalErro from "./ModalErro";
import ModalMostrarSalvosResposta from "./ModalMostrarSalvosResposta";
import ModalMostrarSalvosInformacao from "./ModalMostrarSalvosinformativa";

const SalvoItem = (salvo) => {
  const [favs, setFavs] = useState(salvo);
  // const[favs, setFavs] = useState(favoritos.favoritos)

  const [isModalVisibleVisualizar, setModalVisibleVisualizar] = useState(false);
  const [isModalVisibleRemover, setModalVisibleRemover] = useState(false);
  const [isModalVisibleExcluida, setModalVisibleExcluida] = useState(false);
  const [isModalVisibleremovido, setModalVisibleremovido] = useState(false);
  const [isModalVisibleErro, setModalVisibleErro] = useState(false);

  useEffect(() => {
    console.log("salvoitem favs", favs);
  }, [favs]);

  let tituloCompleto = favs.publicacao.titulo;
  let tituloFormatado = tituloCompleto.substring(0, 82) + "...";
  let textomin = favs.publicacao.texto;
  let texto = textomin.substring(0, 30) + "...";
  let tituloMobile = tituloCompleto.substring(0, 15) + "...";
  let comentarios = favs.publicacao.respostasByIdPublicacao;
  let id = window.sessionStorage.id;

  function deletarSalvos() {
    api
      .delete(
        `/favoritos?idUsuario=${id}&idPublicacao=${favs.publicacao.idPublicacao}`
      )
      .then((respostaEnviada) => {
        console.log("item salvo removido com sucesso!!!", respostaEnviada.data);
        setModalVisibleRemover(false);
        setModalVisibleremovido(true);
      })
      .catch((erroOcorrido) => {
        console.log("erro ocorrido: ", erroOcorrido);
      });
  }

  function fecharModaleRecarregar() {
    setModalVisibleremovido(false);
    window.location.reload();
  }

  let tipodepublicacao =
    favs.publicacao.tipoPublicacao == 1 ? "INFORMATIVO" : "DUVIDA";

  return (
    <>
      {favs.publicacao.tipoPublicacao == 1 ? (
        <div className="container-salvos">
          {/* <div className="min-categoriaTitulo">{favs.publicacao.categoria}</div> */}
          
          
          
          <div className="tteste"><span className="categoria-tag-informacao"> {tipodepublicacao} </span> </div>
         
         
          <div className="min-titulo">{favs.publicacao.categoria} | {tituloFormatado} </div>
          {/* <div className="min-texto">{texto} </div> */}
          {/* <p className="min-categoriaTitulo-mobile">{tituloMobile} </p> */}

          <div className="icons-status2">
            <div
              className={"btn-edit"}
              onClick={() => setModalVisibleVisualizar(true)}
            >
              {
                <img
                  className="btn-view3"
                  src={view}
                  defaultValue={favs.publicacao.idPublicacao}
                  alt=""
                />
              }
            </div>
            <div
              className={"btn-delet"}
              onClick={() => setModalVisibleRemover(true)}
            >
              {
                <img
                  className="btn-view4"
                  src={delet}
                  defaultValue={favs.publicacao.idPublicacao}
                  alt=""
                />
              }
            </div>
          </div>
        </div>
      ) : (
        <div className="container-salvos">
          {/* <div className="min-categoriaTitulo">{favs.publicacao.categoria}</div> */}

          <div className="tteste">
            <span className="categoria-tag-duvida"> {tipodepublicacao} </span>
          </div>
          <div className="min-titulo">{favs.publicacao.categoria} | {tituloFormatado} </div>
          {/* <div className="min-texto">{texto} </div> */}
          {/* <p className="min-categoriaTitulo-mobile">{tituloMobile} </p> */}

          <div className="icons-status2">
            <div
              className={"btn-edit"}
              onClick={() => setModalVisibleVisualizar(true)}
            >
              {
                <img
                  className="btn-view3"
                  src={view}
                  defaultValue={favs.publicacao.idPublicacao}
                  alt=""
                />
              }
            </div>
            <div
              className={"btn-delet"}
              onClick={() => setModalVisibleRemover(true)}
            >
              {
                <img
                  className="btn-delet"
                  src={delet}
                  defaultValue={favs.publicacao.idPublicacao}
                  alt=""
                />
              }
            </div>
          </div>
        </div>
      )}

      {isModalVisibleVisualizar ? (
        favs.publicacao.tipoPublicacao == 2 ? (
          <>
            {/* ISC = IFORMATIVA EM ANALISE */}
            <ModalMostrarSalvosResposta
              onClose={() => setModalVisibleVisualizar(false)}
            >
              <div className="container-cadastro-editar">
                <div className="input-titulo">
                  <p className="sub-titulo">Título da pergunta </p>
                  <div className="caixaview">
                    <span>{tituloCompleto}</span>
                  </div>
                </div>

                <div className="input-descricao">
                  <p className="sub-titulo">Descrição da pergunta</p>
                  <div className="caixaview">
                    <span>{textomin}</span>
                  </div>
                </div>

                <div className="input-descricao">
                  <p className="sub-titulo">Resposta</p>
                  <div className="caixaview">
                    <span>
                      {comentarios.length > 0 ? (
                        <>
                          {comentarios.map((item, xpto) => {
                            return (
                              <div className="coments" key={item.idResposta}>
                                <div className="div-foto-comentario">
                                  <img
                                    className="fotocoments"
                                    src={item.fotoUsuario}
                                  />
                                </div>

                                <div className="div-conteudo-comentario">
                                  <p className="nome_user">
                                    {item.nomeUsuario}
                                  </p>
                                  <p className="conteudo_coment">
                                    {item.texto}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </>
                      ) : (
                        "Não existe comentarios nessa publicação"
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </ModalMostrarSalvosResposta>
          </>
        ) : (
          <>
            <ModalMostrarSalvosInformacao
              onClose={() => setModalVisibleVisualizar(false)}
            >
              <div className="container-cadastro-editar">
                <div className="input-titulo">
                  <p className="sub-titulo">Título da publicação </p>
                  <div className="caixaview">
                    <span>{tituloCompleto}</span>
                  </div>
                </div>

                <div className="input-descricao">
                  <p className="sub-titulo">Descrição </p>
                  <div className="caixaview">
                    <span>{textomin}</span>
                  </div>
                </div>

                <div className="input-descricao">
                  <p className="sub-titulo">Comentarios</p>
                  <div className="caixaview">
                    <span>
                      {comentarios.length > 0 ? (
                        <>
                          {comentarios.map((item, xpto) => {
                            return (
                              <div className="coments" key={item.idResposta}>
                                <div className="div-foto-comentario">
                                  <img
                                    className="fotocoments"
                                    src={item.fotoUsuario}
                                  />
                                </div>

                                <div className="div-conteudo-comentario">
                                  <p className="nome_user">
                                    {item.nomeUsuario}
                                  </p>
                                  <p className="conteudo_coment">
                                    {item.texto}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </>
                      ) : (
                        "Não existe comentarios nessa publicação"
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </ModalMostrarSalvosInformacao>
          </>
        )
      ) : (
        ""
      )}
      {isModalVisibleRemover ? (
        <>
          <ModalRemoverSalvo onClose={() => setModalVisibleRemover(false)}>
            <div className="container-cadastro-remover">
              <div className="input-titulo">
                <p className="sub-titulo">
                  Você esta prestes a remover a publicação "{tituloCompleto}" de
                  itens salvos, Tem certeza que deseja remover ?{" "}
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

                <Button onClick={deletarSalvos} className="click-button-apagar">
                  {" "}
                  REMOVER{" "}
                </Button>
                <div>
                  {/* {isModalVisibleFalha ? (
                     <ModalErro
                       onClose={() => setModalVisibleFalha(false)}
                     />
                   ) : null} */}
                </div>
              </div>
            </div>
            <div>
              {isModalVisibleErro ? (
                <ModalErro onClose={() => setModalVisibleErro(false)} />
              ) : null}
            </div>
          </ModalRemoverSalvo>
        </>
      ) : null}
      {isModalVisibleremovido ? (
        <>
          <ModalSalvoRemovido
            onClose={fecharModaleRecarregar}
          ></ModalSalvoRemovido>
        </>
      ) : null}
    </>
  );
};

export default SalvoItem;
