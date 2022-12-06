import React, { useEffect, useState } from "react";
import fotoPadrao from "../img/fotoquadrada.png";
// import "../css/perfil.scss";
import edit from "../img/editpencil.svg";
import receberEmail from "../img/emailtruepng.png";
import naoReceberEmail from "../img/emailfalse.png";
import api from "../api";
import ButtonOutline from "../components/buttonoutline";
import Button from "../components/button";
import yes from "../img/yes.svg";
import x from "../img/x.svg";
import relogio from "../img/relogio.svg";

const AnalitcsCont = () => {
  const [aprovados, setAprovados] = useState(new Array());
  const [analise, setAnalise] = useState(new Array());
  const [reprovados4, setReprovados4] = useState(new Array());
  const [reprovados5, setReprovados5] = useState(new Array());
  const [reprovados6, setReprovados6] = useState(new Array());

  useEffect(() => {
    dados();
    reprovei();
  }, []);

  function dados() {
    api
      .get("/publicacoes/filtro-status?status=3")
      .then((respostaObtida) => {
        console.log("FEED NORMAL: ");
        console.log(respostaObtida.data);

        setAprovados(respostaObtida.data);
      })
      .catch(function (erroOcorrido) {
        console.log(erroOcorrido);
      });

    api
      .get("/publicacoes/filtro-status?status=2")
      .then((respostaObtida) => {
        console.log("FEED NORMAL: ");
        console.log(respostaObtida.data);

        setAnalise(respostaObtida.data);
      })
      .catch(function (erroOcorrido) {
        console.log(erroOcorrido);
      });
  }

  function reprovei() {
    api
      .get("/publicacoes/filtro-status?status=4")
      .then((respostaObtida) => {
        console.log("FEED NORMAL: ");
        console.log(respostaObtida.data);

        setReprovados4(respostaObtida.data);
      })
      .catch(function (erroOcorrido) {
        console.log(erroOcorrido);
      });

    api
      .get("/publicacoes/filtro-status?status=5")
      .then((respostaObtida) => {
        console.log("FEED NORMAL: ");
        console.log(respostaObtida.data);

        setReprovados5(respostaObtida.data);
      })
      .catch(function (erroOcorrido) {
        console.log(erroOcorrido);
      });

    api
      .get("/publicacoes/filtro-status?status=6")
      .then((respostaObtida) => {
        console.log("FEED NORMAL: ");
        console.log(respostaObtida.data);

        setReprovados6(respostaObtida.data);
      })
      .catch(function (erroOcorrido) {
        console.log(erroOcorrido);
      });
  }
  let qtdaprovados = aprovados.length;
  console.log(qtdaprovados, "qtd");

  let qtdreprovados =
    reprovados4.length + reprovados5.length + reprovados6.length;
  console.log(qtdreprovados, "qtd");

  let qtdanalise = analise.length;
  console.log(analise.length, "qtd");

  let total = qtdanalise + qtdaprovados + qtdreprovados;
  let porcAnalise = (qtdanalise * 100) / total;
  let porcAprovado = (qtdaprovados * 100) / total;
  let porcReprovado = (qtdreprovados * 100) / total;


  return (
    <>
      <div className="container-perfil2 container-analitcs">
          
        <div id="x2"></div>

        <div id="x3"></div>
        {/* {porcAnalise}
        <br/>
        {porcAprovado}
        <br/>
        {porcReprovado} */}
        <div className="item search3">
          <div className="bloco4">
            <img src={yes} alt="" />

            <div id="contador" className="cont-moderador">
              {" "}
              {qtdaprovados}{" "}
            </div>

            <p> APROVADOS</p>
          </div>

          <div className="bloco5">
            <div>
              <img src={x} alt="" />
              <div id="contador" className="cont-moderador">
                {" "}
                {qtdreprovados}{" "}
              </div>
            </div>
            <p>RECUSADOS</p>
          </div>

          <div className="bloco6">
            <img src={relogio} alt="" />
            <div id="contador" className="cont-moderador">
              {" "}
              {qtdanalise}{" "}
            </div>

            <p>EM ÁNALISE</p>
          </div>
        </div>
        {/* <br/> */}
       
      </div>
    </>
  );
};

export default AnalitcsCont;
