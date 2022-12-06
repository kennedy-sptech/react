import React, { useEffect, useState } from "react";
import StatusPerguntas from "../components/statusperguntas.jsx";
import "../css/content.scss";

const ContentMinhasPerguntas = () => {
  const [statusPerguntas, setPerguntas] = useState();
  let acesso = window.sessionStorage.acesso;

  return (
    <>
      <div className=" item  container-minhasperguntas">
        {acesso == 1 ? <h1>Minhas perguntas</h1> : <h1>Minhas publicações</h1>}

        <>
          <div className="flexpai">
            <div className="flex">
            {acesso == 1 ? (
                <div className="flex">
                <div className="legenda-azul"> </div>
                <p>Enviada </p>
              </div>
            ) : ''}
              <div className="flex">
                <div className="legenda-amarela"> </div>
                <p>Analise</p>
              </div>
              <div className="flex">
                <div className="legenda-verde"> </div>
                <p>Aprovada</p>
              </div>
              <div className="flex">
                <div className="legenda-vermelho"> </div>
                <p>Recusada </p>
              </div>
            </div>
          </div>

      
      
        </>
        {acesso == 2 ? (
          <>
            <div className="legendas">
              <div>
                <span className="legenda-nome1">RESPONDI </span>{" "}
                <span className="legenda-sub"> Perguntas que respondi </span>
              </div>

              <div>
                <span className="legenda-nome">POSTEI </span>{" "}
                <span className="legenda-sub"> Publicações que enviei </span>
              </div>
            </div>
          </>
        ) : (
          <>  </>
        )}

        <StatusPerguntas statusperguntas={statusPerguntas} />
      </div>
    </>
  );
};

export default ContentMinhasPerguntas;
