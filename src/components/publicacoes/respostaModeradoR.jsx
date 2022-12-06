import React, { useState } from "react";
import likeUnselect from "../../img/likeunselect.svg";
import like from "../../img/like.svg";
import api from "../../api";
import ButtonOutline from "../buttonoutline";
import Button from "../button";
import ModalPerguntaRecusada from "../ModalPerguntaRecusada";
import ModalPrecisaMotivoRecusar from "../ModalPrecisaMotivoRecusar";
import ModalPerguntaAprovada from "../ModalPerguntaAprovada";
import ModalErro from "../ModalErro";
import "../../css/createPergunta.scss";

const RespostaModeradorFeed = ({ publicacao }) => {
  const [isModalVisiblePerguntaRecusada, setModalVisiblePerguntaRecusada] =
    useState(false);

  const [isModalVisibleErro, setModalVisibleErro] = useState(false);

  const [
    isModalVisiblePrecisaMotivoRecusar,
    setModalVisiblePrecisaMotivoRecusar,
  ] = useState(false);

  const [isModalVisiblePerguntaAprovada, setModalVisiblePerguntaAprovada] =
    useState(false);

  function reload() {
    window.location.reload();
    setModalVisiblePerguntaRecusada(false);
    setModalVisiblePerguntaAprovada(false);
  }

  let idPublicacaodavez = publicacao.idPublicacao;

  // function recusar() {
  //   var motivo = document.getElementById("motivo");
  //   var value = motivo.options[motivo.selectedIndex].value;
  //   console.log(value);
  //   if (value >= 4 && value <= 6) {
  //     api
  //       .patch(
  //         `/publicacoes/update-status?idPublicacao=${idPublicacaodavez}&status=${value}`
  //       )
  //       .then((respostaEnviada) => {
  //         console.log("RECUSADA COM SUCESSO!!!");
  //         console.log(
  //           `resposta obtd ao RECUSAR publicaçãO id: ${idPublicacaodavez} para status ${value}`
  //         );
  //         setModalVisiblePostagemRecusada(true);
  //         setModalVisiblePerguntaRecusada(true);
  //       })
  //       .catch((erroOcorrido) => {
  //         console.log("erro ocorrido: ", erroOcorrido);
  //         setModalVisibleErro(true);
  //       });
  //   } else {
  //     setModalVisiblePrecisaMotivoRecusar(true);
  //   }
  // }

  function recusar() {
    var motivo2 = document.getElementById("motivo2");
    var value = motivo2.options[motivo2.selectedIndex].value;
    console.log(value);
    if (value >= 4 && value <= 6) {
      api
        .patch(
          `/publicacoes/update-status?idPublicacao=${idPublicacaodavez}&status=${value}`
        )
        .then((respostaEnviada) => {
          console.log("RECUSADA COM SUCESSO!!!");
          console.log(
            `resposta obtd ao RECUSAR publicaçãO id: ${idPublicacaodavez} para status ${value}`
          );
          setModalVisiblePerguntaRecusada(true);
        })
        .catch((erroOcorrido) => {
          console.log("erro ocorrido: ", erroOcorrido);
          setModalVisibleErro(true);
        });
    } else {
      setModalVisiblePrecisaMotivoRecusar(true);
    }
  }

  function aprovar() {
    api
      .patch(
        `/publicacoes/update-status?idPublicacao=${idPublicacaodavez}&status=${3}`
      )
      .then((respostaEnviada) => {
        console.log("APROVADA COM SUCESSO!!!");
        console.log(
          `resposta obtd ao APROVAR publicaçãO id: ${idPublicacaodavez} para status 3`
        );
        setModalVisiblePerguntaAprovada(true);
      })
      .catch((erroOcorrido) => {
        console.log("erro ocorrido: ", erroOcorrido);
        setModalVisibleErro(true);
      });
  }

  const [categorias] = useState([
    {
      id: "4",
      nome: "TEMA NÃO PERMITIDO",
    },
    {
      id: "5",
      nome: "PALAVRAS IMPRÓPRIAS",
    },
    {
      id: "6",
      nome: "OUTROS",
    },
  ]);

  const respNome =
    publicacao.respostasByIdPublicacao.length < 1
      ? "lengt menor que 1"
      : publicacao.respostasByIdPublicacao[0].nomeUsuario;

  const respTexto =
    publicacao.respostasByIdPublicacao.length < 1
      ? "legth menor que 1"
      : publicacao.respostasByIdPublicacao[0].texto;

  let dataa = publicacao.dataHora;
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
      : mes == "07"
      ? "julho"
      : mes == "08"
      ? "agosto"
      : mes == "09"
      ? "setembro"
      : mes == "10"
      ? "outubro"
      : mes == "11"
      ? "novembro"
      : "dezembro";

  let date3 =
    publicacao.diasAtras == 0
      ? `hoje ás ${hora}h`
      : publicacao.diasAtras > 0 && publicacao.diasAtras < 7
      ? `á ${publicacao.diasAtras} dias atrás`
      : `${dia} de ${mesFormat} de ${ano}`;

  return (
    <>
      <>
        {/* <div className="codigoidentificacao"> resposta Moderador Feed</div> */}
        {/* function moderador2(){ */}

        <>
          <>
            <>
              {/* <div className="codigoidentificacao">
            <p>
              {" "}
              código: {publicacao.status}00{publicacao.idPublicacao}{" "}
            </p>
          </div> */}
              {/* // MOLDE DE PERGUNTA COM RESPOSTA MODERADOR */}
              <div className="container-publicacao">
                {/* <div className="frase-resposta">
                  <div>
                    <p className="resposta-pgt">
                      Pengunta feita por
                      <span className="nome"> {publicacao.nomeUsuario} </span>e
                      repondida por
                      <span className="nome">
                        {" "}
                        {publicacao.respostasByIdPublicacao.length < 1
                          ? "menor que 1d"
                          : publicacao.respostasByIdPublicacao[0]
                              .nomeUsuario}{" "}
                      </span>
                    </p>
                  </div>
                  <div>
                    <span className="categoria-tag-pergunta">
                      {" "}
                      {publicacao.categoria}{" "}
                    </span>
                  </div>
                </div>

                <div className="detalhes-pub">{date3}</div>
                <div className="conteudo">
                  TITULO DA PERGUNTA
                  <p>{publicacao.titulo}</p>
                </div>
                <div className="conteudo">
                  DESCRIÇAO DA PERGUNTA
                  <p>{publicacao.texto}</p>
                </div>
                <div className="conteudo3">
                  RESPOSTA DE{" "}
                  {publicacao.respostasByIdPublicacao.length < 1
                    ? "menor que 1d"
                    : publicacao.respostasByIdPublicacao[0].nomeUsuario}
                  <p>
                    {publicacao.respostasByIdPublicacao.length < 1
                      ? "menor que 1d"
                      : publicacao.respostasByIdPublicacao[0].texto}
                  </p>
                </div>
                <div className="btns-moderador">
                  <div className="categoria-pergunta4">
                    <div>
                      Motivo de recusa
                      <select
                        id="motivo"
                        name="categorias"
                        className="estilo-input-three"
                      >
                        <option value="0">SELECIONAR MOTIVO</option>
                        <option value="4">TEMA NÃO PERMITIDO</option>
                        <option value="5">PALAVRAS IMPRÓPRIAS</option>
                        <option value="6">OUTROS</option>
                      </select>
                    </div>
                  </div>
                  <ButtonOutline onClick={recusar}>RECUSAR</ButtonOutline> */}

                <div className="frase-resposta">
                  <div>
                    <span className="tag-hora">{date3}</span>
                  </div>

                  <div>
                    <span className="categoria-tag-pergunta">
                      {publicacao.categoria}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="resposta-pgt3">
                    Pergunta feita por
                    <span className="nome"> {publicacao.nomeUsuario} </span>e
                    respondida por
                    <span className="nome">
                      {" "}
                      {publicacao.respostasByIdPublicacao.length < 1
                        ? "menor que 1d"
                        : publicacao.respostasByIdPublicacao[0].nomeUsuario}
                    </span>
                  </p>
                </div>

                <div className="conteudo2">
                  Titulo da publicação
                  <p>{publicacao.titulo}</p>
                </div>
                <div className="conteudo">
                  Conteúdo
                  <p>{publicacao.texto}</p>
                </div>
                <div className="conteudo3">
                  Resposta de{" "}
                  {publicacao.respostasByIdPublicacao.length < 1
                    ? "menor que 1d"
                    : publicacao.respostasByIdPublicacao[0].nomeUsuario}
                  <p>
                    {publicacao.respostasByIdPublicacao.length < 1
                      ? "menor que 1d"
                      : publicacao.respostasByIdPublicacao[0].texto}
                  </p>
                </div>
                <div className="btns-moderador">
                  <div className="categoria-pergunta4">
                    <div>
                      Motivo de recusa
                      <select
                        id="motivo2"
                        name="categorias"
                        className="estilo-input-three"
                      >
                        <option value="0">SELECIONAR MOTIVO</option>
                        <option value="4">TEMA NÃO PERMITIDO</option>
                        <option value="5">PALAVRAS IMPRÓPRIAS</option>
                        <option value="6">OUTROS</option>
                      </select>
                    </div>
                  </div>

                  <ButtonOutline onClick={recusar}>RECUSAR</ButtonOutline>

                  <div>
                    {isModalVisiblePerguntaAprovada ? (
                      <ModalPerguntaAprovada onClose={reload} />
                    ) : null}
                  </div>
                  <div>
                    {isModalVisiblePerguntaRecusada ? (
                      <ModalPerguntaRecusada onClose={reload} />
                    ) : null}
                  </div>
                  <div>
                    {isModalVisibleErro ? (
                      <ModalErro onClose={() => setModalVisibleErro(false)} />
                    ) : null}
                  </div>
                  <div>
                    {isModalVisiblePrecisaMotivoRecusar ? (
                      <ModalPrecisaMotivoRecusar
                        onClose={() =>
                          setModalVisiblePrecisaMotivoRecusar(false)
                        }
                      />
                    ) : null}
                  </div>

                  <Button onClick={aprovar}>APROVAR</Button>
                </div>
              </div>
            </>
          </>
          {/* //FIM DO MOLDE DE PERGUNTA COM RESPOSTA MODERADOR */}
        </>
      </>
    </>
  );
};

export default RespostaModeradorFeed;
