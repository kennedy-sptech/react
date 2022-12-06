import React, { useState } from "react";
import salvar from "../../img/saveunselect.svg";
import likeUnselect from "../../img/likeunselect.svg";
import like from "../../img/like.svg";
import api from "../../api";
import ModalResponder from "../ModalResponder";
import Button from "../button";
import ModalRespondida from "../ModalRespondida";
import ModalErro from "../ModalErro";

const PerguntaFeed = ({ publicacao }) => {
  const [showElement, setShowElement] = useState(false);
  const showOrHide = () => setShowElement(true);
  const [curtirr, setCurtir] = useState();
  const [curtidas, setCurtidas] = useState();
  const [qtd, setQtd] = useState(publicacao.countCurtidas);

  const srcImage = `${curtidas == true ? like : likeUnselect}`;

  let id = window.sessionStorage.id;
  let idPublicacaodavez = publicacao.idPublicacao;

  const [respostaInput, setRespostaInput] = useState("");

  const [isModalVisibleResponder, setModalVisibleResponder] = useState(false);
  const [
    isModalVisiblePrecisaMotivoRecusar,
    setModalVisiblePrecisaMotivoRecusar,
  ] = useState(false);
  const [isModalVisiblePostagemAprovada, setModalVisiblePostagemAprovada] =
    useState(false);
  const [isModalVisiblePostagemRecusada, setModalVisiblePostagemRecusada] =
    useState(false);
  const [isModalVisibleErro, setModalVisibleErro] = useState(false);
  const [isModalVisibleRespondida, setModalVisibleRespodida] = useState(false);
  const [isModalVisibleFalha, setModalVisibleFalha] = useState(false);
  const [isModalVisiblePerguntaAprovada, setModalVisiblePerguntaAprovada] =
    useState(false);
  const [isModalVisiblePerguntaRecusada, setModalVisiblePerguntaRecusada] =
    useState(false);

  function modalFOI() {
    setModalVisibleResponder(false);
    setModalVisibleRespodida(true);
  }

  function fecharModal() {
    setModalVisibleRespodida(false);
    window.location.reload();
  }

  function responder() {
    console.log("Enviando dados de resposta!");
    console.log("Texto: ", respostaInput);
    console.log("fkUsuario", parseInt(id));
    console.log("idpubli", idPublicacaodavez);

    const objetoFormatado = {
      texto: respostaInput,
      fkUsuario: parseInt(id),
    };

    api
      .post(`/respostas?idPublicacao=${idPublicacaodavez}`, objetoFormatado)
      .then((respostaEnviada) => {
        console.log("Evianda com sucesso!!!");
        console.log(
          `resposta obtd ao responder publicaçãp id: ${idPublicacaodavez}`,
          respostaEnviada
        );
        modalFOI();
      })
      .catch((erroOcorrido) => {
        console.log("erro ocorrido: ", erroOcorrido);
        setModalVisibleErro(true);
      });
  }

  function curtir() {
    api
      .post(`/curtidas?idUsuario=${id}&idPublicacao=${idPublicacaodavez}`)
      .then((respostaEnviada) => {
        console.log("CURTIDO/DESCURTIDO com sucesso!!!", respostaEnviada.data);
        setCurtir(respostaEnviada.data);
        if (respostaEnviada.data == true) {
          let quantidade = qtd + 1;
          setQtd(quantidade);
          console.log("Curtida estava ", curtirr);
        } else {
          let decairquantidade = qtd - 1;
          setQtd(decairquantidade);
          setCurtir(false);
          console.log("curtida estava ", curtirr);
        }
        console.log("qtd atual", qtd);
      })
      .catch((erroOcorrido) => {
        console.log("erro ocorrido: ", erroOcorrido);
      });
  }

  function validarPergunta() {
    console.log("entrei em validar pergunta");
    var resposta = document.getElementById("input-resposta");

    document.getElementById("p-resposta").style.display = "none";
    document.getElementById("p-validando").style.display = "block";

    if (resposta.value.length < 10) {
      document.getElementById("p-resposta").style.display = "block";
      document.getElementById("p-validando").style.display = "none";
      resposta.focus();
    } else {
      responder();
    }
  }

  
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
      : (mes == '07' ? 'julho' : 
      (mes == '08' ? 'agosto' : (mes == '09' ? 'setembro' : (mes == '10' ?'outubro' : mes == '11' ? 'novembro' : 'dezembro' ))));

  let date2 =
    publicacao.diasAtras == 0
      ? `hoje ás ${hora}h`
      : publicacao.diasAtras > 0 && publicacao.diasAtras < 7
      ? `á ${publicacao.diasAtras} dias atrás`
      : `${dia} de ${mesFormat} de  ${ano}`;

  return (
    <>
      <>
        <>
          {/* <div className="codigoidentificacao">
            <p>
              código: {publicacao.status}00{publicacao.idPublicacao}{" "}
            </p>
          </div> */}
          <div className="container-publicacao">
            <div className="detalhes-pub">
              <div>
                <img
                  className="avatar-pergunta"
                  src={publicacao.fotoUsuario}
                  alt={publicacao.nome}
                />
              </div>
              <div className="categoria-pergunta">
              <div className="conteudo-titulo">
                <div className="frase-resposta">
                  <p className="resposta-pgt">
                    <span className="nome"> {publicacao.nomeUsuario} </span>
                    fez uma pergunta
                  </p>
                </div>

                <div className="dados-frase-resposta">
                  {/* <p class="data">{publicacao.data.toString()}</p> */}
                  <div className="data">
                    <span> {date2}  </span>
                  </div>
                </div>
              </div>
              <div>
              <span className="categoria-tag-pergunta"> {publicacao.categoria}  </span>
              </div>
              </div>

            </div>
            <br/>
            <span className="p-destaque-pergunta">{publicacao.titulo}</span>

            <div className="conteudo">
              <p>{publicacao.texto}</p>
            </div>

            <div className="btn-pub">
              <div className="flex">
                <img
                  onClick={() => setModalVisibleResponder(true)}
                  defaultValue={publicacao.idPublicacao}
                  className="img-comentario"
                  src="https://www.crmv.am.gov.br/wp-content/uploads/2018/07/Fundo-transparente-1900x1900-1-768x768.png"
                  alt="Comentários"
                />
                <p className="responder-duvida"> Responder duvida de {publicacao.nomeUsuario}"</p>
              </div>
              <div>
                {/* <img src={salvar} alt="Salvar" /> */}
              </div>
            </div>
            <div>
              {isModalVisibleResponder ? (
                //modal de respoder
                <ModalResponder onClose={() => setModalVisibleResponder(false)}>
                  <div className="container-cadastro-editar">
                    <div className="input-titulo">
                      <p className="sub-titulo">
                        Titulo:
                        <div className="caixaview">
                          <span>"{publicacao.titulo}"</span>
                        </div>
                      </p>
                      <div className="input-descricao">
                        <p className="sub-titulo">
                          Descrição detalhada sobre a duvida de{" "}
                          {publicacao.nomeUsuario}:
                          <div className="caixaview">
                            <span>{publicacao.texto}</span>
                          </div>
                        </p>
                        <p className="sub-titulo">Resposta para a dúvida :</p>
                        <div className="p-valida">
                          <p id="p-validando">
                            Faça uma boa resposta de pelo menos 10 caracteres
                          </p>
                        </div>

                        <div className="p-status">
                          <p id="p-resposta">
                            Precisa ao menos de 10 caracteres
                          </p>
                        </div>
                        <textarea
                          placeholder="Escreva informações que podem ajudar"
                          className="estilo-input-second"
                          onInput={(evento) => {
                            setRespostaInput(evento.target.value);
                          }}
                          id="input-resposta"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={validarPergunta}
                    className="click-button-editar"
                  >
                    {" "}
                    ENVIAR RESPOSTA{" "}
                  </Button>
                  <div>
                    {isModalVisibleErro ? (
                      <ModalErro onClose={() => setModalVisibleErro(false)} />
                    ) : null}
                  </div>
                </ModalResponder>
              ) : null}
            </div>
          </div>
        </>
        <div>
          {isModalVisibleRespondida ? (
            <ModalRespondida onClose={fecharModal} />
          ) : null}
        </div>
      </>{" "}
    </>
  );
};

export default PerguntaFeed;
