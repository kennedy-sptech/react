import React from "react";
import fotoPadrao from "../img/fotoquadrada.png";
// import "../css/perfil.scss";
import edit from "../img/editpencil.svg";
import receberEmail from "../img/emailtruepng.png";
import naoReceberEmail from "../img/emailfalse.png";
import api from "../api";
import ButtonOutline from "../components/buttonoutline";
import Button from "../components/button";

const Analitcs = () => {
  function txt() {
    var input = document.querySelector('input[type="file"]');

    console.log(input)
    var data = new FormData();
    data.append("txt", input.files[0]);

    api.post("/usuarios/gravar-txt", data)
    .then((respostaObtida)=>{

      console.log("Entrei aqui no then")
      console.log(respostaObtida);
      
    }).catch((erroOcorrido)=>{
      
      console.log("Entrei aqui no catch")
      console.log(erroOcorrido);

    });
  }

  function downloadcsv() {
    window.open("https://sptechforum-backend.azurewebsites.net/usuarios/relatorio");
  }

  return (
    <>
   
    <div className="container-perfil container-analitcs">
      <div className="item search2">

              <div className="bloco3">
                <div className="csv">
                  {/* <h5>ENVIAR ARQUIVO TXT ???</h5> */}
                  <p className="txt-p">Upload de arquivo txt</p>
                  <div>
                    <div className="botoes">
                      <label>
                        <input type="file" id="myFile" name="txt" />
                      </label>
                      <Button onClick={txt}>ENVIAR</Button>
                    </div>
                  </div>
                </div>
              </div>
           
          </div>
          <br/>
          <hr></hr>
          <div className="bloco22">
                <div className="relatorio">
                  <p className="txt-p2">Relatório de usuarios </p>

                  <Button onClick={downloadcsv} className="ButtonOutline">
                    BAIXAR{" "}
                  </Button>
                </div>
                {/* Usuarios online
               <br/>
                {autenticados} */}
              </div>
    </div>
     </>
  );
};

export default Analitcs;
