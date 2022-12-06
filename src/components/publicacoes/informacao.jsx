import React, { useEffect, useState } from "react";
import salvarrunselect from "../../img/saveunselect.svg";
import vsalvarr from "../../img/save.svg";
import Comentar from "../../Layout/comentar.js";
import likeUnselect from "../../img/likeunselect.svg";
import like from "../../img/like.svg";
import api from "../../api";
import Comentarios from "../comentarioss";

const InformacaoFeed = ({ publicacao }) => {
  const [showElement, setShowElement] = useState(false);
  const showOrHide = () => setShowElement(true);

  const [curtirr, setCurtir] = useState();
  const [curtidas, setCurtidas] = useState();
  const [qtd, setQtd] = useState(publicacao.countCurtidas);
  const [qtd2, setQtd2] = useState(publicacao.usuariosSalvos);

  const [salvarr, setSalvar] = useState();
  const [salvoss, setSalvoss] = useState();

  let id = window.sessionStorage.id;
  let idPublicacaodavez = publicacao.idPublicacao;
  let idInt = parseInt(id);
  let publicacaoInt = parseInt(idPublicacaodavez);

  useEffect(
    () => {
      console.log(
        "CHAMADO QUANDO O COMPONENTE É MONTADO, E QUANDO O ESTADO 'qtd' É ALTERADO, SOMENTE!"
      );
    
      vercurtida();
    },
    [qtd],
    [curtirr],
   
  );

  useEffect(
    () => {
      console.log(
        "CHAMADO QUANDO O COMPONENTE É MONTADO, E QUANDO O ESTADO 'qtd2' É ALTERADO, SOMENTE!"
      );
    
      versalvos();
    
    },
    [salvarr],
    [qtd2]
  );


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
        console.log("qtd atual curtida", qtd);
      })
      .catch((erroOcorrido) => {
        console.log("erro ocorrido: ", erroOcorrido);
      });
  }

  function salvar() {
    api
      .post(`/favoritos?idUsuario=${id}&idPublicacao=${idPublicacaodavez}`)
      .then((respostaEnviada) => {
        console.log(
          "SALVANDO/OU REMOVENDO com sucesso!!!",
          respostaEnviada.data
        );

        setSalvar(respostaEnviada.data);

        if (respostaEnviada.data == true) {

          let quantidade2 = qtd2 + 1;

          setQtd2(quantidade2);

          console.log("Salvos estava ", salvarr);
        } else {

          let decairquantidade2 = qtd2 - 1;

          setQtd2(decairquantidade2);
          setSalvar(false);
          console.log("salvar estava ", salvarr);
        }
        console.log("qtd atual salvos", qtd2);
      })
      .catch((erroOcorrido) => {
        console.log("erro ocorrido: ", erroOcorrido);
      });
  }

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

  function versalvos() {
    api
      .get(`/favoritos/verificar?idUsu=${idInt}&idPub=${publicacaoInt}`)
      .then((respostaEnviada) => {

        console.log("SALVEI?!!!", respostaEnviada.data);

        if (respostaEnviada.data == true) {
          setSalvoss(1);
          console.log("true", salvoss);
        } else {
          setSalvoss(2);
          console.log("false", salvoss);
        }
      })
      .catch((erroOcorrido) => {
        console.log("erro ocorrido: ", erroOcorrido);
      });
  }

  const srcImage = `${curtidas == true ? like : likeUnselect}`;
  const classnamed = `${
    curtidas == true ? "img-comentario-curtido" : "img-comentario-descurtido"
  }`;

  const srcImageSave = `${salvarr  ? like : salvarrunselect}`;
  
  const classnamedSave = `${
    salvoss == true ? "img-comentario-salvo" : "img-comentario-dessalvo"
  }`;

  const classnamedComent = `${
    showElement == false ? "img-comentario" : "img-comentario2"
  }`;

  let tipodepublicacao =
    publicacao.tipoPublicacao == 1 ? "INFORMATIVO" : "DUVIDA";

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
      : `${dia} de ${mesFormat} de ${ano}`;

  return (
    <>
      <>
        <>
          <>
            {/* <div className="codigoidentificacao">
              <p>
                {" "}
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
                <div className="categoria-informacao">
                  <div className="conteudo-titulo">
                    <div className="frase-resposta">
                      <p className="resposta-pgt">
                        <span className="nome"> {publicacao.nomeUsuario} </span>
                        compartilhou uma nova informação
                      </p>
                    </div>

                    <div className="dados-frase-resposta">
                      {/* <p class="data">{publicacao.data.toString()}</p> */}
                      <div className="data">
                        <span> {date2} </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="categoria-tag-informacao">
                      {" "}
                      {tipodepublicacao}{" "}
                    </span>
                  </div>
                </div>
              </div>

              <div className="conteudo">
              <br/>
              <span className="categoria-tag-informativa2">  {publicacao.categoria} </span>
              <br/>
                <span className="p-destaque-informativa">
                  <br />
                  {publicacao.titulo}{" "}
                </span>
                <p>{publicacao.texto}</p>
              </div>

              <div className="btn-pub">
                <div className="flex">
                  <div className="flex-curtir">
                    {/* <img
                      className="curtidas"
                      onClick={curtir}
                      src={srcImage}
                      alt="Curtiu"
                    /> */}

                    <img
                      onClick={curtir}
                      defaultValue={publicacao.idPublicacao}
                      className={classnamed}
                      src="https://www.crmv.am.gov.br/wp-content/uploads/2018/07/Fundo-transparente-1900x1900-1-768x768.png"
                      alt="Comentários"
                    />
                    <span className="curtida"> {qtd == 0 ? "" : qtd}</span>
                  </div>

                  <img
                    onClick={showOrHide}
                    defaultValue={publicacao.idPublicacao}
                    className={classnamedComent}
                    src="https://www.crmv.am.gov.br/wp-content/uploads/2018/07/Fundo-transparente-1900x1900-1-768x768.png"
                    alt="Comentários"
                  />
                  <span className="curtida2">
                    {" "}
                    {publicacao.respostasByIdPublicacao.length == 0
                      ? ""
                      : publicacao.respostasByIdPublicacao.length}
                  </span>
                </div>
                <div>
                  <img
                    onClick={salvar}
                    defaultValue={publicacao.idPublicacao}
                    className={classnamedSave}
                    src="https://www.crmv.am.gov.br/wp-content/uploads/2018/07/Fundo-transparente-1900x1900-1-768x768.png"

                    alt="Comentários"
                  />
                </div>
              </div>
              {showElement ? <Comentarios publicacao={publicacao} publicacaoInt={publicacaoInt} /> : null}
            </div>
          </>{" "}
        </>
      </>{" "}
    </>
  );
};

export default InformacaoFeed;
