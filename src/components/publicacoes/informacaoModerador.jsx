import React, { useState } from "react";
import likeUnselect from "../../img/likeunselect.svg";
import like from "../../img/like.svg";
import api from "../../api";
import ButtonOutline from "../buttonoutline";
import ModalPrecisaMotivoRecusar from "../ModalPrecisaMotivoRecusar";
import ModalPostagemAprovada from "../ModalPostagemAprovada";
import Button from "../button";
import ModalPostagemRecusada from "../ModalPostagemRecusada";
import ModalErro from "../ModalErro";

const InformacaoModeradorFeed = ({ publicacao }) => {

  const [isModalVisiblePostagemRecusada, setModalVisiblePostagemRecusada] =
    useState(false);

  const [isModalVisibleErro, setModalVisibleErro] = useState(false);

  const [
    isModalVisiblePrecisaMotivoRecusar,
    setModalVisiblePrecisaMotivoRecusar,
  ] = useState(false);

  const [isModalVisiblePostagemAprovada, setModalVisiblePostagemAprovada] =
    useState(false);

  let idPublicacaodavez = publicacao.idPublicacao;

  function recusar() {
    var motivo = document.getElementById("motivo");
    var value = motivo.options[motivo.selectedIndex].value;
    console.log(value);
    if(value >= 4 && value <= 6) {
      api
        .patch(
          `/publicacoes/update-status?idPublicacao=${idPublicacaodavez}&status=${value}`
        )
        .then((respostaEnviada) => {
          console.log("RECUSADA COM SUCESSO!!!");
          console.log(
            `resposta obtd ao RECUSAR publicaçãO id: ${idPublicacaodavez} para status ${value}`
          );
          setModalVisiblePostagemRecusada(true);
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
        setModalVisiblePostagemAprovada(true);
      })
      .catch((erroOcorrido) => {
        console.log("erro ocorrido: ", erroOcorrido);
        setModalVisibleErro(true);
      });
  }

  function reload() {
    window.location.reload();
    setModalVisiblePostagemRecusada(false);
    setModalVisiblePostagemAprovada(false);
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
        {/* <div className="codigoidentificacao"> Informacao Moderador Feed </div> */}

        <>
          <>
            {/* <div className="codigoidentificacao">
                <p className="codigoidentificacao">
                  {" "}
                  código: {publicacao.status}00{publicacao.idPublicacao}{" "}
                </p>
              </div> */}
            {/* // MOLDE DE INFORMATIVA MODERADOR*/}
            <div className="container-publicacao">
              
              <div className="frase-resposta">
              <div>
                  <span className="tag-hora">
                    {date3}
                  </span>
                </div>
               
                <div>
                  <span className="categoria-tag-pergunta">
                    {publicacao.categoria}
                  </span>
                </div>
              </div>
            
              <div>
                  <p className="resposta-pgt3">
                    Publicação feita por
                    <span className="nome"> {publicacao.nomeUsuario} </span>
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

                <ButtonOutline onClick={recusar}>RECUSAR</ButtonOutline>

                <div>
                  {isModalVisiblePrecisaMotivoRecusar ? (
                    <ModalPrecisaMotivoRecusar
                      onClose={() => setModalVisiblePrecisaMotivoRecusar(false)}
                    />
                  ) : null}
                </div>
                <div>
                  {isModalVisiblePostagemAprovada ? (
                    <ModalPostagemAprovada onClose={reload} />
                  ) : null}
                </div>
                <div>
                  {isModalVisiblePostagemRecusada ? (
                    <ModalPostagemRecusada onClose={reload} />
                  ) : null}
                </div>
                <div>
                  {isModalVisibleErro ? (
                    <ModalErro onClose={() => setModalVisibleErro(false)} />
                  ) : null}
                </div>

                <Button onClick={aprovar}>APROVAR</Button>
              </div>
            
            </div>
          </>
          {/* // FIM MOLDE DE INFORMATIVA MODERADOR*/}
        </>
      </>
    </>
  );
};

export default InformacaoModeradorFeed;
